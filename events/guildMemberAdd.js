function giveFollower(member) {
	let client = member.client
	member.roles.set([client.customData.roles["Follower"]])
}

module.exports = {
	name: 'guildMemberAdd',
	execute(member) {
		let client = member.client
		const channel = member.guild.channels.cache
			.find(channel => channel.id === client.customData.channelCodes["welcome-chat"])
			.send(`=~=~=~=~=~=~=~=~=~=~=~=~=\n\nHey ${member.user}! Welcome to the discord. Feel free to take a look around and chill with us.\n\n**To get started, pick out all the games your interested in playing with us here: ${client.customData.channels["pick-your-games"]}**\n\nIf you join at 3:00 in the morning, est time there is a chance we are probably asleep.\n\n=~=~=~=~=~=~=~=~=~=~=~=~=`);
		client.customData.newInviteTimes[member.user.username] = member.joinedAt
		giveFollower(member)
	},
};
