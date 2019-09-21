const logger = require('../utils/logger')(module.filename);
const { createCanvas, loadImage } = require('canvas');

const drawComps = async (comps) => {

    const canvas = createCanvas(200, 20 + comps.size * 10);
    const ctx = canvas.getContext('2d');

    y = 20;
    comps.forEach(comp => {
        drawComp(comp, y, ctx);
        y += 10;
    });

    return await ctx.toBuffer();
};

const drawComp = (comp, y, ctx) => {
    ctx.fill(JSON.stringify(comp), 0, y);
};