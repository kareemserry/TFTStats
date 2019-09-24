const logger = require('../utils/logger')(module.filename);
const { createCanvas, loadImage, registerFont } = require('canvas');
const api = require('../api');
const rowSize = 250;
const width = 1500;

registerFont('static/fonts/Open_Sans/OpenSans-Regular.ttf', { family: 'Open Sans' });

const drawComps = async (comps) => {
    let y = 200;

    const champions = await api.getChampions();

    const height = 200 + comps.length * rowSize;
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = '#757F9A';
    ctx.fillRect(0, 0, width, height);
    ctx.fillStyle = 'black';

    ctx.font = '90px "Open Sans"';
    const currentPatch = "x.xx";
    const title = `TFT Best Comps Patch ${currentPatch}`;
    const text = ctx.measureText(title);

    ctx.fillText(title, (width - text.width) / 2, 80);
    ctx.font = '60px "Open Sans"';

    for (i = 0; i < comps.length; i++) {
        await drawComp(comps[i], y, ctx, champions);
        y += rowSize;
    }

    return canvas.toBuffer();
};

const drawComp = async (comp, y, ctx, champRes) => {

    const champions = Object.keys(comp.champions);
    const space = width / champions.length;

    ctx.fillText(`${comp.name} - ${comp.subtitle}`, 25, y + 30);
    var i;
    for (i = 0; i < champions.length; i++) {
        await drawChamp(
            champions[i],
            (i * space) + ((space - 120) / 2),
            y + (rowSize - 120) / 2,
            ctx,
            comp.champions[champions[i]] === 2
        );
    }

    y += rowSize;
};

const drawChamp = async (champ, x, y, ctx, isCarry) => {
    const imgSrc = api.getChampionImgLink(champ);
    const champImg = await loadImage(imgSrc);

    drawImage(ctx, x, y, champImg);

};

const drawImage = (ctx, x, y, champImg) => {
    ctx.save();
    ctx.beginPath();
    ctx.arc(x + 60, y + 60, 60, 0, 2 * Math.PI, true);
    ctx.closePath();
    ctx.clip();
    ctx.drawImage(champImg, x, y);
    ctx.beginPath();
    ctx.arc(x + 60, y + 60, 60, 0, 2 * Math.PI, true);
    ctx.clip();
    ctx.closePath();
    ctx.restore();
};


module.exports = {
    drawComps
};
