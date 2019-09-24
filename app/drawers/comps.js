const logger = require('../utils/logger')(module.filename);
const { createCanvas, loadImage } = require('canvas');
const rowSize = 100;
const width = 1000;

const drawComps = async (comps) => {

    const canvas = createCanvas(width, 200 + comps.length * rowSize);
    const ctx = canvas.getContext('2d');
    const background = await loadImage('https://images.unsplash.com/photo-1454117096348-e4abbeba002c?ixlib=rb-1.2.1&w=1000&q=80');

    ctx.drawImage(background, 0, 0);

    const currentPatch = "x.xx";
    ctx.fillText(`TFT Best Comps Patch ${currentPatch}`, 450, 50);
    y = 200;
    comps.forEach(comp => {
        drawComp(comp, y, ctx);
        y += rowSize - 10;
    });

    return canvas.toBuffer();
};

const drawComp = (comp, y, ctx) => {
    const champions = Object.keys(comp.champions);
    const space = width / champions.length;

    ctx.fillText(`${comp.name} - ${comp.subtitle}`, 10, y);
    champions.forEach((key, index) => {
        drawChamp(key, index * space, y + 20, ctx, comp.champions[key] === 2);
    });
};

const drawChamp = (champ, x, y, ctx, isCarry) => {
    if (isCarry) ctx.fillStyle = 'blue';
    ctx.fillText(champ, x, y);
    ctx.fillStyle = 'black';
};


module.exports = {
    drawComps
};