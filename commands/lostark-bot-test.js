
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('lostark-bot-test')
        .setDescription('Test to see if the Lost Ark bot commands are functional'),
    async execute(interaction) {
        return interaction.reply("Bot commands are working!");
    },
};