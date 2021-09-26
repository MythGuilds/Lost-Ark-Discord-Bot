async function checkForCommands(interaction) {
	if (!interaction.isCommand()) return;
	const { adminUsers } = require('../config.json');
	if (interaction.user.id != interaction.client.customData.adminUsers["Daemonleak"]) return;
	const { commandName } = interaction;

	if (commandName === 'prune') {
		await require("../commands/prune").execute(interaction)
	}
	else if (commandName === 'channel-info') {
		await require("../commands/channel-info").execute(interaction)
	}
	else if (commandName === 'user-info') {
		await require("../commands/user-info").execute(interaction)
	}
	else if (commandName === 'crafting-channel-setup') {
		await require("../commands/crafting-channel-setup").execute(interaction)
	}
	else if (commandName === 'banking-channel-setup') {
		await require("../commands/banking-channel-setup").execute(interaction)
	}
	else if (commandName === 'gathering-channel-setup') {
		await require("../commands/gathering-channel-setup").execute(interaction)
	}
	else if (commandName === 'new-world-channel-setup') {
		await require("../commands/new-world-channel-setup").execute(interaction)
	}
	else if (commandName === 'dota-channel-setup') {
		await require("../commands/dota-channel-setup").execute(interaction)
	}
}
function checkForButtonPresses(interaction) {
	let client = interaction.client
	if (interaction.isButton())
	{
		let nwRoleLogicSetup = function (roleName, joinID, leaveID) {
			if (client.customData.roles[roleName] === undefined)
			{
				interaction.reply({ content: `error: can't find role ${roleName}!`, ephemeral: true })
				return
			}

			if (interaction.customId == joinID)
			{
				interaction.member.roles.add([  client.customData.roles[roleName]  ])
					.then(() => {
						interaction.reply({ content: `You have received the ${roleName} role...`, ephemeral: true })
					})
					.catch((error) => {
						interaction.reply({ content: `You are already a ${roleName}!`, ephemeral: true })
					})

			}

			if (interaction.customId == leaveID)
			{
				interaction.member.roles.remove([  client.customData.roles[roleName]  ])
				interaction.reply({ content: `The ${roleName} role has been taken from you...`, ephemeral: true })
			}
		}
		let nwGameRoleLogicSetup = function (roleName, joinID, leaveID) {
			if (client.customData.roles[roleName] === undefined)
			{
				interaction.reply({ content: `error: can't find role ${roleName}!`, ephemeral: true })
				return
			}

			if (interaction.customId == joinID)
			{
				interaction.member.roles.add([  client.customData.roles[roleName], client.customData.roles["Follower"]  ])
					.then(() => {
						interaction.reply({ content: `You have received the ${roleName} role...`, ephemeral: true })
					})
					.catch((error) => {
						interaction.member.roles.add([  client.customData.roles[roleName]  ])
							.then(() => {
								interaction.reply({ content: `You have received the ${roleName} role...`, ephemeral: true })
							})
							.catch((error) => {
								interaction.reply({ content: `You are already have access too ${roleName}!`, ephemeral: true })
							})
					})
			}

			if (interaction.customId == leaveID)
			{
				interaction.member.roles.remove([  client.customData.roles[roleName]  ])
				interaction.reply({ content: `The ${roleName} role has been taken from you...`, ephemeral: true })
			}
		}
		nwRoleLogicSetup("New World Crafter", "join-new-world-crafter", "leave-new-world-crafter")
		nwRoleLogicSetup("New World Banker", "join-new-world-banker", "leave-new-world-banker")
		nwRoleLogicSetup("New World Gather", "join-new-world-gather", "leave-new-world-gather")
		nwGameRoleLogicSetup("New World", "join-new-world", "leave-new-world")
		nwGameRoleLogicSetup("dota2", "join-dota", "leave-dota")
	}
}

module.exports = {
	name: 'interactionCreate',
	async execute(interaction) {
		await checkForCommands(interaction)
		checkForButtonPresses(interaction)
	},
};
