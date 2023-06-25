require('dotenv').config();

const {Client, IntentsBitField} = require('discord.js');

const client = new Client({
    intents: [
        //fix error
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ]
});

client.on('ready', (c) => {
    console.log(`${client.user.tag} is online!`);
});

client.on('messageCreate', (msg) => {
    //ignoring bot messages
    if (msg.author.bot) return;

    if (msg.content === '/on') {
        msg.reply("Translator is on!");
    }
    if (msg.content === '/off') {
        msg.reply("Translator is off!");
    }
    // console.log(msg);
    // console.log(msg.content);
});

client.login(process.env.TOKEN);