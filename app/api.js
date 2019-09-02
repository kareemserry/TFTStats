const axios = require("axios");

const logger = require("../utils/logger")(module.filename);
const consts = require("../utils/consts");

const profileUrl = "https://api.tracker.gg/api/v2/tft/standard";
const trackerGG = axios.create({ baseURL: profileUrl });

const getProfile = async (username, region) => {
    logger.info(`API Get profile ${username} ${region}`);
    return await trackerGG.get(`/profile/riot/${username}`, {
        params: {
            region: region.toUpperCase()
        }
    });
};

module.exports = {
    getProfile
};