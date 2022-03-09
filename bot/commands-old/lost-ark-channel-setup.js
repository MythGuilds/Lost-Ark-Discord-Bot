const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');
const roleWidget = require("../helpers/roleWidget");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('lost-ark-channel-setup')
		.setDescription('Set up your lost ark widget'),
	async execute(interaction) {
		let roleWidget = require("../helpers/roleWidget")
		let widget = roleWidget.create(
			"Lost Ark",
			"If you want to be able to see and interact with Lost Ark content, grab this role",
			"join-lost-ark",
			"leave-lost-ark"
		)
		await interaction.reply(widget);
	},
};
