module.exports = {
    name: 'volume',
    aliases: ['vol', 'v'],
    description: 'Ses seviyesini ayarlar',
    execute(message, args, client) {
        const queue = client.distube.getQueue(message);
        if (!queue) {
            return message.reply({
                embeds: [{
                    color: parseInt(client.config.embedColor.replace('#', ''), 16),
                    description: `${client.config.emojis.error} | ${client.config.messages.noQueue}`
                }]
            });
        }

        const volume = parseInt(args[0]);
        if (isNaN(volume) || volume < 0 || volume > 100) {
            return message.reply({
                embeds: [{
                    color: parseInt(client.config.embedColor.replace('#', ''), 16),
                    description: `${client.config.emojis.error} | Lütfen 0-100 arası bir değer girin!`
                }]
            });
        }

        queue.setVolume(volume);
        message.reply({
            embeds: [{
                color: parseInt(client.config.embedColor.replace('#', ''), 16),
                description: `${client.config.emojis.success} | ${client.config.messages.volumeChanged} ${volume}%`
            }]
        });
    }
};