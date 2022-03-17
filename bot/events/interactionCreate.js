// const {lostArkClasses} = require("../store.json");
const Keyv = require('keyv')
const KeyvRedis = require("@keyv/redis");
const LAPF_PLAYER_JOB = new Keyv({ store: new KeyvRedis('redis://localhost:6379'), namespace: 'LAPF_PLAYER_JOB' })

async function checkForCommands(interaction) {
	if (!interaction.isCommand()) return;
	// const { adminUsers } = require('../config.json');
	if (interaction.user.id != interaction.client.customData.adminUsers["Daemonleak"]) return;
	const { commandName } = interaction;

	if (commandName === 'lostark-bot-test') {
		await require("../commands/lostark-bot-test").execute(interaction)
	}
	else if (commandName === 'prune') {
		await require("../commands/prune").execute(interaction)
	}
	else if (commandName === 'abyssal-dungeon-setup') {
		await require("../commands/abyssal-dungeon-setup").execute(interaction)
	}
	else if (commandName === 'lostark-lfg-job-setup') {
		await require("../commands/lostark-lfg-job-setup").execute(interaction)
	}
	else {
		interaction.reply({ content: `Command not found in logic...`, ephemeral: true})
	}

}
function checkForButtonPresses(interaction) {
	let client = interaction.client
	if (interaction.isButton())
	{
		const webUILogicSetup = function (uiTypeID) {

			if (interaction.customId == uiTypeID)
			{
				interaction.reply({ content: `Click on the following link: https://laughing-raman-1313c2.netlify.app/`, ephemeral: true})
			}
		}
		webUILogicSetup("show-abyssal-dungeon-link")
	}
}
async function checkForLostArkJobSelect(interaction) {
	const validJobs = ["DPS", "Support"]

	// Return if not a select event
	if (!interaction.isSelectMenu()) return

	// Return if select is multi
	if (interaction.values.length > 1) return

	const playerJob = interaction.values[0]
	if (!validJobs.includes(playerJob)) return

	const memberID = interaction.user.id
	await LAPF_PLAYER_JOB.set(memberID, playerJob)

	interaction.reply({ content: `You will now join parties as a ${playerJob}`, ephemeral: true})
	console.log(await LAPF_PLAYER_JOB.get(memberID))

}

module.exports = {
	name: 'interactionCreate',
	async execute(interaction) {
		await checkForCommands(interaction)
		checkForButtonPresses(interaction)
		checkForLostArkJobSelect(interaction)
	},
};
