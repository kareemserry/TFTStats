const consts = require('./utils/consts');
const logger = require('./utils/logger')(module.filename);

const handlers = require('./handlers/index');


const handle = async (msg) => {
    logger.info(`Recieved Message [${msg.id}]: '${msg.author.tag}: ${msg.content}'`);

    const args = msg.content.split(' ');

    if (args.length < 2) {
        logger.debug(`Message [${msg.id}] without any args`);
        await handlers.lost(msg.channel);
        return;
    }

    const args2 = args.slice(2, args.length); //get rid of ~tftstats <command>

    var args3 = []; //for profile and link profile
    if (args2[0]) { args3.push(args2[0]); }
    if (args2.length > 1) { args3.push(args2.slice(1, args.length).join(' ')); }

    switch (args[1]) {
        case consts.prefixes.help:
            await handlers.help(args2, msg.channel); break;
        case consts.prefixes.profile:
            await handlers.profile(args3, msg, msg.author); break;
        case consts.prefixes.link:
            await handlers.linkProfile(args3, msg); break;
        case consts.prefixes.stats:
            await handlers.stats(msg); break;
        case consts.prefixes.comps:
            await handlers.comps(args2, msg.channel); break;
        default: await handlers.lost(msg.channel); break;
    }

};

exports.handle = handle;