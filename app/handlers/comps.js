const api = require('../api');

const logger = require('../utils/logger')(module.filename);
const consts = require('../utils/consts');
const puppeteer = require('../utils/puppeteer');
const Comps = require('../models/Comps');

const drawer = require('../drawers/comps-custom');
const drawerBlitz = require('../drawers/comps-blitz');

const help = require('./help');

// ~ts comps || ~ts comps <number>
const comps = async (args, msg) => {
    if (true /* wip */) {
        await msg.channel.send("comps command is down until we get it updated for set 2, thank you for your patience");
        return;
    }
    switch (args.length) {
        case 0:
            await sendAllComps(msg);
            break;
        case 1:
            if (args[0] === 'blitz')
                await sendAllCompsBlitz(msg);
            else
                await msg.channel.send('Do you mean `~ts comps blitz`?');
            break;
        default: await msg.channel.send(help.getHelpMessage(consts.prefixes.comps)); break;
    }
};

const sendAllComps = async (msg) => {
    msg.react(consts.emoji.eye);
    const image = await drawer.drawComps(await Comps.find({}));
    await msg.channel.send({
        files: [image]
    });
};

const sendAllCompsBlitz = async (msg) => {
    msg.react(consts.emoji.eye);
    const image = await drawerBlitz.drawComps(
        (await api.getComps()).comps.filter((comp) => {
            return comp.tier == 1;
        }));
    await msg.channel.send({
        files: [image]
    });
};

module.exports = comps;