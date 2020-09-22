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

    ////////////////////////////////
    //update notification
    const text = `\`\`\`
    TFTStats just went through a major upgrade for set 4.
    Checkout our updated comps and profile commands! \`~ts help comps\` \`\`\``
    if (msg.channel.type !== "dm") {
        if (new Date().valueOf() - (msg.channel.guild.last_notif ? msg.channel.guild.last_notif : 0) > 21600000) {
            await msg.channel.send(text)
            msg.channel.guild.last_notif = new Date().valueOf()
        }
    } else {
        if (new Date().valueOf() - (msg.author.last_notif ? msg.author.last_notif : 0) > 21600000) {
            await msg.channel.send(text)
            msg.author.last_notif = new Date().valueOf()
        }
    }
    //will be removed later
    ////////////////////////////////


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
            await handlers.comps(args2, msg); break;
        default: await handlers.lost(msg.channel); break;
    }

};

exports.handle = handle;