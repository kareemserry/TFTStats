const consts = require('../utils/consts');
const logger = require('../utils/logger')(module.filename);
const handlers = require('./handlers/index')


const handle = async msg => {
    logger.info(`Recieved Message [${msg.id}]: '${msg.author.username}: ${msg.content}'`);

    args = msg.content.split(" ");

    if (args.length < 2) {
        logger.debug(`Message [${msg.id}] without any args`)
        await handlers.lost(msg.channel)
        return;
    }

    switch (args[1]) {
        case consts.prefixes.help:
            await handlers.help(args.slice(2, args.length), msg.channel); break;
        default: await handlers.lost(msg.channel); break;

    }

}

exports.handle = handle