const logger = require('../../utils/logger')(module.filename);

const help = require("./help");
const profile = require("./profile");
const link = require("./link");

const lost = async channel => {
    await channel.send(`????? Use: \`~TFTStats help\``)
    logger.info(`lost message sent at ${channel.guild.name}:${channel.name}`);
}

module.exports.help = help;
module.exports.profile = profile;
module.exports.lost = lost;
module.exports.link = link;