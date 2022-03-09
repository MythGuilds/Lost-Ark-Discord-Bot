const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');
const roleWidget = require("../helpers/roleWidget");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('debate-channel-setup')
		.setDescription('Set up your debate widget'),
	async execute(interaction) {
		let roleWidget = require("../helpers/roleWidget")
		let widget = roleWidget.create(
			"Debate Channel Access",
			"If you are asked to move an argument to the debate room, use this widget to gain access. You may also hide the debate room by removing your debate role.",
			"join-debate",
			"leave-debate"
		)
		await interaction.reply(widget);
	},
};
