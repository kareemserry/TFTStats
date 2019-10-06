const logger = require('../utils/logger')(module.filename);
const util = require('util');

const help = require('./help');
const profile = require('./profile');
const linkProfile = require('./link');
const comps = require('./comps');

const compsManager = require('./comps-manage');

//require('../models/Comps');

const lost = async (channel) => {
    await channel.send('????? Use: \`~TFTStats help\`');
    logger.info(`lost message sent at ${channel.type == 'dm' ? `DM : ${channel.recipient.username}` : `${channel.guild.name} : ${channel.name}`}`);
};

const stats = async (msg) => {
    if (msg.author.id === '267420761516539904') {
        guilds = "";
        msg.client.guilds.forEach((guild) => guilds = guilds.concat("\t" + guild.name + "\n"));
        await msg.reply(`\n>>> Servers:\n${guilds}\n${msg.client.guilds.size}`);
    } else {
        logger.info("Unauthorized use of owner commands!");
    }
};

module.exports = {
    help,
    profile,
    lost,
    linkProfile,
    stats,
    comps,
    compsManager
};