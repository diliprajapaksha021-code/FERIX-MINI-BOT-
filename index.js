// ============================================
// MY WHATSAPP BOT - MAIN FILE
// ============================================

// අවශ්‍ය පුස්තකාල (libraries) import කරමු
const { default: makeWASocket, 
        useMultiFileAuthState, 
        DisconnectReason,
        downloadContentFromMessage } = require('@whiskeysockets/baileys');
const { Boom } = require('@hapi/boom');
const fs = require('fs');
const config = require('./config');

// Bot එකේ වෙනස්වන තොරතුරු
let botStartTime = Date.now();
let sock = null;

// ============================================
// ප්‍රධාන Bot Function එක
// ============================================
async function startBot() {
    // පෙර සැසිය (session) සුරකින ආකාරය
    // QR Code නැවත scan කිරීමට අවශ්‍ය නැත
    const { state, saveCreds } = await useMultiFileAuthState('auth_info');
    
    // Bot socket එක create කරමු
    sock = makeWASocket({
        auth: state,
        printQRInTerminal: true,  // QR Code terminal එකේ print වෙයි
        browser: ['My WhatsApp Bot', 'Chrome', '1.0.0']  // Bot identity
    });
    
    // ============================================
    // සම්බන්ධතා තත්වය (Connection Status)
    // ============================================
    sock.ev.on('connection.update', (update) => {
        const { connection, lastDisconnect } = update;
        
        if (connection === 'close') {
            const shouldReconnect = (lastDisconnect?.error)?.output?.statusCode !== DisconnectReason.loggedOut;
            console.log('📵 සම්බන්ධතාවය වසා ඇත. නැවත සම්බන්ධ වෙමින්...', shouldReconnect);
            if (shouldReconnect) {
                startBot();  // නැවත සම්බන්ධ කිරීමට උත්සාහ කරන්න
            }
        } else if (connection === 'open') {
            console.log(`✅ ${config.BOT_NAME} සාර්ථකව සම්බන්ධ විය!`);
            console.log(`📱 ඔබගේ WhatsApp එකට .menu ටයිප් කරන්න`);
        }
    });
    
    // ============================================
    // පණිවිඩ ලැබෙන විට
    // ============================================
    sock.ev.on('messages.upsert', async ({ messages }) => {
        const msg = messages[0];
        
        // අප විසින්ම යැවූ පණිවිඩ නොසලකන්න
        if (!msg.message || msg.key.fromMe) return;
        
        const sender = msg.key.remoteJid;
        const messageText = msg.message.conversation || 
                           msg.message.extendedTextMessage?.text || 
                           '';
        
        // Group chats වලදී @mention හැසිරවීම
        const isGroup = sender.endsWith('@g.us');
        const senderName = msg.pushName || 'User';
        
        console.log(`📩 ${isGroup ? 'Group' : 'Private'} message from ${senderName}: ${messageText}`);
        
        // ============================================
        // COMMAND HANDLER
        // ============================================
        
        // Bot එකට කතා කරන්නේ කවදාද?
        // 1. .command (prefix එක්ක)
        // 2. @bot mention (groups වලදී)
        const prefix = config.PREFIX;
        let isCommand = false;
        let command = '';
        let args = [];
        
        // Check if message starts with prefix
        if (messageText.startsWith(prefix)) {
            isCommand = true;
            const parts = messageText.slice(prefix.length).trim().split(' ');
            command = parts[0].toLowerCase();
            args = parts.slice(1);
        }
        
        // Check if bot is mentioned (for groups)
        const isMentioned = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid?.includes(sock.user.id);
        
        if (!isCommand && !isMentioned && config.AUTO_REPLY) {
            // Auto reply for non-command messages
            await sock.sendMessage(sender, { 
                text: config.DEFAULT_REPLY 
            });
            return;
        }
        
        // ============================================
        // COMMANDS LIST
        // ============================================
        
        let replyText = '';
        
        switch(command) {
            
            // ---------- MENU COMMAND ----------
            case 'menu':
                let menuText = `╭━━━━━━━━━━━━━━━╮
┃ *${config.FERIX_MINI}*
┃ *Version:* 1.0.0
┃ *Creator:* ${config.94701951327}
╰━━━━━━━━━━━━━━━╯

╭━━〔 *COMMANDS* 〕━━⬤
┃
┃ ✦ *${prefix}alive* - Bot තත්වය
┃ ✦ *${prefix}ping* - ප්‍රතිචාර කාලය
┃ ✦ *${prefix}menu* - මෙම ලැයිස්තුව
┃ ✦ *${prefix}time* - වේලාව
┃
╰━━━━━━━━━━━━━━━╯

✨ *How to use:* ${prefix}command
📱 *Support:* WhatsApp me if needed

> ${config.BOT_NAME} - Always Active`;
                replyText = menuText;
                break;
                
            // ---------- ALIVE COMMAND ----------
            case 'alive':
                const uptime = Math.floor((Date.now() - botStartTime) / 1000);
                const hours = Math.floor(uptime / 3600);
                const minutes = Math.floor((uptime % 3600) / 60);
                const seconds = uptime % 60;
                
                replyText = `╭━━〔 *BOT STATUS* 〕━━⬤
┃
┃ ✅ *Status:* Active
┃ 🤖 *Bot Name:* ${config.FERIX_MINI}
┃ ⏱️ *Uptime:* ${hours}h ${minutes}m ${seconds}s
┃ 📅 *Started:* ${new Date(botStartTime).toLocaleString()}
┃
╰━━━━━━━━━━━━━━━╯

_Type ${prefix}menu for commands_ 🚀`;
                break;
                
            // ---------- PING COMMAND ----------
            case 'ping':
                const start = Date.now();
                await sock.sendMessage(sender, { text: '🏓 Calculating ping...' });
                const latency = Date.now() - start;
                replyText = `🏓 *PONG!*\n📡 *Latency:* ${latency}ms\n⚡ *Status:* Online`;
                break;
                
            // ---------- TIME COMMAND ----------
            case 'time':
                const now = new Date();
                const timeStr = now.toLocaleTimeString('si-LK', { timeZone: 'Asia/Colombo' });
                const dateStr = now.toLocaleDateString('si-LK', { timeZone: 'Asia/Colombo' });
                replyText = `🕐 *Sri Lanka Time*\n📅 ${dateStr}\n⏰ ${timeStr}`;
                break;
                
            // ---------- HELP COMMAND ----------
            case 'help':
                replyText = `📖 *Help Center*

මෙන්න ලබා ගත හැකි විධාන:

🔹 *${prefix}menu* - සියලුම විධාන බලන්න
🔹 *${prefix}alive* - බොට් තත්වය බලන්න
🔹 *${prefix}ping* - සම්බන්ධතා වේගය බලන්න
🔹 *${prefix}time* - ශ්‍රී ලංකා වේලාව බලන්න

*Need help?* Contact: ${config.94701951327}`;
                break;
                
            // ---------- UNKNOWN COMMAND ----------
            default:
                if (isCommand) {
                    replyText = `❌ *Unknown Command*

_${prefix}${command}_ හඳුනාගත නොහැක.

💡 *Available commands:* ${prefix}menu
📝 *Need help?* ${prefix}help`;
                }
                break;
        }
        
        // Send reply if we have one
        if (replyText) {
            await sock.sendMessage(sender, { text: replyText });
        }
    });
    
    // ============================================
    // සැසිය (Credentials) සුරකින්න
    // ============================================
    sock.ev.on('creds.update', saveCreds);
    
    return sock;
}

// ============================================
// Bot එක Start කරන්න
// ============================================
startBot().catch(err => {
    console.error('Bot start කිරීමේදී දෝෂයක්:', err);
});

// Ctrl+C එබුවහොත් හොඳින් වසා දමන්න
process.on('SIGINT', async () => {
    console.log('\n🔴 Bot එක වසා දමමින්...');
    if (sock) {
        await sock.logout();
    }
    process.exit(0);
});
