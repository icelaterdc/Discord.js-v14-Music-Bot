const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'queue',
    aliases: ['q'],
    description: 'Şarkı sırasını gösterir',
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

        const embed = new EmbedBuilder()
            .setColor(client.config.embedColor)
            .setTitle('🎵 Şarkı Sırası')
            .setDescription(
                queue.songs.map(
                    (song, id) => 
                    `**${id + 1}.** ${song.name} - \`${song.formattedDuration}\``
                ).slice(0, 10).join("\n")
            )
            .setFooter({ text: `Toplam ${queue.songs.length} şarkı` });

        message.reply({ embeds: [embed] });
    }
};