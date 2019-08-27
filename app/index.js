const Discord = require('discord.js');

const logger = require('../utils/logger.js')(module.filename);
const messageHandler = require('./message-handler.js');

const client = new Discord.Client();
const token = process.env.TFT_STATS_DISCORD_TOKEN;

client.on('ready', () => {
    logger.info("Discord Bot Ready!");
});

client.on('message', msg => {
    if (msg.author.id == client.user.id)
        return

    if (msg.content.toLowerCase().startsWith("~tftstats ")) {
        messageHandler.handle(msg)
    }
})

client.login(token);