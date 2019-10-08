const logger = require('../utils/logger')(module.filename);
const { createCanvas, loadImage, registerFont } = require('canvas');
const api = require('../api');
const rowSize = 250;
const width = 1500;

registerFont('static/fonts/Open_Sans/OpenSans-Regular.ttf', { family: 'Open Sans' });
registerFont('static/fonts/Open_Sans/OpenSans-ExtraBold.ttf', { family: 'Open Sans Bold' });



const drawComps = async (comps) => {

    let y = 160;

    const champions = await api.getChampions();

    const height = 160 + comps.length * rowSize;
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext('2d');

    ctx.fillRect(0, 0, width, height);
    ctx.fillStyle = 'white';

    ctx.font = '90px "Open Sans Bold"';
    const currentPatch = await api.getCurrentPatch();
    const title = `TFT Best Comps Patch ${currentPatch}`;
    const text = ctx.measureText(title);

    ctx.fillText(title, (width - text.width) / 2, 100);
    ctx.font = '60px "Open Sans"';

    for (let i = 0; i < comps.length; i++) {
        logger.silly(`Drawing Comp ${comps[i].name}, i = ${i}`);
        await drawComp(comps[i], y, ctx, champions);
        y += rowSize;
    }

    return canvas.toBuffer();
};

const drawComp = async (comp, y, ctx, champRes) => {

    const champions = Object.keys(comp.champions);
    const space = width / champions.length;

    ctx.fillText(`${comp.name} - ${comp.subtitle}`, 25, y + 40);
    for (let i = 0; i < champions.length; i++) {
        await drawChamp(
            champions[i],
            (i * space) + ((space - 120) / 2),
            y + (rowSize - 120) / 2,
            ctx,
            comp.champions[champions[i]] === 2,
            champRes
        );
    }

    y += rowSize;
};

const drawChamp = async (champ, x, y, ctx, isCarry, champRes) => {
    const imgSrc = api.getChampionImgLink(champ);
    const champImg = await loadImage(imgSrc);

    drawImage(ctx, x, y, champImg);

    if (isCarry) await drawItems(ctx, x, y, champRes[champ].items);
};

const drawImage = (ctx, x, y, champImg) => {
    const isCircle = false;

    if (isCircle) {
        ctx.save();
        ctx.beginPath();
        ctx.arc(x + 60, y + 60, 60, 0, 2 * Math.PI, true);
        ctx.closePath();
        ctx.clip();
    }
    ctx.drawImage(champImg, x, y);
    if (isCircle) {
        ctx.beginPath();
        ctx.arc(x + 60, y + 60, 60, 0, 2 * Math.PI, true);
        ctx.clip();
        ctx.closePath();
        ctx.restore();
    }
};

const drawItems = async (ctx, x, y, items) => {

    for (let i = 0; i < items.length; i++) {
        const imagePath = api.getItemIconLink(items[i]);
        const itemIcon = await loadImage(imagePath);
        ctx.drawImage(itemIcon, x, y + 120, 40, 40);
        x += 40;
    }
};


module.exports = {
    drawComps
};
