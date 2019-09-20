const api = require('../api');

const logger = require('../utils/logger')(module.filename);
const consts = require('../utils/consts');
const puppeteer = require('../utils/puppeteer');

const Users = require('../models/Users');

const help = require('./help');

// ~ts comps || ~ts comps <number>
const comps = async (channel) => {
    switch (args.length) {
        case 0: {
            await sendAllComps(channel);
            break;
        }
        case 1:
            await sendThisComp(channel, args[0]);
            break;
        default: await msg.channel.send(help.getHelpMessage(consts.prefixes.comps)); break;
    }
};

const compsH = (channel) => {
    channel.send("wip");
};

module.exports = compsH;