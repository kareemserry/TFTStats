const api = require('../api');

const logger = require('../utils/logger')(module.filename);
const consts = require('../utils/consts');
const puppeteer = require('../utils/puppeteer');
const Comps = require('../models/Comps');

const drawer = require('../drawers/comps-custom');
const drawerBlitz = require('../drawers/comps-blitz');

const help = require('./help');
const { send } = require('process');

// ~ts comps || ~ts comps <number>
const comps = async (args, msg) => {
    if (false /* wip */) {
        await msg.channel.send("comps command is down until we get it updated for set 2, thank you for your patience");
        return;
    }
    switch (args.length) {
        case 0:
            await sendAllComps(msg)
            break;
        case 1:
            if (args[0] === 'pro')
                await sendAllCompsPro(msg);
            else {
                //detail
                if (parseInt(args[0]))
                    await sendComp(msg, parseInt(args[0]))
                else
                    await msg.channel.send('Do you mean `~ts comps pro`? Or maybe `~ts comps 1`?');
            }
            break;
        case 2:
            if (args[0] === 'pro') {
                if (parseInt(args[1]) > 0)
                    await sendCompPro(msg, parseInt(args[1]))
                else
                    await msg.channel.send(`${args[1]} ... thats not a positive integer`)
                break;
            }
        default: await msg.channel.send(help.getHelpMessage(consts.prefixes.comps)); break;
    }
};

const sendCompPro = async (msg, num) => {

}

const sendComp = async (msg, num) => {

}

const sendAllComps = async (msg) => {
    msg.react(consts.emoji.eye);
    //delegate sending images to puppeteer method since its loading multiple images.
    //instead of loading an array of images and then looping over it to send every image, send images as they are ready.
    await puppeteer.getBlitzGGComps(msg.channel);
};

const sendAllCompsPro = async (msg) => {
    msg.react(consts.emoji.eye);
    //delegate sending images to puppeteer method since its loading multiple images.
    //instead of loading an array of images and then looping over it to send every image, send images as they are ready.
    //await puppeteer.getBlitzGGProComps(msg.channel);
};

const sendAllCompsDep = async (msg) => {
    msg.react(consts.emoji.eye);
    const image = await drawer.drawComps(await Comps.find({}));
    await msg.channel.send({
        files: [image]
    });
};

const sendAllCompsBlitzDep = async (msg) => {
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