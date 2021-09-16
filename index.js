const { Client, Collection } = require('discord.js');
const fs = require('fs');
const moment = require('moment');
const path = require('path');
const client = new Client({ 
  intents: [
    'GUILDS',
    'GUILD_MEMBERS',
    'GUILD_BANS',
    'GUILD_EMOJIS_AND_STICKERS',
    'GUILD_INTEGRATIONS',
    'GUILD_WEBHOOKS',
    'GUILD_INVITES',
    'GUILD_VOICE_STATES',
    'GUILD_PRESENCES',
    'GUILD_MESSAGES',
    'GUILD_MESSAGE_REACTIONS',
    'GUILD_MESSAGE_TYPING',
    'DIRECT_MESSAGES',
    'DIRECT_MESSAGE_REACTIONS',
    'DIRECT_MESSAGE_TYPING',
  ] 
});
client.commands = new Collection();
client.files = fs.readdirSync;
client.moment = moment;
client.invites = new Map();
client.db = require('quick.db');
client.ms = require('ms');

var events = client.files(path.resolve(process.cwd(), "events"));
events.filter(file => file.endsWith('.js')).forEach(async (dosya) => {
    client.on(dosya.split('.js')[0], (x, y) => require(`./events/${dosya}`)(client, x, y));
});

var commands = client.files(path.resolve(process.cwd(), "commands"));
commands.filter(file => file.endsWith('.js')).forEach(async (dosya) => {
    var cmd = require(`./commands/${dosya}`);
    client.commands.set(dosya.split('.js')[0], {
        name: dosya.split('.js')[0],
        run: cmd.run
    });
});

client.login('');