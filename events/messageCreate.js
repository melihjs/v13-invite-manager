module.exports = async (client, message) => {
    var prefix = "";
    if (!message.guild) return;
    if (message.author.bot) return;
    if (message.content.indexOf(prefix) !== 0) return;
    var args = message.content.slice(prefix.length).trim().split(/ +/g);
    var command = args.shift();
    var cmd = client.commands.get(command);
    if (!cmd) return;
    if (cmd) cmd.run(client, message, args);
};