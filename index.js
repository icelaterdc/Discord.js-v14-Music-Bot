require('dotenv').config();
const { Client, GatewayIntentBits, Collection } = require('discord.js');
const { DisTube } = require('distube');
const { SpotifyPlugin } = require('@distube/spotify');
const { SoundCloudPlugin } = require('@distube/soundcloud');
const { YtDlpPlugin } = require('@distube/yt-dlp');
const fs = require('fs');
const config = require('./config.js');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.MessageContent
    ]
});

client.commands = new Collection();
client.config = config;
client.distube = new DisTube(client, {
    leaveOnStop: true,
    leaveOnFinish: true,
    emitNewSongOnly: true,
    emitAddSongWhenCreatingQueue: false,
    emitAddListWhenCreatingQueue: false,
    plugins: [
        new SpotifyPlugin(),
        new SoundCloudPlugin(),
        new YtDlpPlugin()
    ],
    ytdlOptions: {
        quality: 'highestaudio',
        highWaterMark: 1 << 25
    }
});

// Komut Yükleyici
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

// Event Handler
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));
for (const file of eventFiles) {
    const event = require(`./events/${file}`);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args, client));
    } else {
        client.on(event.name, (...args) => event.execute(...args, client));
    }
}

// DisTube Events
const status = queue =>
    `Ses: \`${queue.volume}%\` | Filtre: \`${queue.filters.names.join(', ') || 'Kapalı'}\` | Tekrar: \`${
    queue.repeatMode ? (queue.repeatMode === 2 ? 'Tüm Liste' : 'Bu Şarkı') : 'Kapalı'
    }\``;

client.distube
    .on('playSong', (queue, song) =>
        queue.textChannel.send({
            embeds: [{
                color: parseInt(config.embedColor.replace('#', ''), 16),
                description: `${config.emojis.play} | ${config.messages.nowPlaying}\n${song.name}`,
                fields: [
                    { name: '🎵 Şarkıyı Açan', value: `${song.user}`, inline: true },
                    { name: '⏱️ Süre', value: song.formattedDuration, inline: true },
                    { name: '⚙️ Durum', value: status(queue), inline: false }
                ]
            }]
        })
    )
    .on('addSong', (queue, song) =>
        queue.textChannel.send({
            embeds: [{
                color: parseInt(config.embedColor.replace('#', ''), 16),
                description: `${config.emojis.success} | ${config.messages.addedToQueue}\n${song.name}`
            }]
        })
    )
    .on('error', (channel, e) => {
        channel.send({
            embeds: [{
                color: parseInt(config.embedColor.replace('#', ''), 16),
                description: `${config.emojis.error} | Bir hata oluştu: ${e.toString().slice(0, 1974)}`
            }]
        });
        console.error(e);
    });

client.login(config.token);