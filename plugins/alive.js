const { cmd, commands } = require('../command');
const os = require("os");
const { runtime } = require('../lib/functions');

cmd({
    pattern: "alive",
    alias: ["av", "runtime", "uptime"],
    desc: "Check uptime and system status",
    category: "main",
    react: "📟",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        // Get system info
        const platform = "Heroku Platform"; // Fixed deployment platform
        const release = os.release(); // OS version
        const cpuModel = os.cpus()[0].model; // CPU info
        const totalMem = (os.totalmem() / 1024 / 1024).toFixed(2); // Total RAM in MB
        const usedMem = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2); // Used RAM in MB

        // Stylish and detailed system status message
        const status = `╭───❰ *Jᴏsʜᴜᴀᴍᴀᴍʙᴏᴢᴍ 𝐗𝐌𝐃* ❱───➤
┃ ✨ 𝗨𝗽𝘁𝗶𝗺𝗲: *${runtime(process.uptime())}*
┃ 💾 𝗥𝗮𝗺 𝗨𝘀𝗮𝗴𝗲: *${usedMem}MB / ${totalMem}MB*
┃ 🧑‍💻 𝗗𝗲𝗽𝗹𝗼𝘆𝗲𝗱 𝗢𝗻: *${platform}*
┃ 🔧 𝗖𝗣𝗨: *${cpuModel}*
┃ 👨‍💻 𝗢𝘄𝗻𝗲𝗿: *mr 𝕁𝕠𝕤𝕙𝕦𝕒𝕞𝕒𝕞𝕓𝕠𝕫𝕞*
┃ 🧬 𝗩𝗲𝗿𝘀𝗶𝗼𝗻: *𝟯.𝟬.𝟬 𝗕𝗘𝗧𝗔*
╰───────────────────────➤
> ᴊᴏsʜᴋɪɴɢ01`;

        // Send image + caption + audio combined
        await conn.sendMessage(from, { 
            image: { url: `https://i.postimg.cc/GmRpKL8j/1717623406802.jpg` },  
            caption: status,
            contextInfo: {
                mentionedJid: [m.sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterName: '𝕁𝕆𝕊ℍ𝕌𝔸𝕄𝔸𝕄𝔹𝕆 𝐀𝐋𝐈𝐕𝐄🍀',
                    serverMessageId: 143
                }
            }
        }, { quoted: mek });

        // Attach audio within the same "quoted" message for grouping
        await conn.sendMessage(from, { 
            audio: { url: 'https://files.catbox.moe/da6m1z.mp4' },
            mimetype: 'audio/mp4',
            ptt: true 
        }, { quoted: mek });

    } catch (e) {
        console.error("Error in alive command:", e);
        reply(`🚨 *An error occurred:* ${e.message}`);
    }
});
