// ============================================
// PAIRING CODE VERSION - index.js
// ============================================

const { default: makeWASocket, 
        useMultiFileAuthState, 
        DisconnectReason } = require('@whiskeysockets/baileys');
const { Boom } = require('@hapi/boom');
const fs = require('fs');
const config = require('./config');

// ඔයාගේ WhatsApp අංකය (ජාත්‍යන්තර ආකෘතියෙන්)
// උදාහරණය: 9470XXXXXXX (0 එකක් නැතුව, + එකකුත් නැතුව)
const YOUR_PHONE_NUMBER = "9470XXXXXXX";  // 👈 ඔයාගේ අංකය දාන්න

let botStartTime = Date.now();
let sock = null;

async function startBot() {
    const { state, saveCreds } = await useMultiFileAuthState('auth_info');
    
    sock = makeWASocket({
        auth: state,
        printQRInTerminal: false,  // QR Code එක අක්‍රියයි
        browser: ['My WhatsApp Bot', 'Chrome', '1.0.0']
    });
    
    // ============================================
    // PAIRING CODE එක ලබා ගැනීම
    // ============================================
    sock.ev.on('connection.update', async (update) => {
        const { connection, lastDisconnect, qr } = update;
        
        if (connection === 'close') {
            const shouldReconnect = (lastDisconnect?.error)?.output?.statusCode !== DisconnectReason.loggedOut;
            console.log('📵 සම්බන්ධතාවය වසා ඇත. නැවත සම්බන්ධ වෙමින්...', shouldReconnect);
            if (shouldReconnect) {
                startBot();
            }
        } 
        else if (connection === 'open') {
            console.log(`✅ ${config.BOT_NAME} සාර්ථකව සම්බන්ධ විය!`);
            console.log(`📱 ඔබගේ WhatsApp එකට .menu ටයිප් කරන්න`);
        }
        
        // ============================================
        // PAIRING CODE එක GENERATE කිරීම
        // ============================================
        if (connection === 'open') {
            // Bot එක connect වුනාට පස්සේ pairing code එක request කරන්න
            setTimeout(async () => {
                try {
                    const code = await sock.requestPairingCode(YOUR_PHONE_NUMBER);
                    console.log(`\n🔐 ඔබගේ PAIRING CODE එක: ${code}\n`);
                    console.log(`📱 WhatsApp එකේ > Linked Devices > Link a Device > Pair with Phone Number`);
                    console.log(`🔢 මෙම අංකය ඇතුලත් කරන්න: ${code}\n`);
                } catch (error) {
                    console.error('Pairing code request failed:', error);
                }
            }, 3000); // තත්පර 3ක් රැඳී සිටින්න
        }
    });
    
    // ============================================
    // පණිවිඩ හැසිරවීම (ඉහත තිබුනු code එකම)
    // ============================================
    sock.ev.on('messages.upsert', async ({ messages }) => {
        const msg = messages[0];
        if (!msg.message || msg.key.fromMe) return;
        
        const sender = msg.key.remoteJid;
        const messageText = msg.message.conversation || 
                           msg.message.extendedTextMessage?.text || '';
        
        // ... ඔයාගේ පැරණි command handler code එක මෙතනට දාන්න ...
        // (ඉහත තිබුනු switch-case code එකම)
    });
    
    sock.ev.on('creds.update', saveCreds);
}

startBot().catch(err => {
    console.error('Bot start කිරීමේදී දෝෂයක්:', err);
});
