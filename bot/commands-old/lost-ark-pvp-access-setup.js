const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');
const roleWidget = require("../helpers/roleWidgetJoinOnly");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('lost-ark-pvp-access-setup')
		.setDescription('Set up your lost ark pvp access request widget'),
	async execute(interaction) {
		// interaction.reply({ content: `test`, ephemeral: true })
		let roleWidget = require("../helpers/roleWidgetJoinOnly")
		let widget = roleWidget.create(
			"Request access for your pvp team",
			null,
			"join-lost-ark-pvp-request-access"
		)
		await interaction.reply(widget);
	},
};
