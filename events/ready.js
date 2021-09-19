function setupRoles(client) {
	client.customData.roles = {}
	let guild = client.guilds.cache.find(g => g.name === client.customData.guildName)
	let findAndSetRole = function (roleName) {
		client.customData.roles[roleName] = guild.roles.cache.find(r => r.name === roleName)
	}

	findAndSetRole("Follower")
	findAndSetRole("New World Crafter")
	findAndSetRole("New World Banker")
	findAndSetRole("New World Gather")

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
	execute(client) {


		client.customData = {}
		client.customData.skipMember = -1
		client.customData.guildName = "Bot Test Server"
		client.customData.inviteData = {}
		client.customData.inviteCached = false
		client.customData.inviteMeanings = {
			'nwPlayerJoined': 'DF3pR6j6YF'
		}
		client.customData.channelCodes = {
			'nw-mainchat': "888509947489419284",
			'main-chat': '889294094877196350'
		}
		client.customData.newInviteTimes = {}
		let guild = client.guilds.cache.find(g => g.name === client.customData.guildName)
		client.customData.adminUsers = {}

		guild.members.fetch('224597366324461568').then(function (data) {
			client.customData.adminUsers["Daemonleak"] = data
		})

		client.customData.adminUsers["Snoberry"] = "Snoberry"
		client.customData.adminUsers["Lexi"] = "Lexi"

		setupRoles(client)

		guild.invites.fetch().then(function (data) {
			data.each(inviteObj => {
				client.customData.inviteData[inviteObj.code] = inviteObj.uses
			})
			client.customData.inviteCached = true
		})
		console.log(`Ready! Logged in as ${client.user.tag}`);
	},
};
