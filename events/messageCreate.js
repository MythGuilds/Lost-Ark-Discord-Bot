module.exports = {
	name: 'messageCreate',
	execute(message) {
		return;
		let client = message.client
		if (message.author.bot) return;
		if (message.content == "") return;
		console.log(`${message.author.username} sent a message`);
		console.log(`Message: ${message.content}`);
		console.log(client.customData.inviteData['TGhNtYNAAs'])
		console.log(message.guild)
	},
};
