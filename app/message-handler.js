const consts = require('../utils/consts.js');
const logger = require('../utils/logger.js')(module.filename);


handle = msg => {
    logger.silly(`Recieved Message: '${msg.author.username}: ${msg.content}'`);
}

exports.handle = handle