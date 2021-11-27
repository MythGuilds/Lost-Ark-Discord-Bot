
function setupRoles(client) {
	client.customData.roles = {}
	let guild = client.guilds.cache.find(g => g.name === client.customData.guildName)
	let findAndSetRole = function (roleName) {
		client.customData.roles[roleName] = guild.roles.cache.find(r => r.name === roleName)
	}

	findAndSetRole("Follower")
	findAndSetRole("New World")
	findAndSetRole("dota2")
	findAndSetRole("Archeage")
	findAndSetRole("debater")

	// Create missing roles
	for (let [key, role] of Object.entries(client.customData.roles))
	{
		if (role === undefined)
		{
			console.log(`${key} is not defined, creating it...`)
			guild.roles.create({
				name: key
			})
			findAndSetRole(key)
		}
	}
}
module.exports = {
	name: 'ready',
	once: true,
	async execute(client) {
		const { channelCodes, guildName, adminUsers } = require('../config.json');
		client.customData = {}
		client.customData.guildName = guildName

		client.customData.channelCodes = channelCodes
		client.customData.newInviteTimes = {}
		let guild = client.guilds.cache.find(g => g.name === client.customData.guildName)
		client.customData.adminUsers = {}
		client.customData.channels = {}

		for (let [key, value] of Object.entries(channelCodes))
		{
			await guild.channels.fetch(value).then(function (data) {
				client.customData.channels[key] = data
			})
		}

		for (let [key, value] of Object.entries(adminUsers))
		{
			if (value !== "")
			{
				await guild.members.fetch(value).then(function (data) {
					client.customData.adminUsers[key] = data
				})
			}
			else {
				client.customData.adminUsers[key] = key
			}
		}


		setupRoles(client)

		console.log(`Ready! Logged in as ${client.user.tag}`);
	},
};
