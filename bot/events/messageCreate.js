const {MessageEmbed} = require("discord.js");
const { DateTime } = require("luxon");
const Keyv = require('keyv')
const keyv = new Keyv('redis://localhost:6379')
const KeyvRedis = require("@keyv/redis");
const LAPF_MESSAGES = new Keyv({ store: new KeyvRedis('redis://localhost:6379'), namespace: 'LAPF_MESSAGES' })
const axios = require("axios")
const Ajv = require("ajv")

module.exports = {
	name: 'messageCreate',
	execute(message) {
		let channel = message.channel
		let client = message.client
		const circles = [":blue_circle:", ":brown_circle:", ":green_circle:", ":orange_circle:", ":purple_circle:", ":red_circle:"]

		const saveToMemory = function (gameContentName, dates) {

			let emoji = {}
			dates.forEach(function (date, index) {
				emoji[circles[index]] = {
					"date": date,
					"users": []
				}
			})
			let JSON = {
				"message_id": message.id,
				"party_leader_id": message.author.id,
				"game_content_name": gameContentName,
				"emoji": emoji
			}
			console.log(JSON)
		}
		const removePinFromIPFS = (pinataApiKey, pinataSecretApiKey, hashToUnpin) => {
			const url = `https://api.pinata.cloud/pinning/unpin/${hashToUnpin}`;
			return axios
				.delete(url, {
					headers: {
						pinata_api_key: pinataApiKey,
						pinata_secret_api_key: pinataSecretApiKey
					}
				})
				.then(function (response) {
					console.log(`Unpin Success`)
				})
				.catch(function (error) {
					console.log(`Unpin failed`)
				});
		};
		const postRecruitmentMessage = async function (channelType, contentType, contentName, dates) {

			const channelID = message.client.customData.channelCodes[channelType]
			let channel = message.guild.channels.cache.get(channelID)

			if (message.author.bot) return;
			let guild = message.client.guilds.cache.find(g => g.name === message.client.customData.guildName)
			let member = await guild.members.fetch(message.author.id)
			let nickname = message.author.username
			if (member.nickname) nickname = member.nickname

			let data = await keyv.get(contentType.replaceAll(" ", ""))
			const dungeon = data[contentName]
			const gearScore = dungeon["minGearScore"]
			const guide = dungeon["guide"]


			let date_fields = []

			for (let i = 0; i < dates.length; i++) {
				date_fields.push({
					name: `Date ${circles[i]}`,
					value: dates[i],
					inline: true
				})
			}

			const exampleEmbed = new MessageEmbed()
				.setColor('#000000')
				.setTitle(contentName)
				.setAuthor({name: nickname, iconURL: message.author.displayAvatarURL()})
				.setDescription(`Guide: ${guide}`)
				.addField('Min Gear Score', gearScore.toString())
				.addField('\u200B', '\u200B')
				.addFields(date_fields)
				.setImage(dungeon["image"])
				.setTimestamp()

			channel.send(`${message.author} created a party...`);
			channel.send({embeds: [exampleEmbed]});

			saveToMemory(contentName, dates)

		}
		const parseFetchIPFS = function () {

			const ajv = new Ajv()
			const schema = {
				type: "object",
				properties: {
					"game content type": {type: "string"},
					"game content name": {type: "string"},
					"dates": {
						type: "array",
						items: {type: "string"},
						minItems: 1,
						maxItems: 6
					}
				},
				required: ["game content type", "game content name", "dates"],
				additionalProperties: false
			}
			const validateJSONStructure = ajv.compile(schema)
			console.log(`Parsing: ${message.content}`)
			const ipfsHash = message.content.trim().replace("LAPFC::", "")
			const alphanumeric = /^[0-9a-zA-Z]+$/
			if (ipfsHash.match(alphanumeric))
			{
				const axiosInstance = axios.create({
					baseURL: 'https://gateway.pinata.cloud/ipfs/',
					timeout: 10000
				})
				message.delete()
				axiosInstance.get(ipfsHash)
					.then(async function (res) {
						// Check for successful connection to the IPFS Network via http get
						if (res.status === 200) console.log(`${ipfsHash}: IPFS Network Connection Valid`)
						else return console.log(`${ipfsHash} Error: ${res.status} ${res.statusText}`)

						const data = res.data
						console.log(data)

						await removePinFromIPFS(client.customData.pinataApiKey, client.customData.pinataSecretApiKey, ipfsHash)

						// Validate basic JSON structure
						const validJSONStructure = validateJSONStructure(data)
						if (!validJSONStructure) return console.log(validateJSONStructure.errors)

						// Pull from storage: Game Content Type & Game Content Name
						const validGameContentTypes = await keyv.get('validGameContentTypes')
						const validGameContentName = await keyv.get('validGameContentName')

						// Validate: Game Content Type & Game Content Name
						if (!validGameContentTypes.includes(data["game content type"]))
							return console.log(`Game content type invalid: ${data["game content type"]}`)
						if (!validGameContentName.includes(data["game content name"]))
							return console.log(`Game content name invalid: ${data["game content name"]}`)

						// Validate: All dates listed
						let datesAreValid = true
						data["dates"].forEach(function (date) {
							let dateInQuestion = DateTime.fromFormat(date.replaceAll("/", " "), "M d yyyy")
							if (!dateInQuestion.isValid) datesAreValid = false
						})
						if (!datesAreValid) return console.log("One or more invalid date found")

						let channelType = data["game content type"].toLowerCase().replaceAll(" ", "-")
						await postRecruitmentMessage(channelType, data["game content type"], data["game content name"], data["dates"])
					})
					.catch(function (error) {
						console.error(error)
					})
			}
		}
		if (message.content.startsWith("LAPFC::")) parseFetchIPFS()
	},
};
