const help = require("./help");
const logger = require('../../utils/logger')(module.filename);

const lost = async channel => {
    await channel.send(`????? Use: \`~TFTStats help\``)
    logger.info(`lost message sent at ${channel.guild.name}:${channel.name}`);
}

module.exports.help = help;
module.exports.lost = lost;