const logger = require('../../utils/logger')(module.filename);
const consts = require('../../utils/consts');
const users = require('../../res/users');

const help = require('./help');

// ~ts link <region> <username>
const link = async (args, msg) => {
    if (!consts.regions.includes(args[0].toLowerCase())) {
        await msg.channel.send("> Region not supported. try `~TFTStats help link`");
        return;
    }

    switch (args.length) {
        case 2: await setUser(args[1], args[0], msg);; break;
        default: await msg.channel.send(help.getHelpMessage(consts.prefixes.link)); break;
    }
}

const setUser = async (username, region, msg) => {
    users.setUser(msg.author.id, username, region);
    logger.info(`User [${msg.author.id}] updated linked account with (${region}, ${username})`);
    await msg.react(consts.emoji.thumbsUp);
}

module.exports = link


