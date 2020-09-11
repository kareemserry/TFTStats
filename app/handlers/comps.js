const logger = require('../utils/logger')(module.filename);
const consts = require('../utils/consts');
const puppeteer = require('../utils/puppeteer');

const help = require('./help');
const { send } = require('process');

// ~ts comps || ~ts comps <number> || ~ts comps pro || ~ts comps pro <number>
const comps = async (args, msg) => {
    switch (args.length) {
        case 0:
            await sendAllComps(msg)
            break;
        case 1:
            if (args[0] === 'pro')
                await sendAllComps(msg, true);
            else {
                //detail
                if (false && parseInt(args[0])) /*wip*/
                    await sendComp(msg, parseInt(args[0]))
                else
                    await msg.channel.send('Do you mean `~ts comps pro`?'/* Or maybe `~ts comps 1`?'*/);
            }
            break;
        case 2:
            if (false && args[0] === 'pro' /*wip*/) {
                if (parseInt(args[1]) > 0)
                    await sendComp(msg, parseInt(args[1]), true)
                else
                    await msg.channel.send(`${args[1]} ... thats not a positive integer`)
                break;
            }
        default: await msg.channel.send(help.getHelpMessage(consts.prefixes.comps)); break;
    }
};

const sendComp = async (msg, num, isPro) => {
    msg.react(consts.emoji.eye);
    const img = await puppeteer.getBlitzGGComp(num, isPro);
    await msg.channel.send({
        files: [{
            attachment: img,
            name: "comp.png"
        }]
    })
}


const sendAllComps = async (msg, isPro) => {
    msg.react(consts.emoji.eye);
    const imgs = await puppeteer.getBlitzGGComps(isPro);
    const files = imgs.map((img, index) => {
        return {
            attachment: img,
            name: `comp${index}.png`
        }
    })
    await msg.channel.send({ files })
};

module.exports = comps;