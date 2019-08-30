const fs = require('fs');
const logger = require('../utils/logger')(module.filename);
var users = require('./users.json')

logger.info("Users loaded")
logger.debug(`\n${JSON.stringify(users, null, 3)}`)

const getUsername = user => {
    return users[user.id].username
}

const getRegion = user => {
    return users[user.id].region
}

const setUser = (id, username, region) => {
    users[id] = { username, region };
    var data = JSON.stringify(users, null, 3);
    logger.silly(data)
    fs.writeFile('res/users.json', data, (err) => {
        if (err)
            logger.error(err);
        else
            logger.info("Users stored");
    });
}

module.exports.getUsername = getUsername
module.exports.getRegion = getRegion
module.exports.setUser = setUser