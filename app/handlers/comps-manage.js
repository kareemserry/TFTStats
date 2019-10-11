const logger = require('../utils/logger')(module.filename);
const consts = require('../utils/consts');
const Comps = require('../models/Comps');


// ~ts comps || ~ts comps <number>
const reset = async (args, msg) => {
    if (msg.author.id === '267420761516539904') {
        switch (args.length) {
            case 0:
                await Comps.deleteMany({});
                await msg.react(consts.emoji.thumbsUp);
                break;
            default: await msg.channel.send('this ain\'t right'); break;
        }
    } else {
        logger.info("Unauthorized use of owner commands!");
    }
};

const add = async (args, msg) => {
    if (msg.author.id === '267420761516539904') {
        switch (args.length) {
            case 1:
                logger.debug(JSON.parse(args[0]));
                await Comps.create(JSON.parse(args[0]));
                await msg.react(consts.emoji.thumbsUp);
                break;
            default: await msg.channel.send('this ain\'t right'); break;
        }
    } else {
        logger.info("Unauthorized use of owner commands!");
    }
};

module.exports = { reset, add };