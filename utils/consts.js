const prefix = "~tftstats";
const prefixShort = "~ts";

const profiles = {
    production: "prod",
    development: "dev"
}

const prefixes = {
    help: "help",
    profile: "profile",
    link: "link"
}

const ours = msg => {
    var msgPrefix = msg.content.split(" ")[0].toLowerCase();
    return msgPrefix == prefix || msgPrefix == prefixShort
}

const env = process.env;
var envs = {
    profile: env.TFT_STATS_PROFILE,
    helpMessage: env.TFT_STATS_HELP_MESSAGE,
    helpMap: env.TFT_STATS_HELP_MAP,
    logLevel: env.TFT_STATS_LOG_LEVEL
}

const isDev = () => {
    return !(envs.profile == profiles.production)
}

envs.token = isDev() ? env.TFT_STATS_DISCORD_TOKEN_DEV : env.TFT_STATS_DISCORD_TOKEN

const utils = {
    ours: ours,
    isDev: isDev
}

utils.ours.prefix = prefix
utils.ours.prefixShort = prefixShort

const emoji = {
    thumbsUp: '👍🏼'
}

module.exports = {
    profiles,
    prefixes,
    utils,
    envs,
    emoji
}
