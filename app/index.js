const Discord = require('discord.js');

const logger = require('../utils/logger.js')(module.filename);
const consts = require('../utils/consts');

const messageHandler = require('./message-handler.js');

const client = new Discord.Client();

const profile = process.env.TFT_STATS_PROFILE
const token = profile == consts.profiles.production ? process.env.TFT_STATS_DISCORD_TOKEN : process.env.TFT_STATS_DISCORD_TOKEN_DEV;

client.on('ready', () => {
    logger.info(`Discord Bot Ready! Profile: ${profile}`);
});

client.on('message', msg => {
    if (msg.author.id == client.user.id)
        return

    if (msg.content.toLowerCase().startsWith("~tftstats ")) {
        messageHandler.handle(msg)
    }
})

client.login(token);