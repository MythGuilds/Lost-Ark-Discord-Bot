function nwPlayerJoined(inviteCode, member) {
	let client = member.client
	if (inviteCode === client.customData.inviteMeanings["nwPlayerJoined"])
	{
		console.log("nwPlayerJoined was triggered")

		const channel = member.guild.channels.cache
			.find(channel => channel.id === client.customData.channelCodes["nw-mainchat"])
			.send(`Hey ${member.user}! Welcome to the discord. Feel free to take a look around and chill with us.\n\nIf you have any questions about the guild toss them over to {daemonleak} or {snoberry}.\nKeep in mind we are humans that eat, work, and sleep. If it is 12:30 am at night, we aren't going to be on Discord.`);
		client.customData.newInviteTimes[member.user.username] = member.joinedAt

	}
}
function giveFollower(member) {
	let client = member.client
	member.roles.set([client.customData.roles["Follower"]])
}

module.exports = {
	name: 'guildMemberAdd',
	async execute(member) {
		let client = member.client
		const wait = require('util').promisify(setTimeout);
		async function checkInvites (attempts) {
			if (attempts >= 60) {
				console.log("checkInvites failed, too many attempts...")
				return
			}
			if (!client.customData.inviteCached) {
				attempts++
				await wait(1000)
				await checkInvites(attempts)
			}
			else {
				client.customData.inviteCached = false
				let inviteCode = undefined
				member.guild.invites.fetch().then(function (data) {
					data.each(function (inviteObj) {
						if (client.customData.inviteData[inviteObj.code] < inviteObj.uses)
						{
							inviteCode = inviteObj.code
						}
						client.customData.inviteData[inviteObj.code] = inviteObj.uses
					})
					client.customData.inviteCached = true
					console.log(`New person! ${member.displayName} joined with invite code: ${inviteCode}`);
					// If invite code is correct, code will be triggered in these functions
					nwPlayerJoined(inviteCode, member)
					// more here....
				})

			}
		}
		await checkInvites(0)
		giveFollower(member)
	},
};
