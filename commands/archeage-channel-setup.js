const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');
const roleWidget = require("../helpers/roleWidget");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('archeage-channel-setup')
		.setDescription('Set up your archeage widget'),
	async execute(interaction) {
		let roleWidget = require("../helpers/roleWidget")
		let widget = roleWidget.create(
			"Archeage",
			"If you want to be able to see and interact with archeage content, grab this role",
			"join-archeage",
			"leave-archeage"
		)
		await interaction.reply(widget);
	},
};
