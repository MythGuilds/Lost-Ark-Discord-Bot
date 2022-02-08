const {MessageActionRow, MessageButton, MessageEmbed} = require("discord.js");

module.exports = {
    create: function create(title, description, joinID, leaveID) {
        const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId(joinID)
                    .setLabel('Request')
                    .setStyle('SUCCESS'),
            )

        const embed = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle(title);

        if (description !== null)
        {
            embed.setDescription(description);
        }

        return { components: [row], embeds: [embed] }
    }
}