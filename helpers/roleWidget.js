const {MessageActionRow, MessageButton, MessageEmbed} = require("discord.js");

module.exports = {
    create: function create(title, description, joinID, leaveID) {
        const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId(joinID)
                    .setLabel('Join')
                    .setStyle('SUCCESS'),
            )
            .addComponents(
                new MessageButton()
                    .setCustomId(leaveID)
                    .setLabel('Leave')
                    .setStyle('DANGER'),
            );

        const embed = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle(title)
            .setDescription(description);

        return { components: [row], embeds: [embed] }
    }
}