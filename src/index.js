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

//playing around with discord.js
// client.on('messageCreate', (msg) => {
//     //ignoring bot messages
//     if (msg.author.bot) return;

//     if (msg.content === '/on') {
//         msg.reply("Translator is on!");
//     }
//     if (msg.content === '/off') {
//         msg.reply("Translator is off!");
//     }
//     // console.log(msg);
//     // console.log(msg.content);
// });

client.on('interactionCreate', (interaction) => {
    if (!interaction.isCommand()) return;
    else if (interaction.commandName === 'on') {
        interaction.reply("Translator is on!");
    }
    else if (interaction.commandName === 'off') {
        interaction.reply("Translator is off!");
    }
    else if (interaction.commandName === 'help') {
        interaction.reply("Help menu!");
    }
    else if (interaction.commandName === 'set') {
        interaction.reply("Set language!");
    }
    else if (interaction.commandName === 'list') {
        interaction.reply("List languages!");
    }
    else if (interaction.commandName === 'translate') {
        interaction.reply("Translate message!");
    }
});

client.login(process.env.TOKEN);