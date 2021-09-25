const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');
const roleWidget = require("../helpers/roleWidget");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('dota-channel-setup')
		.setDescription('Set up your dota widget'),
	async execute(interaction) {
		let roleWidget = require("../helpers/roleWidget")
		let widget = roleWidget.create(
			"Dota2",
			"If you want to be able to see and interact with dota2 content, grab this role",
			"join-dota",
			"leave-dota"
		)
		await interaction.reply(widget);
	},
};
