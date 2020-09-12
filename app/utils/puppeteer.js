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
        headless: false,
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
        ]
    });
}

const getTrackerGGProfile = async (username, region) => {
    const browser = await launchPuppeteer();
    const page = await browser.newPage();
    await page.setViewport({ height: 1080, width: 1920 });

    const link = `https://tracker.gg/tft/profile/riot/${region.toUpperCase()}/${encodeURI(username)}/overview`;
    logger.debug(link);

    await page.goto(link);
    //wait for page to load
    await page.waitForSelector(".details");
    await page.waitForSelector(".ph-details__identifier");
    await page.waitForSelector(".ph-avatar");
    await page.waitForSelector(".segment-stats");
    await page.waitForSelector(".graph");


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

const getBlitzGGComps = async (isPro) => {
    const browser = await launchPuppeteer();
    const page = await browser.newPage();
    const link = `https://blitz.gg/tft/comps/${isPro ? '' : 'stats'}`;

    //set view port to load entire page
    await page.setViewport({ height: 1080, width: 1920 });
    await page.goto(link);

    const imgs = []
    for (var index = 1; index <= 10; index++) {
        const selector = `li.notExpanded:nth-child(${index})`;
        //wait for selector to load, screenshot refreshes page
        await page.waitForSelector(selector)
        imgs.push(await (await page.$(selector)).screenshot())
    }

    browser.close();
    return imgs;
}

const getBlitzGGComp = async (num, isPro) => {
    const browser = await launchPuppeteer();
    const page = await browser.newPage();
    const link = `https://blitz.gg/tft/comps/${isPro ? '' : 'stats'}`;

    //set view port to load entire page
    await page.setViewport({ height: 1080, width: 1920 });
    await page.goto(link);

    const clickableSel = `li.notExpanded:nth-child(${num}) > header:nth-child(1)`
    const expandedSelector = `li.expanded:nth-child(${num})`
    //wait for selector to load, screenshot refreshes page
    await page.waitForSelector(clickableSel)
    
    await (await page.$(clickableSel)).click()
    await (await page.$(clickableSel)).click()
    await (await page.$(clickableSel)).click()

    await page.waitForSelector(expandedSelector)
    const img = await (await page.$(expandedSelector)).screenshot()

    browser.close();
    return img;
}

module.exports = { getTrackerGGProfile, getBlitzGGComps, getBlitzGGComp }



