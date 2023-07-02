require('dotenv').config();
const {Client, IntentsBitField} = require('discord.js');
const { translate } = require('@vitalets/google-translate-api');

const client = new Client({
    intents: [
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

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand()) return;
    
    const { commandName, options } = interaction;
  
    if (commandName === 'on') {
      interaction.reply('Translator is on!');
    } else if (commandName === 'off') {
      interaction.reply('Translator is off!');
    } else if (commandName === 'set') {
      const language = options.getString('language');
      interaction.reply('Set language to ' + language + '!');
    } else if (commandName === 'list') {
      interaction.reply('List languages!'
        + '\nEnglish: en'
        + '\nSpanish: es'
        + '\nChinese(Simplified): zh-CN'
      );

    } else if (commandName === 'translate') {
      const message = options.getString('message');
      const language = options.getString('language');
  
      try {
        const res = await translate(message, { to: language});
        console.log(res);
        interaction.reply(res.text, { ephemeral: true });
      } catch (error) {
        console.error('Translation error:', error);
        interaction.reply('An error occurred while translating the message.');
      }
    }
  });

client.login(process.env.TOKEN);