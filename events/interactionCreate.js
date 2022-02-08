const {lostArkClasses} = require("../store.json");

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
	else if (commandName === "lostark-main-class-setup") {
		await require("../commands/lostark-main-class-setup").execute(interaction)
	}
	else if (commandName === "lost-ark-pvp-access-setup") {
		await require("../commands/lost-ark-pvp-access-setup").execute(interaction)
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

			if (interaction.customId == joinID && joinID == "join-lost-ark-pvp-request-access")
			{
				interaction.member.roles.add([  client.customData.roles[roleName] ])
					.then(() => {
						interaction.reply({ content: `\`${interaction.member.displayName}\` has requested access for his / her team...`, ephemeral: false })
					})
					.catch((error) => {
						interaction.member.roles.add([  client.customData.roles[roleName]  ])
							.then(() => {
								interaction.reply({ content: `\`${interaction.member.displayName}\` has requested access for his / her team...`, ephemeral: false })
							})
							.catch((error) => {
								interaction.reply({ content: `You already requested access!`, ephemeral: true })
							})
					})
				return;
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
		nwGameRoleLogicSetup("pvp access requested", "join-lost-ark-pvp-request-access", "NA")
	}
}
function checkForLostArkSelect(interaction) {
	// If interaction is in fact a Lost Ark Main Class Dropdown
	if (!interaction.isSelectMenu()) return
	if (interaction.values.length > 1) return

	// Load some data in variables
	let client = interaction.client
	let roleName = interaction.values[0]
	const { lostArkClasses } = require('../store.json');
	let allClasses = []

	// Some Error checking
	if (client.customData.roles[roleName] === undefined) return interaction.reply({ content: `error: can't find role ${roleName}!`, ephemeral: true })

	lostArkClasses.forEach(function (laClass) {
		allClasses.push(client.customData.roles[laClass])
	})
	interaction.member.roles.remove(allClasses)
		.then(() => {
		interaction.member.roles.add([  client.customData.roles[roleName] ])
			.then(() => {
				interaction.reply({ content: `You are now marked as a Lost Ark ${roleName}`, ephemeral: true })
			})
			.catch((error) => {
				interaction.member.roles.add([  client.customData.roles[roleName]  ])
					.then(() => {
						interaction.reply({ content: `You are now marked as a Lost Ark ${roleName}`, ephemeral: true })
					})
					.catch((error) => {
						interaction.reply({ content: `An error has occurred attempting to assign the ${roleName} role`, ephemeral: true })
					})
			})
	})
		.catch((error) => {
			interaction.reply({ content: `An error has occurred attempting reset all Lost Ark class roles`, ephemeral: true })
		})
	console.log(interaction.values)

}

module.exports = {
	name: 'interactionCreate',
	async execute(interaction) {
		await checkForCommands(interaction)
		checkForButtonPresses(interaction)
		checkForLostArkSelect(interaction)

	},
};
