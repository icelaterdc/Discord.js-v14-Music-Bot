const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'play',
    aliases: ['p'],
    description: 'Müzik çalar',
    async execute(message, args, client) {
        const voiceChannel = message.member.voice.channel;
        if (!voiceChannel) {
            return message.reply({
                embeds: [{
                    color: parseInt(client.config.embedColor.replace('#', ''), 16),
                    description: `${client.config.emojis.error} | ${client.config.messages.notInVoice}`
                }]
            });
        }

        const query = args.join(' ');
        if (!query) {
            return message.reply({
                embeds: [{
                    color: parseInt(client.config.embedColor.replace('#', ''), 16),
                    description: `${client.config.emojis.error} | Lütfen bir şarkı adı veya bağlantı girin!`
                }]
            });
        }

        try {
            await client.distube.play(voiceChannel, query, {
                member: message.member,
                textChannel: message.channel,
                message
            });
        } catch (error) {
            console.error(error);
            message.reply({
                embeds: [{
                    color: parseInt(client.config.embedColor.replace('#', ''), 16),
                    description: `${client.config.emojis.error} | Bir hata oluştu: ${error.message}`
                }]
            });
        }
    }
};