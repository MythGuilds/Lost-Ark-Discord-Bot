const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');
const roleWidget = require("../helpers/roleWidget");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('abyssal-dungeon-setup')
		.setDescription('Set up the Abyssal Dungeon Party Creator widget'),
	async execute(interaction) {
		let roleWidget = require("../helpers/webUIRedirectWidget")
		let widget = roleWidget.create(
			"Abyssal Dungeon",
			"Click on \"Create Party\" and follow the link to the Web User Interface",
			"show-abyssal-dungeon-link"
		)
		await interaction.reply(widget)
	},
};
