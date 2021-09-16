const { joinVoiceChannel } = require('@discordjs/voice');

module.exports = async (client) => {
    console.log('bot hazır.');
    client.user.setPresence({
        activities: [
            {
                name: "V13 InviteManager",
                type: "COMPETING"
            }
        ],
        status: "idle"
    });
    client.guilds.cache.forEach(guild => {
        guild.invites.fetch().then(invites => client.invites.set(guild.id, invites));
    });
    var channel = client.channels.cache.get('887726004058079262');
    await joinVoiceChannel({
        channelId: channel.id,
        guildId: channel.guild.id,
        adapterCreator: channel.guild.voiceAdapterCreator
    });
};