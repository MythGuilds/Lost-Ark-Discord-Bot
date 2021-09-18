module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
		client.customData = {}
		client.customData.guildName = "Bot Test Server"
		client.customData.inviteData = {}
		client.customData.inviteCached = false
		client.customData.inviteMeanings = {
			'nwPlayerJoined': 'DF3pR6j6YF'
		}
		client.customData.channelCodes = {
			'nw-mainchat': "888509947489419284"
		}
		client.customData.newInviteTimes = {}
		client.customData.roles = {}

		client.customData.roles["Follower"] = client.guilds.cache.find(g => g.name === client.customData.guildName).roles.cache.find(r => r.name === "Follower")
		client.customData.roles["New World Crafter"] = client.guilds.cache.find(g => g.name === client.customData.guildName).roles.cache.find(r => r.name === "New World Crafter")
		client.customData.roles["New World Banker"] = client.guilds.cache.find(g => g.name === client.customData.guildName).roles.cache.find(r => r.name === "New World Banker")

		client.guilds.cache.first().invites.fetch().then(function (data) {
			data.each(inviteObj => {
				client.customData.inviteData[inviteObj.code] = inviteObj.uses
			})
			client.customData.inviteCached = true
		})
		console.log(`Ready! Logged in as ${client.user.tag}`);
	},
};
