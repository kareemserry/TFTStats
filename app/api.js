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
    logger.silly(util.inspect(res.data));
    return res.data;
};

const getChampions = async () => {
    logger.info('blitzGG Get Champions');
    const res = await blitzGG.get('/data/champions.json');
    logger.silly(util.inspect(res.data));
    return res.data;
};

const getItemIconLink = (item) => {
    return `${Urls.blitzGG}/items/${item}.png`;
};

const getCurrentPatch = async () => {
    logger.info('trackerGG Get Current Patch');
    const res = await blitzGG.get('/data/patches/index.json');
    if (!res.data[0]) throw Error("Couldn't get current patch");
    return res.data[0].title.replace('Patch ', '');
};

const getComps = async () => {
    logger.info('blitzGG Get Comps');
    const res = await blitzGG.get('/data/comps.json');
    logger.silly(util.inspect(res.data));
    return res.data;
};

const getChampionImgLink = (name) => {
    return `${Urls.ddragon}/img/champion/${name}.png`;
};

module.exports = {
    getProfile,
    getChampions,
    getComps,
    getChampionImgLink,
    getItemIconLink,
    getCurrentPatch
};