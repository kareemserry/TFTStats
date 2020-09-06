const logger = require('../utils/logger')(module.filename);
const consts = require('../utils/consts');
const util = require('util');

const helpMessage = !consts.envs.helpMessage ? '>>>' +
    ' `~TFTStats help`\n\tReturns list of available TFT Stats commands' + '\n\n' +
    ' `~TFTStats help <command>`\n\tReturns detailed discription of command' + '\n\n' +
    ' `~TFTStats profile`\n\tReturns stats for linked TFT profile' + '\n\n' +
    ' `~TFTStats profile <region> <uesrname>`\n\tReturn stats for specific user' + '\n\n' +
    ' `~TFTStats link <region> <username>`\n\tLinks this account to your discord profile' + '\n\n' +
    ' `~TFTStats comps`\n\tReturns best 10 TFT comps' + '\n\n' +
    ' `~TFTStats comps <n>`\n\tReturns nth best TFT comp in detail' + '\n\n' +
    ' `~TFTStats comps pro`\n\tReturns best TFT recent pro played comps' + '\n\n' +
    ' `~TFTStats comps pro <n>`\n\tReturns nth best TFT recent pro played comp in detail'
    : consts.envs.helpMessage;


// ~ts help || ~ts help <command>
const help = async (args, channel) => {
    switch (args.length) {
        case 0: await channel.send(helpMessage); logger.info(`General help message sent at ${channel.type == 'dm' ? `DM : ${channel.recipient.username}` : `${channel.guild.name} : ${channel.name}`}`); break;
        case 1: await channel.send(getHelpMessage(args[0])); logger.info(`<${args[0]}> help message sent at ${channel.type == 'dm' ? `DM : ${channel.recipient.username}` : `${channel.guild.name} : ${channel.name}`}`); break;
        default: await channel.send(helpMessage); break;
    }
};

const helpMap = !consts.envs.helpMap ?
    {
        help: '>>> No one can help you here ...',
        other: '>>> <command> is not a valid command.',
        profile: '>>> `~TFTStats profile`\n\tStats for your linked profile\n\tCheck `~TFTStats help link`\n\n' +
            '`~TFTStats profile <region> <username>`\n\tStats for specific user on a specific region.\n' +
            `\t\tRegions: ${consts.regions.toString()}\n` +
            '\t\tExample: *~TFTStats profile NA scarra*',
        link: '>>> `~TFTStats link <region> <username>`\n\tLinks your TFT account to your discord profile,\n\tallowing you to use `~TFTStats profile`\n' +
            `\t\tRegions: ${consts.regions.toString()}\n` +
            '\t\tExample: *~TFTStats link NA scarra*',
        comps: '>>> `~TFTStats comps`\n\tThe top TFT team compositions as per reddit\'s u\\Wrainbash analysis\n\n' +
            '`~TFTStats comps blitz`\n\tThe top TFT team compositions as per Blitz.gg.\n'
    }
    : JSON.parse(consts.envs.helpMap);

const getHelpMessage = (command) => {
    if (Object.values(consts.prefixes).includes(command)) {
        return helpMap[command];
    } else {
        return helpMap.other.replace('<command>', `\`${command}\``);
    }
};

module.exports = help;
module.exports.getHelpMessage = getHelpMessage;