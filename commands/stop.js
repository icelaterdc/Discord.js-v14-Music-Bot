module.exports = {
    name: 'stop',
    aliases: ['leave', 'disconnect'],
    description: 'Müziği durdurur ve kanaldan ayrılır',
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

        queue.stop();
        message.reply({
            embeds: [{
                color: parseInt(client.config.embedColor.replace('#', ''), 16),
                description: `${client.config.emojis.stop} | ${client.config.messages.stoppedPlaying}`
            }]
        });
    }
};