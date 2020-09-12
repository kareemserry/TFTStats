const logger = require('../utils/logger')(module.filename);
const consts = require('../utils/consts');
const Users = require('../models/Users');

const help = require('./help');

// ~ts link <region> <username>
const linkProfile = async (args, msg) => {
    switch (args.length) {
        case 2:
            if (!consts.regions.includes(args[0].toLowerCase())) {
                await msg.channel.send('> Region not supported. try `~TFTStats help link`');
                return;
            } await setUser(args[1], args[0], msg); break;
        default:
            await msg.channel.send(help.getHelpMessage(consts.prefixes.link)); break;
    }
};

const setUser = async (username, region, msg) => {
    const user = await Users.findOne({ discordID: msg.author.id });

    if (user) {
        await user.updateOne({
            username,
            region
        });
    } else {
        await Users.create({
            discordID: msg.author.id,
            username,
            region
        });
    }

    logger.info(`User [${msg.author.id}] updated linked account with (${region}, ${username})`);
    await msg.react(consts.emoji.thumbsUp);
};

module.exports = linkProfile;


