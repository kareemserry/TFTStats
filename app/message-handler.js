const consts = require('../utils/consts.js');
const logger = require('../utils/logger.js')(module.filename);


handle = msg => {
    logger.silly(`Recieved Message: '${msg.author.username}: ${msg.content}'`);

    if (msg.content.split(" ")[1] == "hello!") msg.reply("Hi!");
}

exports.handle = handle