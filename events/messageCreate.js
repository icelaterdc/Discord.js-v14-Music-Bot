module.exports = {
    name: 'messageCreate',
    execute(message, client) {
        if (!message.content.startsWith(client.config.prefix) || message.author.bot) return;

        const args = message.content.slice(client.config.prefix.length).trim().split(/ +/);
        const commandName = args.shift().toLowerCase();

        const command = client.commands.get(commandName) ||
            client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

        if (!command) return;

        try {
            command.execute(message, args, client);
        } catch (error) {
            console.error(error);
            message.reply({
                embeds: [{
                    color: parseInt(client.config.embedColor.replace('#', ''), 16),
                    description: `${client.config.emojis.error} | Komut çalıştırılırken bir hata oluştu!`
                }]
            });
        }
    }
};