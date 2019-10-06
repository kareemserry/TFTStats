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

Comps.create({
    name: 'Wild ShapeShifters Assassins',
    isHyperRoll: false,
    units: [
        { champ: 'Jayce' },
        { champ: 'Nidalee' },
        { champ: 'Gnar', items: { core: [], other: ['DragonsClaw', 'Rageblade', 'Warmogs'] } },
        { champ: 'Warwick' },
        { champ: 'Rengar' },
        { champ: 'Pyke', items: { core: ['FrozenHeart'], other: ['FrozenHeart', 'Morellonomicon'] } },
        { champ: 'Akali', isCarry: true, items: { core: ['InfinityEdge'], other: ['InfinityEdge', 'GunBlade', 'DragonsClaw', 'PhantomDancer'] } },
        { champ: 'Vi', isExtra: true }
    ],
    replacements: [
        [{ out: 'Jayce', in: { champ: 'Shyvana' } }, { out: 'Vi', in: { champ: 'Pantheon' } }],
        [{ out: 'Jayce', in: { champ: 'Swain' } }, { out: 'Pyke', in: { champ: 'Katarina' } }, { out: 'Vi', in: { champ: 'Evelynn' } }],
    ]
}).then(console.log("comps added"));


module.exports = Comps;