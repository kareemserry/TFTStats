const logger = require('../../utils/logger')(module.filename);
const consts = require('../../utils/consts');

const helpMessage = consts.utils.isDev() ? ">>>" +
    " `~TFTStats help`\n\tReturns list of available TFT Stats commands" + "\n\n" +
    " `~TFTStats help <command>`\n\tReturns detailed discription of command" + "\n\n" +
    " `~TFTStats profile`\n\t Returns stats for linked TFT profile" + "\n\n" +
    " `~TFTStats profile <region> <uesrname>`\n\t Return stats for specific user"
    : consts.envs.TFT_STATS_HELP_MESSAGE


// ~ts help || ~ts help <command>
const help = async (args, channel) => {
    switch (args.length) {
        case 0: await channel.send(helpMessage); logger.info(`General help message sent at ${channel.guild.name}:${channel.name}`); break;
        case 1: await channel.send(getHelpMessage(args[0])); logger.info(`<${args[0]}> help message sent at ${channel.guild.name}:${channel.name}`); break;
        default: await channel.send(helpMessage); break;
    }
}

const helpMap = consts.utils.isDev() ?
    {
        help: ">>> No one can help you here ...",
        other: ">>> <command> is not a valid command.",
        profile: ">>> `~TFTStats profile`\n\tStats for your stored profile\n\n" +
            "`~TFTStats profile <region> <username>`\n\t stats for specific user on a specific region.\n" +
            "\t\tRegions: -EUW -NA\n" +
            "\t\tExample: *~TFTStats profile NA scarra*"
    }
    : JSON.parse(consts.envs.helpMap)

const getHelpMessage = command => {
    if (Object.values(consts.prefixes).includes(command)) {
        return helpMap[command];
    } else {
        return helpMap.other.replace("<command>", `\`${command}\` `);
    }
}

module.exports = help
module.exports.getHelpMessage = getHelpMessage