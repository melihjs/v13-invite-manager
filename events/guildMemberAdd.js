module.exports = async (client, member) => {
  if (member.user.bot) return;
    const channel = ""; // kanal id
    if (!channel) return;
    const message = "{member:mention} **joined**; Invited by **{inviter:tag}** (**{inviter:invites}** invites)";
    const invites = client.invites.get(member.guild.id);
    const news = await member.guild.invites.fetch();
    client.invites.set(member.guild.id, news);
    try {
        const inv = news.find(async (i) => {
            invites.get(i.code).uses < i.uses
        });
        client.db.add(`invites_${inv.inviter.id}`, 1);
        client.db.set(`inviter_${member.user.id}`, inv.inviter.id);
        var invs = client.db.get(`invites_${inv.inviter.id}`) || 1;
        var join_msg = message
        .replace(/{member:mention}/g, member.user)
        .replace(/{member:name}/g, member.user.username)
        .replace(/{member:tag}/g, member.user.tag)
        .replace(/{member:id}/g, member.user.id)
        .replace(/{member:discriminator}/g, member.user.discriminator)
        .replace(/{inviter:mention}/g, inv.inviter)
        .replace(/{inviter:name}/g, inv.inviter.username)
        .replace(/{inviter:tag}/g, inv.inviter.tag)
        .replace(/{inviter:id}/g, inv.inviter.id)
        .replace(/{inviter:discriminator}/g, inv.inviter.discriminator)
        .replace(/{inviter:invites}/g, invs);
        client.db.add(`regular_${inv.inviter.id}`, 1);
        return member.guild.channels.cache.get(channel).send(join_msg);
    } catch (err) {
        return console.error(err.message);
    }
};