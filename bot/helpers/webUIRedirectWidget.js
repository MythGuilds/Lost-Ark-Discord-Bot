const {MessageActionRow, MessageButton, MessageEmbed} = require("discord.js");

module.exports = {
    create: function create(title, description, uiTypeID) {
        const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId(uiTypeID)
                    .setLabel('Create Party')
                    .setStyle('SUCCESS'),
            )

        const embed = new MessageEmbed()
            .setColor('#000000')
            .setTitle(title)
            .setDescription(description)

        return { components: [row], embeds: [embed] }
    }
}