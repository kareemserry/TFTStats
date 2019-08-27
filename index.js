
const Discord = require('discord.js')

const client = new Discord.Client();
const token = process.env.TFT_STATS_DISCORD_TOKEN

client.on('ready', () => {
    console.log(client);

    console.log("\n\nServer Ready!");
});

client.on('message', msg => {
    console.log(JSON.stringify(msg))

    if (msg.content == "abc")
        msg.reply("cba");
})
client.login(token);