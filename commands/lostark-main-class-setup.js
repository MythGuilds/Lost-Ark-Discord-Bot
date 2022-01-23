const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageSelectMenu, MessageEmbed } = require('discord.js');
const { lostArkClasses } = require('../store.json');
// const roleWidget = require("../helpers/roleWidget");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('lostark-main-class-setup')
		.setDescription('Set up your lostark class widget'),
	async execute(interaction) {

		const embed = new MessageEmbed()
			.setColor('#f2ff2b')
			.setTitle('Lost Ark Main Class')
			.setDescription('Please select the class you plan to main');
		let optionData = []
		lostArkClasses.forEach(function (laClass) {
			optionData.push({
				label: laClass,
				value: laClass,
			})
		})

		const row = new MessageActionRow()
			.addComponents(
				new MessageSelectMenu()
					.setCustomId('select')
					.setPlaceholder('Nothing selected')
					.addOptions(optionData)
					// .addOptions([
					// 	{
					// 		label: 'Artillerist',
					// 		description: 'This is a gunner based class',
					// 		value: 'artillerist',
					// 	},
					// 	{
					// 		label: 'Bard',
					// 		description: 'This is a mage based class',
					// 		value: 'bard',
					// 	},
					// 	{
					// 		label: 'Berserker',
					// 		description: 'This is a warrior based class',
					// 		value: 'berserker',
					// 	},
					// 	{
					// 		label: 'Deadeye',
					// 		description: 'This is a gunner based class',
					// 		value: 'deadeye',
					// 	},
					// 	{
					// 		label: 'Deathblade',
					// 		description: 'This is an assassin based class',
					// 		value: 'deathblade',
					// 	},
					// 	{
					// 		label: 'Gunlancer',
					// 		description: 'This is a warrior based class',
					// 		value: 'gunlancer',
					// 	},
					// 	{
					// 		label: 'Gunslinger',
					// 		description: 'This is a gunner based class',
					// 		value: 'gunslinger',
					// 	},
					// 	{
					// 		label: 'Paladin',
					// 		description: 'This is a warrior based class',
					// 		value: 'paladin',
					// 	},
					// 	{
					// 		label: 'Scrapper',
					// 		description: 'This is a martial artist based class',
					// 		value: 'scrapper',
					// 	},
					// 	{
					// 		label: 'Shadowhunter',
					// 		description: 'This is an assassin based class',
					// 		value: 'shadowhunter',
					// 	},
					// 	{
					// 		label: 'Sharpshooter',
					// 		description: 'This is a gunner based class',
					// 		value: 'sharpshooter',
					// 	},
					// 	{
					// 		label: 'Sorceress',
					// 		description: 'This is a mage based class',
					// 		value: 'sorceress',
					// 	},
					// 	{
					// 		label: 'Soulfist',
					// 		description: 'This is a martial artist based class',
					// 		value: 'soulfist',
					// 	},
					// 	{
					// 		label: 'Striker',
					// 		description: 'This is a martial artist based class',
					// 		value: 'striker',
					// 	},
					// 	{
					// 		label: 'Wardancer',
					// 		description: 'This is a martial artist based class',
					// 		value: 'wardancer',
					// 	},
					//
					// ]),

			);
		await interaction.reply({ content:'test', embeds: [embed], components: [row] });
	},
};
