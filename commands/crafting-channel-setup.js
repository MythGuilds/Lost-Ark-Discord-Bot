const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');
const roleWidget = require("../helpers/roleWidget");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('crafting-channel-setup')
		.setDescription('Set up your crafting widget'),
	async execute(interaction) {
		let roleWidget = require("../helpers/roleWidget")
		let widget = roleWidget.create(
			"New World Crafter",
			"People who wish to volunteer as a crafter for company crafting projects (choose one primary profession)",
			"join-new-world-crafter",
			"leave-new-world-crafter"
		)
		await interaction.reply(widget);
	},
};
