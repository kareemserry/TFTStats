const logger = require('../../utils/logger')(module.filename);
const consts = require('../../utils/consts');
const users = require('../../res/users');

const help = require('./help');

// ~ts profile || ~ts profile <region> <username>
const profile = async (args, channel, user) => {
    switch (args.length) {
        case 0: await profileHelper(channel, getUsername(user), getRegion(user)); break;
        case 2: await profileHelper(channel, args[1], args[0]); break;
        default: await channel.send(help.getHelpMessage(consts.prefixes.profile)); break;
    }
}

const profileHelper = async (channel, username, region) => {
    logger.debug(`profileHelper ${username} ${region}`);
};

const getUsername = user => {
    return users.getUsername(user);
};

const getRegion = user => {
    return users.getRegion(user);
};

module.exports = profile
