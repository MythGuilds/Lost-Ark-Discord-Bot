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
	else if (commandName === 'lost-ark-channel-setup') {
		await require("../commands/lost-ark-channel-setup").execute(interaction)
	}
	else if (commandName === 'dota-channel-setup') {
		await require("../commands/dota-channel-setup").execute(interaction)
	}
	else if (commandName === 'debate-channel-setup') {
		await require("../commands/debate-channel-setup").execute(interaction)
	}
	else if (commandName === 'archeage-channel-setup') {
		await require("../commands/archeage-channel-setup").execute(interaction)
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
				interaction.member.roles.add([  client.customData.roles[roleName] ])
					.then(() => {
						interaction.reply({ content: `You have received the ${roleName} role...`, ephemeral: true })
					})
					.catch((error) => {
						interaction.member.roles.add([  client.customData.roles[roleName]  ])
							.then(() => {
								interaction.reply({ content: `You have received the ${roleName} role...`, ephemeral: true })
							})
							.catch((error) => {
								interaction.reply({ content: `You already have access too ${roleName}!`, ephemeral: true })
							})
					})
			}

			if (interaction.customId == leaveID)
			{
				interaction.member.roles.remove([  client.customData.roles[roleName]  ])
				interaction.reply({ content: `The ${roleName} role has been taken from you...`, ephemeral: true })
			}
		}
		nwGameRoleLogicSetup("Lost Ark", "join-lost-ark", "leave-lost-ark")
		nwGameRoleLogicSetup("dota2", "join-dota", "leave-dota")
		nwGameRoleLogicSetup("Archeage", "join-archeage", "leave-archeage")
		nwGameRoleLogicSetup("debater", "join-debate", "leave-debate")
	}
}

module.exports = {
	name: 'interactionCreate',
	async execute(interaction) {
		await checkForCommands(interaction)
		checkForButtonPresses(interaction)
	},
};
