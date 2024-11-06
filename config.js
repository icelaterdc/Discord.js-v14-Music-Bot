module.exports = {
    token: process.env.TOKEN,
    prefix: "!",
    botStatus: "🎵 Müzik Çalıyor",
    embedColor: "#ff0000",
    ownerID: "BOT_SAHİBİ_ID",
    
    // Emoji Ayarları
    emojis: {
        play: "▶️",
        pause: "⏸️",
        stop: "⏹️",
        queue: "📜",
        success: "✅",
        error: "❌",
        repeat: "🔁",
        skip: "⏭️"
    },

    // Mesaj Ayarları
    messages: {
        notInVoice: "Bir ses kanalında olmalısınız!",
        notInSameVoice: "Benimle aynı ses kanalında olmalısınız!",
        noPermission: "Bu komutu kullanma yetkiniz yok!",
        noQueue: "Şu anda çalan bir şarkı yok!",
        addedToQueue: "Şarkı sıraya eklendi:",
        nowPlaying: "Şimdi çalıyor:",
        skipSong: "Şarkı geçildi!",
        stoppedPlaying: "Müzik durduruldu!",
        volumeChanged: "Ses seviyesi değiştirildi:",
        queueEnded: "Sıra bitti, ses kanalından ayrılıyorum!"
    }
};