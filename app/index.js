require('dotenv').config();

const Discord = require('discord.js');

const logger = require('./utils/logger')(module.filename);
const mongo = require('./utils/mongo');
const consts = require('./utils/consts');

const messageHandler = require('./message-handler');

const client = new Discord.Client();

const profile = consts.envs.profile;
const token = consts.envs.token;
const ours = consts.utils.ours;


client.on('ready', () => {
    logger.info(`Discord Bot Ready! Profile: ${profile}`);
    client.user.setActivity('`~ts help`');
});

client.on('message', (msg) => {
    if (msg.author.id === client.user.id) {
        return;
    }

    if (ours(msg)) {
        messageHandler.handle(msg).catch((err) => {
            logger.error(err.stack);
        });
    }
});

client.login(token);