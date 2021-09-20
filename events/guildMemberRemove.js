function diff_minutes(dt1) {
    try {
        dt1.getTime()
    } catch (e) {
        console.error('User invite time not cached, skipping...')
        return
    }

    let dt2 = new Date()
    let diff =(dt2.getTime() - dt1.getTime()) / 1000;
    diff /= 60;
    return Math.abs(Math.round(diff));

}

module.exports = {
    name: 'guildMemberRemove',
    execute(member) {
        let client = member.client
        const channel = member.guild.channels.cache
            .find(channel => channel.id === client.customData.channelCodes["main-chat"])
        let minutesSurvived = diff_minutes(client.customData.newInviteTimes[member.user.username])
        switch(minutesSurvived) {
            case 0:
                channel.send(`${member.user} (${member.user.username}#${member.user.discriminator}) left the server after they where unable to find any under aged girls to harass`)
                break;
            case 1:
                channel.send(`${member.user} (${member.user.username}#${member.user.discriminator}) left the server after only 1 minute. Their search to find parents who love them will continue without us`)
                break;
            case 2:
                channel.send(`${member.user} (${member.user.username}#${member.user.discriminator}) left the server after only 2 minutes. Be sure to keep an eye on national news networks, maybe they will mention us in their suicide note`)
                break;
            case 3:
                channel.send(`${member.user} (${member.user.username}#${member.user.discriminator}) left the server after only 3 minutes. This wasn't the christian minecraft server they where looking for...`)
                break;
            case 4:
                channel.send(`${member.user} (${member.user.username}#${member.user.discriminator}) left the server 4 minutes after joining when they caught their mom sending nudes in the selfie channel`)
                break;
            case 5:
                channel.send(`${member.user} (${member.user.username}#${member.user.discriminator}) left the server after 5 minutes to get treatment for the cancer we gave them`)
                break;
            default:
                console.log(`${member.user} left`)
        }
    },
};