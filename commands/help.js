const { MessageEmbed } = require('discord.js');

module.exports.run = async (client, message, args) => {
  var user = message.author;
  var embed = new MessageEmbed()
  .setAuthor(user.tag, user.displayAvatarURL({ dynamic: true }), 'https://discord.gg/SGdy3jtMCB')
  .addField(`**All Commands** (4)`, "`add-invites`, `remove-invites`, `invites`, `leaderboard`")
  .setThumbnail(message.guild.iconURL({ dynamic: true }) || user.displayAvatarURL({ dynamic: true }))
  .setColor('#5555dd')
  .setFooter(client.user.username, client.user.displayAvatarURL({ dynamic: true }));
  return message.reply({ 
    embeds: [embed]
  });
};