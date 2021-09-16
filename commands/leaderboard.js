const { MessageEmbed } = require('discord.js');

module.exports.run = async (client, message, args) => {
  var invites = client.db.all().filter(data => data.ID.startsWith('invites_')).sort((a, b) => b.data - a.data);
  invites.length = 10;
  var tablo = "";
  for (var i in invites) {
    tablo += `**${invites.indexOf(invites[i])+1}.** ${client.users.cache.get(invites[i].ID.replace("invites_", "")).tag} - \`${invites[i].data}\` invites (**${client.db.fetch(`regular_${invites[i].ID.replace("invites_", "")}`) || 0}** regular, **${client.db.fetch(`bonus_${invites[i].ID.replace("invites_", "")}`) || 0}** bonus, **${client.db.fetch(`left_${invites[i].ID.replace("invites_", "")}`) || 0}** left)\n`;
  }
  var user = message.author;
  var embed = new MessageEmbed()
  .setAuthor(user.tag, user.displayAvatarURL({ dynamic: true }), 'https://discord.gg/SGdy3jtMCB')
  .setDescription(`${tablo || "A leaderboard for the database could not be found."}`)
  .setColor('#5555dd')
  .setFooter(client.user.username, client.user.displayAvatarURL({ dynamic: true }));
  return message.reply({ 
    embeds: [embed]
  });
};