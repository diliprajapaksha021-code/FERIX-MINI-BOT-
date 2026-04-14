// Command: alive
// Bot එකේ තත්වය පෙන්වයි

module.exports = {
    name: 'alive',
    description: 'Check if bot is running',
    execute: async (sock, sender, args, config, botStartTime) => {
        const uptime = Math.floor((Date.now() - botStartTime) / 1000);
        const hours = Math.floor(uptime / 3600);
        const minutes = Math.floor((uptime % 3600) / 60);
        const seconds = uptime % 60;
        
        const reply = `╭━━〔 *BOT STATUS* 〕━━⬤
┃
┃ ✅ *Status:* Active
┃ 🤖 *Bot Name:* ${config.FERIX_MINI_BOT}
┃ ⏱️ *Uptime:* ${hours}h ${minutes}m ${seconds}s
┃ 📅 *Started:* ${new Date(botStartTime).toLocaleString()}
┃
╰━━━━━━━━━━━━━━━╯

_Type ${config.PREFIX}menu for commands_ 🚀`;

        await sock.sendMessage(sender, { text: reply });
    }
};
