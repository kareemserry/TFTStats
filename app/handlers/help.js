const logger = require('../../utils/logger')(module.filename);
const consts = require('../../utils/consts');

const helpMessage = process.env.TFT_STATS_HELP_MESSAGE == undefined ? ">>>" +
    " \`~TFTStats help\`\n\tReturns list of available TFT Stats commands" + "\n\n" +
    " \`~TFTStats help <command>\`\n\tReturns detailed discription of command"
    : process.env.TFT_STATS_HELP_MESSAGE

const help = (args, channel) => {
    switch (args.length) {
        case 0: channel.send(helpMessage); logger.info(`General help message sent at ${channel.guild.name}:${channel.name}`); break;
        case 1: channel.send(getHelpMessage(args[0])); logger.info(`<${args[0]}> help message sent at ${channel.guild.name}:${channel.name}`); break;
    }
}

const helpMap = process.env.TFT_STATS_HELP_MAP == undefined ?
    {
        help: "No one can help you here ...",
        other: "<command> is not a valid command."
    }
    : JSON.parse(process.env.TFT_STATS_HELP_MAP)

const getHelpMessage = command => {
    if (Object.values(consts.prefixes).includes(command)) {
        return helpMap[command];
    } else {
        return helpMap.other.replace("<command>", `\`${command}\` `);
    }
}

module.exports = help