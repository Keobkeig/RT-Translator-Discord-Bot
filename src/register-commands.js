require('dotenv').config();

const {REST, Routes, ApplicationCommandOptionType}  = require('discord.js');

const commands = [
    {
        name: 'on', 
        description: "Turns on the translator"
    },
    {
        name: 'off', 
        description: "Turns off the translator"
    },
    {
        name: 'help', 
        description: "Shows the help menu"
    },
    {
        name: 'set',
        description: "Sets the language to translate to",
        options: [
            {
                name: 'language',
                description: "The language to translate to",
                type: 3,
                required: true,
                choices: [
                    {
                        name: 'English',
                        value: 'en'
                    },
                    {
                        name: 'Spanish',
                        value: 'es'
                    },
                    {
                        name: 'Chinese(Simplified)',
                        value: 'zh-CN'
                    },
                ]
            }
        ]

    },
    {
        name: 'list',
        description: "Lists all the languages available"
    },
    {
        name: 'translate',
        description: "Translates the message to the set language",
        options: [
            {
                name: 'message',
                description: "The message to translate",
                type: ApplicationCommandOptionType.String,
                required: true,
            },
            {
                name: 'language',
                description: "The language to translate to",
                type: ApplicationCommandOptionType.String,
                required: true,
                choices: [
                    {
                        name: 'English',
                        value: 'en'
                    },
                    {
                        name: 'Spanish',
                        value: 'es'
                    },
                    {
                        name: 'Chinese(Simplified)',
                        value: 'zh-CN'
                    },
                ]
            }
        ]
    },
]

const rest = new REST({version: '9'}).setToken(process.env['TOKEN']);

(async() => {
    try {
        console.log(`Registering slash commands...`)
        await rest.put(
            Routes.applicationGuildCommands(process.env['BOT_ID'], process.env['GUILD_ID']),
            {body: commands}
        );
        console.log(`Slash commands registered!`);
    }
    catch (error) {
        console.log(`Error: ${error}`);
    }
})();