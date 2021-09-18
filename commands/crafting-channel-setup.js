const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('crafting-channel-setup')
		.setDescription('Set up your crafting widget'),
	async execute(interaction) {
		const row = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setCustomId('join-new-world-crafter')
					.setLabel('Join')
					.setStyle('SUCCESS'),
			)
			.addComponents(
				new MessageButton()
					.setCustomId('leave-new-world-crafter')
					.setLabel('Leave')
					.setStyle('DANGER'),
			);

		const embed = new MessageEmbed()
			.setColor('#0099ff')
			.setTitle('New World Crafter')
			.setDescription('Some description hereSome description herSome description herSome description herSome description her');

		await interaction.reply({ components: [row], embeds: [embed] });
	},
};
