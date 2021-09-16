const { MessageEmbed } = require('discord.js');
const sahips = ["", ""]; // idleriniz

module.exports.run = async (client, message, args) => {
  if (!sahips.includes(message.author.id)) return;
  var user = message.mentions.users.first() || client.users.cache.get(args[0]);
  if (!user) {
    var embed = new MessageEmbed()
    .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }), 'https://discord.gg/SGdy3jtMCB')
    .setDescription(`:x: Please provide a user or user id.`)
    .setColor('#5555dd')
    .setFooter(client.user.username, client.user.displayAvatarURL({ dynamic: true }));
    return message.reply({ 
      embeds: [embed]
    });
  } else {
    var data = args[1];
    if (!data) {
      var embed = new MessageEmbed()
      .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }), 'https://discord.gg/SGdy3jtMCB')
      .setDescription(`:x: Please provide a number.`)
      .setColor('#5555dd')
      .setFooter(client.user.username, client.user.displayAvatarURL({ dynamic: true }));
      return message.reply({ 
        embeds: [embed]
      });
    } else {
      var embed = new MessageEmbed()
      .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }), 'https://discord.gg/SGdy3jtMCB')
      .setDescription(`:+1: **${data}** invites have been added to **${user.tag}**.`)
      .setColor('#5555dd')
      .setFooter(client.user.username, client.user.displayAvatarURL({ dynamic: true }));
      return message.reply({ 
        embeds: [embed]
      }).then(async () => {
        await client.db.add(`bonus_${user.id}`, data);
        await client.db.add(`invites_${user.id}`, data);
      });
    }
  }
};