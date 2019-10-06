const api = require('../api');

const logger = require('../utils/logger')(module.filename);
const consts = require('../utils/consts');
const puppeteer = require('../utils/puppeteer');

const drawer = require('../drawers/comps');

const help = require('./help');

// ~ts comps || ~ts comps <number>
const comps = async (args, msg) => {
    switch (args.length) {
        case 0:
            await sendAllComps(msg);
            break;
        default: await msg.channel.send(help.getHelpMessage(consts.prefixes.comps)); break;
    }
};

const sendAllComps = async (msg) => {
    msg.react(consts.emoji.eye);
    const image = await drawer.drawComps(
        (await api.getComps()).comps.filter((comp) => {
            return comp.tier == 1;
        }));
    await msg.channel.send({
        files: [image]
    });
};

module.exports = comps;