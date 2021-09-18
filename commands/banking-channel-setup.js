const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('banking-channel-setup')
		.setDescription('Set up your banking widget'),
	async execute(interaction) {
		const row = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setCustomId('join-new-world-banker')
					.setLabel('Join')
					.setStyle('SUCCESS'),
			)
			.addComponents(
				new MessageButton()
					.setCustomId('leave-new-world-banker')
					.setLabel('Leave')
					.setStyle('DANGER'),
			);

		const embed = new MessageEmbed()
			.setColor('#0099ff')
			.setTitle('New World Banker')
			.setDescription('Some description hereSome description herSome description herSome description herSome description her');

		await interaction.reply({ components: [row], embeds: [embed] });
	},
};
