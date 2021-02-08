const Discord = require('discord.js');
const fs = require('fs');
const badwords = require('./commands/bannedphrases.json')
const express = require('express');

const server = express();
require('dotenv').config();

server.listen(process.env.PORT);

const client = new Discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] });
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

client.once('ready', () => {
    console.log('app ready');
    client.user.setActivity('with ur ip 😎');
});

client.on('message', message => {
    for (badword of badwords) {
        if (message.content.includes(badword)) {
            message.delete()
            return
        }
    }

	const args = message.content.slice(process.env.PREFIX.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if (!message.content.startsWith(process.env.PREFIX)) return;
	if (!client.commands.has(command)) return;
	if (message.author.bot) return;
    if (message.guild === null) return;
    if (!client.commands.get(command).usage) return;

    var usage = client.commands.get(command).usage.split(" ")
    for (thing of usage) {
        if (thing.charAt(0) === "(") {
            usage.splice(usage.indexOf(usage), 1)
        }
    }

    if (args.length < usage.length - 1) {
        message.channel.send(`${message.author} not enough arguments :/ Maybe check the help menu? \`${process.env.PREFIX} help\``)
        return
    }

    try {
    	client.commands.get(command).execute(message, args, client);
    } catch (error) {
    	console.error(error);
    	message.reply('there was an error trying to execute that command!');
    }
});

client.on("guildMemberAdd", (member) => {
    try {
        client.commands.get("join").execute(member, client)
    } catch (error) {
        console.error(error);
    }
});

client.on("guildMemberRemove", (member) => {
    try {
        client.commands.get("leave").execute(member, client)
    } catch (error) {
        console.error(error);
    }
});

client.on('messageReactionAdd', (reaction, user) => {
    try {
        client.commands.get("react").execute(reaction, user, client)
    } catch (error) {
        console.error(error);
    }
});


client.login(process.env.DISCORD);
