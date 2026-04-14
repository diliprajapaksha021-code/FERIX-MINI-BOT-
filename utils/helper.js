// Helper functions for the bot

module.exports = {
    // Format time duration
    formatUptime: (seconds) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return `${hours}h ${minutes}m ${secs}s`;
    },
    
    // Check if sender is owner
    isOwner: (sender, ownerNumber) => {
        return sender.includes(ownerNumber.replace('+', ''));
    },
    
    // Format phone number
    formatNumber: (number) => {
        return number.replace('@s.whatsapp.net', '');
    },
    
    // Get current Sri Lanka time
    getSriLankaTime: () => {
        return new Date().toLocaleString('si-LK', { timeZone: 'Asia/Colombo' });
    },
    
    // Simple logging
    log: (type, message) => {
        const timestamp = new Date().toISOString();
        console.log(`[${timestamp}] [${type}] ${message}`);
    }
};
