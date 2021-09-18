async function checkForCommands(interaction) {
	if (!interaction.isCommand()) return;

	const { commandName } = interaction;

	if (commandName === 'prune') {
		await require("../commands/prune").execute(interaction)
	} else if (commandName === 'channel-info') {
		await require("../commands/channel-info").execute(interaction)
	} else if (commandName === 'ping') {
		await require("../commands/ping").execute(interaction)
	}
	else if (commandName === 'crafting-channel-setup') {
		await require("../commands/crafting-channel-setup").execute(interaction)
	}
	else if (commandName === 'banking-channel-setup') {
		await require("../commands/banking-channel-setup").execute(interaction)
	}
}
function checkForButtonPresses(interaction) {
	let client = interaction.client
	if (interaction.isButton())
	{
		let nwCrafterSetup = function () {
			if (interaction.customId == "join-new-world-crafter")
			{
				interaction.member.roles.add([  client.customData.roles["New World Crafter"]  ])
					.then(() => {
						interaction.reply({ content: 'You have received the New World Crafter role...', ephemeral: true })
					})
					.catch((error) => {
						interaction.reply({ content: 'You are already a New World Crafter!', ephemeral: true })
					})

			}

			if (interaction.customId == "leave-new-world-crafter")
			{
				interaction.member.roles.remove([  client.customData.roles["New World Crafter"]  ])
				interaction.reply({ content: 'The New World Crafter role has been taken from you...', ephemeral: true })
			}
		}
		let nwBankerSetup = function () {
			if (interaction.customId == "join-new-world-banker")
			{
				interaction.member.roles.add([  client.customData.roles["New World Banker"]  ])
					.then(() => {
						interaction.reply({ content: 'You have received the New World Banker role...', ephemeral: true })
					})
					.catch((error) => {
						interaction.reply({ content: 'You are already a New World Banker!', ephemeral: true })
					})

			}

			if (interaction.customId == "leave-new-world-banker")
			{
				interaction.member.roles.remove([  client.customData.roles["New World Banker"]  ])
				interaction.reply({ content: 'The New World Banker role has been taken from you...', ephemeral: true })
			}
		}
		nwBankerSetup()
		nwCrafterSetup()

	}
}

module.exports = {
	name: 'interactionCreate',
	async execute(interaction) {
		await checkForCommands(interaction)
		checkForButtonPresses(interaction)
	},
};
