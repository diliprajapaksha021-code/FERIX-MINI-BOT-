// Bot එකේ සියලුම සැකසුම් මෙතන
module.exports = {
    // Bot එකේ නම
    BOT_NAME: "FERIX-MINI-BOT",
    
    // ඔයාගේ WhatsApp අංකය (owner)
    OWNER_NUMBER: "94701951327,  // ඔයාගේ අංකය දාන්න
    
    // Bot එකට reply කරන්න ඕන prefix එක
    // උදා: .menu, !alive, /ping
    PREFIX: ".",
    
    // Bot එක active කරන commands
    COMMANDS: {
        "menu": "📋 Show all commands",
        "alive": "✅ Check if bot is running",
        "ping": "🏓 Check bot response time"
    },
    
    // Welcome message settings
    WELCOME_MESSAGE: true,
    
    // Auto reply settings
    AUTO_REPLY: true,
    DEFAULT_REPLY: "ස්තුතියි! ඔයාගේ පණිවිඩය ලැබුනා. .menu ටයිප් කරන්න commands බලන්න."
};
