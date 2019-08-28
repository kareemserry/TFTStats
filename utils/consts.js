const prefix = "~tftstats";
const prefixShort = "~ts";
const profiles = {
    production: 'prod',
    development: 'dev'
}
const prefixes = {
    help: "help"
}

const ours = msg => {
    var msgPrefix = msg.content.split(" ")[0].toLowerCase();
    return msgPrefix == prefix || msgPrefix == prefixShort
}


module.exports.profiles = profiles;
module.exports.prefixes = prefixes;
module.exports.ours = ours;
module.exports.ours.prefix = prefix;
module.exports.ours.prefixShort = prefixShort;
