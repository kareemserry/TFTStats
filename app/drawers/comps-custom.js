const logger = require('../utils/logger')(module.filename);
const consts = require('../utils/consts');

const { createCanvas, loadImage, registerFont } = require('canvas');
const api = require('../api');
const width = 1500;
const rowSize = 250;

registerFont('static/fonts/Open_Sans/OpenSans-Regular.ttf', { family: 'Open Sans' });
registerFont('static/fonts/Open_Sans/OpenSans-ExtraBold.ttf', { family: 'Open Sans Bold' });

let swapArrows;
let crown;
let threeStars;

const drawComps = async (comps) => {
    if (!swapArrows) swapArrows = await loadImage('res/swap.png');

    let y = 160;


    let replacements = 0;

    comps.forEach((comp) => {
        replacements += comp.replacements.length;
    });

    const height = 160 +
        comps.length * rowSize +
        replacements * rowSize;

    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext('2d');

    ctx.fillRect(0, 0, width, height);
    ctx.fillStyle = 'white';

    ctx.font = '90px "Open Sans Bold"';
    const currentPatch = consts.utils.isDev ? '9.19' : consts.envs.compsPatch;
    const title = `TFT Best Comps Patch ${currentPatch}`;
    const text = ctx.measureText(title);

    ctx.fillText(title, (width - text.width) / 2, 100);
    ctx.font = '60px "Open Sans"';

    for (let i = 0; i < comps.length; i++) {
        logger.silly(`Drawing Comp ${comps[i].name}, i = ${i}`);
        await drawComp(comps[i], y, ctx);
        y += (1 + comps[i].replacements.length) * rowSize;
    }

    return canvas.toBuffer();
};

const drawComp = async (comp, y, ctx) => {

    const space = width / comp.units.length;

    ctx.fillText(comp.name, 25, y + 40);
    for (let i = 0; i < comp.units.length; i++) {
        const units = comp.units;

        await drawChamp(
            units[i].champ,
            (i * space) + ((space - 120) / 2),
            y + (rowSize - 120) / 2,
            ctx,
            units[i].isCarry,
            units[i].items
        );

        for (let j = 0; j < comp.replacements.length; j++) {
            const repGroup = comp.replacements[j];
            const reps2 = repGroup.filter(rep2 => {
                return rep2.out == units[i].champ;
            });

            for (let k = 0; k < reps2.length; k++) {

                const x = (i * space) + ((space - 120) / 2);
                ctx.drawImage(swapArrows,
                    (i * space) + ((space - 120) / 2) + 35,
                    y + (rowSize - 120) / 2 + rowSize * (j + 1) - 55,
                    50, 50);
                await drawChamp(
                    reps2[k].in.champ,
                    (i * space) + ((space - 120) / 2),
                    y + (rowSize - 120) / 2 + rowSize * (j + 1),
                    ctx,
                    false,
                    reps2[k].in.items
                );
            }
        }
    }

};

const drawChamp = async (champ, x, y, ctx, isCarry, items) => {
    const imgSrc = api.getChampionImgLink(champ);
    const champImg = await loadImage(imgSrc);
    drawImage(ctx, x, y, champImg);
    if (isCarry) {
        if (!crown) { crown = await loadImage('res/crownarrow.png'); }
        ctx.drawImage(crown, x + 30, y - 25, 60, 45);
    }
    await drawItems(ctx, x, y, items);
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

    if (items.core || items.other) {
        for (let i = 0; i < items.core.length; i++) {
            const imagePath = api.getItemIconLink(items.core[i]);
            let itemIcon;
            try {
                itemIcon = await loadImage(imagePath);
            } catch (err) {
                logger.error(`failed to fetch ${items.core[i]} icon | ${imagePath}`);
                continue;
            }
            ctx.drawImage(itemIcon, x, y + 120, 40, 40);
            x += 40;
        }
        x -= 40 * items.core.length;
        for (let i = 0; i < items.other.length; i++) {
            const imagePath = api.getItemIconLink(items.other[i]);
            let itemIcon;
            try {
                itemIcon = await loadImage(imagePath);
            } catch (err) {
                logger.error(`failed to fetch ${items.other[i]} icon | ${imagePath}`);
                continue;
            }
            ctx.drawImage(itemIcon, x, y + 160, 40, 40);
            x += 40;
        }
    } else {
        for (let i = 0; i < items.length; i++) {
            const imagePath = api.getItemIconLink(items[i]);
            let itemIcon;
            try {
                itemIcon = await loadImage(imagePath);
            } catch (err) {
                logger.error(`failed to fetch ${items[i]} icon | ${imagePath}`);
                continue;
            }
            ctx.drawImage(itemIcon, x, y + 120, 40, 40);
            x += 40;
        }
    }
};


module.exports = {
    drawComps
};
