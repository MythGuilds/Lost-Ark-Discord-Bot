const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');
const roleWidget = require("../helpers/roleWidget");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('gathering-channel-setup')
		.setDescription('Set up your gathering widget'),
	async execute(interaction) {
		let roleWidget = require("../helpers/roleWidget")
		let widget = roleWidget.create(
			"New World Gather",
			"People who wish to volunteer as a gatherer for company crafting projects (You'll be assigned runs/quotas and all mats gathered go to the company for that time)",
			"join-new-world-gather",
			"leave-new-world-gather"
		)
		await interaction.reply(widget);
	},
};
