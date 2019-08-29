const logger = require('../../utils/logger')(module.filename);
const consts = require('../../utils/consts');

const helpMessage = consts.utils.isDev() ? ">>>" +
    " \`~TFTStats help\`\n\tReturns list of available TFT Stats commands" + "\n\n" +
    " \`~TFTStats help <command>\`\n\tReturns detailed discription of command"
    : consts.envs.TFT_STATS_HELP_MESSAGE


// ~ts help || ~ts help <command>
const help = async (args, channel) => {
    switch (args.length) {
        case 0: await channel.send(helpMessage); logger.info(`General help message sent at ${channel.guild.name}:${channel.name}`); break;
        case 1: await channel.send(getHelpMessage(args[0])); logger.info(`<${args[0]}> help message sent at ${channel.guild.name}:${channel.name}`); break;
        //default: await channel.send();
    }
}

const helpMap = consts.utils.isDev() ?
    {
        help: "No one can help you here ...",
        other: "<command> is not a valid command."
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