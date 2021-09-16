const { MessageEmbed } = require('discord.js');

module.exports.run = async (client, message, args) => {
  var user = message.mentions.users.first() || message.author;
  var inv = {
    total: client.db.fetch(`invites_${user.id}`),
    regular: client.db.fetch(`regular_${user.id}`),
    bonus: client.db.fetch(`bonus_${user.id}`),
    left: client.db.fetch(`left_${user.id}`)
  };
  var embed = new MessageEmbed()
  .setAuthor(user.tag, user.displayAvatarURL({ dynamic: true }), 'https://discord.gg/SGdy3jtMCB')
  .setDescription(`**${user.tag}** has **${inv.total || 0}** invites! (**${inv.regular || 0}** regular, **${inv.bonus || 0}** bonus, **${inv.left || 0}** left)`)
  .setColor('#5555dd')
  .setFooter(client.user.username, client.user.displayAvatarURL({ dynamic: true }));
  return message.reply({ 
    embeds: [embed]
  });
};