// const {lostArkClasses} = require("../store.json");

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

module.exports = {
	name: 'interactionCreate',
	async execute(interaction) {
		await checkForCommands(interaction)
		checkForButtonPresses(interaction)
	},
};
