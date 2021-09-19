function giveFollower(member) {
	let client = member.client
	member.roles.set([client.customData.roles["Follower"]])
}

module.exports = {
	name: 'guildMemberAdd',
	execute(member) {
		let client = member.client
		const channel = member.guild.channels.cache
			.find(channel => channel.id === client.customData.channelCodes["main-chat"])
			.send(`Hey ${member.user}! Welcome to the discord. Feel free to take a look around and chill with us.\n\nIf you have any questions about the \`New World\` guild toss them over to ${client.customData.adminUsers["Daemonleak"]} or ${client.customData.adminUsers["Snoberry"]}.\nFor any \`other games\` contact ${client.customData.adminUsers["Lexi"]}\n\n**New World Chat:** #nw-mainchat\n**General Chat:** #main-chat\n\nKeep in mind we are humans that eat, work, and sleep. If it is 12:30 am at night, we aren't going to be on Discord.`);
		client.customData.newInviteTimes[member.user.username] = member.joinedAt
		giveFollower(member)
	},
};
