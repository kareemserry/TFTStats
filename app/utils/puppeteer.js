const puppeteer = require('puppeteer');
const path = require('path');
const util = require('util')

const logger = require('./logger')(module.filename);
const consts = require('./consts');
const { stat } = require('fs');
const { getHeapCodeStatistics } = require('v8');
const { SSL_OP_EPHEMERAL_RSA } = require('constants');
const { send } = require('process');

const launchPuppeteer = async () => {
    return await puppeteer.launch({
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
        ]
    });
}

const getTrackerGGProfile = async (username, region) => {
    const browser = await launchPuppeteer();
    const page = await browser.newPage();
    const link = `https://tracker.gg/tft/profile/riot/${region.toUpperCase()}/${encodeURI(username)}/overview`;
    logger.debug(link);

    await page.goto(link);
    //wait for page to load
    await page.waitForSelector(".details");
    await page.waitForSelector(".ph-details__identifier");
    await page.waitForSelector(".ph-avatar");
    await page.waitForSelector(".segment-stats");

    //reorder page
    await page.evaluate(() => {
        document.querySelector(".details").replaceChild(document.querySelector(".ph-details__identifier"), document.querySelector(".details > h2:nth-child(2)"));
        document.querySelector(".details").replaceChild(document.querySelector(".ph-avatar"), document.querySelector(".details > svg:nth-child(1)"));
    })

    const stats = await page.$(".segment-stats");
    const img = await stats.screenshot();
    logger.debug(`img buffer for ${username} generated`);
    browser.close();
    return img;
}

const getBlitzGGComps = async (channel) => {
    const browser = await launchPuppeteer();
    const page = await browser.newPage();
    const link = `https://blitz.gg/tft/comps/stats`;

    //huge view port to load entire page
    await page.setViewport({ width: 3000, height: 20000 });
    await page.goto(link);

    for (var index = 1; index <= 10; index++) {
        const selector = `li.notExpanded:nth-child(${index})`;
        //wait for selector to load, screenshot refreshes page
        await page.waitForSelector(selector)
        await channel.send({
            files: [await (await page.$(selector)).screenshot()]
        });
    }

    browser.close();
}

const extractTier = async (element) => {
    return (
        await (
            await (
                await element.$("header:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > svg:nth-child(1) > title:nth-child(1)")
            ).getProperty("innerHTML"))
            .jsonValue())
        .toString().split("-")[1]
}

const genImg = async (user) => {
    const browser = await puppeteer.launch({
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
        ]
    });

    const page = await browser.newPage();

    logger.silly('browser up');

    const filePath = consts.utils.isDev() ?
        path.join(__dirname, '..', '..', 'res', 'profile.html') :
        path.join('file:///' + process.cwd(), 'res', 'profile.html');
    await page.goto(filePath);
    await page.setViewport({
        width: 300,
        height: 470,
        deviceScaleFactor: 1,
    });
    await page.setContent(setDetails(await page.content(), user));

    const img = await page.screenshot();

    logger.debug(`img buffer for ${user.username} generated`);
    browser.close();
    return img;
};

const setDetails = (html, user) => {
    html = html.replace('{{username}}', user.username);
    html = html.replace('{{rankImg}}', user.rankImg);
    html = html.replace('{{rank}}', user.rank);
    html = html.replace('{{win}}', user.win);
    html = html.replace('{{loss}}', user.loss);
    html = html.replace('{{ratio}}', user.ratio);
    return html;
};

//source https://advancedweb.hu/how-to-use-async-functions-with-array-filter-in-javascript/
const asyncFilter = async (arr, predicate) => Promise.all(arr.map(predicate))
    .then((results) => arr.filter((_v, index) => results[index]));

module.exports = { genImg, getTrackerGGProfile, getBlitzGGComps }



