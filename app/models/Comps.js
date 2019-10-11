const mongoose = require('mongoose');

const compSchema = new mongoose.Schema({
    name: String,
    description: String,
    isHyperRoll: Boolean,
    units: [{
        champ: String,
        must3Star: Boolean,
        items: { core: [String], other: [String] },
        isExtra: Boolean,
        isCarry: Boolean
    }],
    replacements: [[{
        out: String,
        in: {
            champ: String,
            items: [String]
        }
    }]]
});

const Comps = mongoose.model('Comps', compSchema);

module.exports = Comps;