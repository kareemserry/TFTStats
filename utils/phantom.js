const puppeteer = require("puppeteer");
const fs = require("fs");
const { promisify } = require("util");
const readFileAsync = promisify(fs.readFile);
var instance;

const saveImg = async (user) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto("file:///C:/Users/Serry/Desktop/TFTStats/res/profile.html");
    await page.setViewport({
        width: 300,
        height: 470,
        deviceScaleFactor: 1,
    });
    await page.setContent(setDetails(await page.content(), user));
    await page.screenshot({ path: `${user.username}.png` });
    await browser.close();

};

const setDetails = (html, user) => {
    html = html.replace("{{username}}", user.username);
    html = html.replace("{{rankImg}}", user.rankImg);
    html = html.replace("{{rank}}", user.rank);
    html = html.replace("{{win}}", user.win);
    html = html.replace("{{loss}}", user.loss);
    html = html.replace("{{ratio}}", user.ratio);
    return html;
};

module.exports.saveImg = saveImg;


