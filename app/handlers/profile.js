const api = require('../api');

const logger = require('../../utils/logger')(module.filename);
const consts = require('../../utils/consts');
const puppeteer = require('../../utils/puppeteer');

const users = require('../../res/users');

const help = require('./help');

// ~ts profile || ~ts profile <region> <username>
const profile = async (args, msg, user) => {
    switch (args.length) {
        case 0: await profileHelper(msg, getUsername(user), getRegion(user)); break;
        case 2:
            if (!consts.regions.includes(args[0].toLowerCase())) {
                await msg.channel.send('> Region not supported. try `~TFTStats help profile`');
                return;
            }
            await profileHelper(msg, args[1], args[0]); break;
        default: await msg.channel.send(help.getHelpMessage(consts.prefixes.profile)); break;
    }
};

const profileHelper = async (msg, username, region) => {
    logger.debug(`profileHelper ${username} ${region}`);
    msg.react(consts.emoji.eye);
    let req;
    try {
        req = await api.getProfile(username, region);
    } catch (err) {
        logger.error(`${err.name} ${err.message}`);
        await msg.channel.send(`Couldnt find user \'${username}\' in region \'${region}\'`);
    }

    const user = reqToObj(req.data.data.segments[0].stats, ['wins', 'losses', 'rank', 'tier']);
    await sendImage(username, user, msg.channel);
};

const sendImage = async (username, user, channel) => {
    await channel.send({
        files: [
            await puppeteer.genImg({
                username,
                rankImg: user.tier.metadata.imageUrl,
                rank: user.tier.displayValue,
                win: user.wins.displayValue,
                loss: user.losses.displayValue,
                ratio: (user.wins.value / (user.losses.value + user.wins.value) * 100).toFixed(1)
            })]
    });
};

const reqToObj = (req, args) => {
    let obj = {};
    args.forEach((arg) => {
        obj[arg] = req[arg];
    });
    return obj;
};

const getUsername = (user) => {
    return users.getUsername(user);
};

const getRegion = (user) => {
    return users.getRegion(user);
};

module.exports = profile;


