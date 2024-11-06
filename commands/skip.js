module.exports = {
    name: 'skip',
    aliases: ['s'],
    description: 'Mevcut şarkıyı atlar',
    async execute(message, args, client) {
        const queue = client.distube.getQueue(message);
        if (!queue) {
            return message.reply({
                embeds: [{
                    color: parseInt(client.config.embedColor.replace('#', ''), 16),
                    description: `${client.config.emojis.error} | ${client.config.messages.noQueue}`
                }]
            });
        }

        try {
            await queue.skip();
            message.reply({
                embeds: [{
                    color: parseInt(client.config.embedColor.replace('#', ''), 16),
                    description: `${client.config.emojis.skip} | ${client.config.messages.skipSong}`
                }]
            });
        } catch (error) {
            message.reply({
                embeds: [{
                    color: parseInt(client.config.embedColor.replace('#', ''), 16),
                    description: `${client.config.emojis.error} | Sırada başka şarkı yok!`
                }]
            });
        }
    }
};