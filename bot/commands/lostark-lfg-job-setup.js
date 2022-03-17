const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageSelectMenu, MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('lostark-lfg-job-setup')
		.setDescription('Setup the lost ark party job select widget'),
	async execute(interaction) {

		const embed = new MessageEmbed()
			.setColor('#f2ff2b')
			.setTitle('Lost Ark Job Selection')
			.setDescription('Please select if you plan to DPS or Support for your party');

		const row = new MessageActionRow()
			.addComponents(
				new MessageSelectMenu()
					.setCustomId('select')
					.setPlaceholder('Nothing selected')
					.addOptions([
						{
							label: 'DPS',
							description: 'Register for parties as a DPS',
							value: 'DPS',
						},
						{
							label: 'Support',
							description: 'Register for parties as a Support',
							value: 'Support',
						}
					]),

			);
		await interaction.reply({ embeds: [embed], components: [row] });
	},
};
