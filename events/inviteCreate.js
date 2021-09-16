module.exports = async (client, invite) => {
    client.invites.set(invite.guild.id, await invite.guild.invites.fetch());
};