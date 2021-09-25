const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');
const roleWidget = require("../helpers/roleWidget");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('new-world-channel-setup')
		.setDescription('Set up your new world widget'),
	async execute(interaction) {
		let roleWidget = require("../helpers/roleWidget")
		let widget = roleWidget.create(
			"New World",
			"If you want to be able to see and interact with New World content, grab this role",
			"join-new-world",
			"leave-new-world"
		)
		await interaction.reply(widget);
	},
};
