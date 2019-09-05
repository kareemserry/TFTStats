const puppeteer = require('puppeteer');
const path = require('path');

const logger = require('./logger')(module.filename);
const consts = require('./consts');

const genImg = async (user) => {
    const browser = await puppeteer.launch({
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
        ]
    });
    const page = await browser.newPage();

    logger.silly('browser up');

    //FIXME:;
    logger.info(process.cwd());
    const filePath = consts.utils.isDev() ?
        path.join(__dirname, '..', 'res', 'profile.html') :
        path.join('file:///' + process.cwd(), 'res', 'profile.html');
    await page.goto();
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

module.exports.genImg = genImg;


