const axios = require("axios")
const Ajv = require("ajv")
const {MessageEmbed} = require("discord.js");

module.exports = {
	name: 'messageCreate',
	execute(message) {
		let channel = message.channel

		const postRecruitmentMessage = function () {
			if(message.author.bot) return;
			const exampleEmbed = new MessageEmbed()
				.setColor('#0099ff')
				.setTitle('Some title')
				.setURL('https://discord.js.org/')
				.setAuthor({ name: 'Some name', iconURL: 'https://i.imgur.com/AfFp7pu.png', url: 'https://discord.js.org' })
				.setDescription('Some description here')
				.setThumbnail('https://i.imgur.com/AfFp7pu.png')
				.addFields(
					{ name: 'Regular field title', value: 'Some value here' },
					{ name: '\u200B', value: '\u200B' },
					{ name: 'Inline field title', value: 'Some value here', inline: true },
					{ name: 'Inline field title', value: 'Some value here', inline: true },
				)
				.addField('Inline field title', 'Some value here', true)
				.setImage('https://i.imgur.com/AfFp7pu.png')
				.setTimestamp()
				.setFooter({ text: 'Some footer text here', iconURL: 'https://i.imgur.com/AfFp7pu.png' });

			channel.send({ embeds: [exampleEmbed] });
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
			const validateJSON = ajv.compile(schema)
			console.log(`Parsing: ${message.content}`)
			const ipfsHash = message.content.trim().replace("LAPFC::", "")
			const alphanumeric = /^[0-9a-zA-Z]+$/
			if (ipfsHash.match(alphanumeric))
			{
				const axiosInstance = axios.create({
					baseURL: 'https://gateway.pinata.cloud/ipfs/',
					timeout: 10000
				})
				console.log(ipfsHash)
				message.delete()
				axiosInstance.get(ipfsHash)
					.then(function (res) {

						if (res.status == 200) console.log(`${ipfsHash}: IPFS Network Connection Valid`)
						else return console.log(`${ipfsHash} Error: ${res.status} ${res.statusText}`)

						const data = res.data
						console.log(data)

						const valid = validateJSON(data)
						if (!valid) console.log(validateJSON.errors)
						else postRecruitmentMessage()
					})
					.catch(function (error) {
						console.error(error)
					})
			}
		}
		if (message.content.startsWith("LAPFC::"))
		parseFetchIPFS()
	},
};
