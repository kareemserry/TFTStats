const Discord = require('discord.js');

const logger = require('../utils/logger')(module.filename);
const consts = require('../utils/consts');


const messageHandler = require('./message-handler');

const client = new Discord.Client();

const profile = process.env.TFT_STATS_PROFILE
const token = profile == consts.profiles.production ? process.env.TFT_STATS_DISCORD_TOKEN : process.env.TFT_STATS_DISCORD_TOKEN_DEV;

const ours = consts.ours;

client.on('ready', () => {
    logger.info(`Discord Bot Ready! Profile: ${profile}`);
});

client.on('message', msg => {
    if (msg.author.id == client.user.id)
        return

    if (ours(msg)) {
        try {
            messageHandler.handle(msg)
        } catch (err) {
            logger.error(err)
        }
    }
})

client.login(token);