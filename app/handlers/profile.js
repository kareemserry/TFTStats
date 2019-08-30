const logger = require('../../utils/logger')(module.filename);
const consts = require('../../utils/consts');
const users = require('../../res/users');
const api = require('../api')

const util = require('util')

const help = require('./help');

// ~ts profile || ~ts profile <region> <username>
const profile = async (args, channel, user) => {
    if (!consts.regions.includes(args[0].toLowerCase())) {
        await channel.send("> Region not supported. try `~TFTStats help profile`");
        return;
    }

    switch (args.length) {
        case 0: await profileHelper(channel, getUsername(user), getRegion(user)); break;
        case 2: await profileHelper(channel, args[1], args[0]); break;
        default: await channel.send(help.getHelpMessage(consts.prefixes.profile)); break;
    }
}

const profileHelper = async (channel, username, region) => {
    logger.debug(`profileHelper ${username} ${region}`);
    var user;
    try {
        req = await api.getProfile(username, region);
        user = reqToObj(req.data.data.segments[0].stats, ["wins", "losses", "rank", "tier"])
    } catch (err) {
        logger.error(`${err.name} ${err.message}`)
    }
    logger.debug(util.inspect(user))
};

const reqToObj = (req, args) => {
    var obj = {};
    args.forEach(arg => {
        obj[arg] = req[arg]
    });
    return obj
}

const getUsername = user => {
    return users.getUsername(user);
};

const getRegion = user => {
    return users.getRegion(user);
};

module.exports = profile
