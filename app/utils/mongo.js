const consts = require('./consts');
const mongoose = require('mongoose');
const logger = require('./logger')(module.filename);


const connect = async () => {
    await mongoose.connect(consts.envs.dbString, { useNewUrlParser: true });
};

connect()
    .then(() => {
        logger.info("DB Connection up");
    })
    .catch((err) => {
        logger.error(err.name);
        logger.debug(err.message);
    });
