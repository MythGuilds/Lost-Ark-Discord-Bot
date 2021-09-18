const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('channel-info')
		.setDescription('Prints out channel information'),
	async execute(interaction) {
		return interaction.reply({ content: `Name: \`${interaction.channel.name}\`\nID: \`${interaction.channel.id}\``, ephemeral: true });
	},
};
