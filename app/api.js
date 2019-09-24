const axios = require('axios');

const logger = require('./utils/logger')(module.filename);
const consts = require('./utils/consts');
const util = require('util');

const Urls = {
    trackerGG: 'https://api.tracker.gg/api/v2/tft/standard',
    blitzGG: 'https://solomid-resources.s3.amazonaws.com/blitz/tft',
    ddragon: 'https://ddragon.leagueoflegends.com/cdn/9.17.1'
};

const trackerGG = axios.create({ baseURL: Urls.trackerGG });
const blitzGG = axios.create({ baseURL: Urls.blitzGG });

const getProfile = async (username, region) => {
    logger.info(`trackerGG Get Profile : ${username} ${region}`);
    const res = await trackerGG.get(`/profile/riot/${username}`, {
        params: {
            region: region.toUpperCase()
        }
    });
    logger.debug(util.inspect(res.data));
    return res.data;
};

const getChampions = async () => {
    logger.info('blitzGG Get Champions');
    const res = await blitzGG.get('/data/champions.json');
    logger.debug(util.inspect(res.data));
    return res.data;
};

const getComps = async () => {
    logger.info('blitzGG Get Comps');
    const res = await blitzGG.get('/data/comps.json');
    logger.debug(util.inspect(res.data));
    return res.data;
};

module.exports = {
    getProfile,
    getChampions,
    getComps
};