module.exports = async (client, member) => {
  if (member.user.bot) return;
    const channel = ""; // kanal id
    if (!channel) return;
    try {
        const inviter = client.db.fetch(`inviter_${member.user.id}`);
        if (!inviter) {
            const message = "**{member:tag}** left but I don't know invited to him.";
            const leave_msg = message
            .replace(/{member:tag}/g, member.user.tag);
            return member.guild.channels.cache.get(channel).send(leave_msg);
        }
        const message = "{member:tag} **left**; Invited by **{inviter:tag}**";
        const leave_msg = message
        .replace(/{member:tag}/g, member.user.tag)
        .replace(/{inviter:tag}/g, client.users.cache.get(inviter).tag);
        client.db.subtract(`invites_${inviter}`, 1);
        client.db.add(`left_${inviter}`, 1);
        return member.guild.channels.cache.get(channel).send(leave_msg);
    } catch (err) {
        return console.error(err.message);
    }
};