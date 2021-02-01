const Discord = require('discord.js');
const fs = require('fs');
const badwords = require('./commands/bannedphrases.json')
const express = require('express');

const server = express();
require('dotenv').config();

server.listen(process.env.PORT);

const client = new Discord.Client();
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

	if (!client.commands.has(command)) return;
	if (message.author.bot) return;
    if (message.guild === null) return;
    if (!message.content.startsWith(process.env.PREFIX)) return;

    try {
    	client.commands.get(command).execute(message, args, client);
    } catch (error) {
    	console.error(error);
    	message.reply('there was an error trying to execute that command!');
    }
});
//when someone joins, give roles and welcome them
client.on("guildMemberAdd", (member) => {
    client.channels.cache.get(process.env.CHANNEL).send(`Welcome ${member.user}! You are member #${(client.guilds.cache.get(member.guild.id).memberCount)}. Please read ${client.channels.cache.get(process.env.RULES)} to get started!`);
    member.roles.add(member.guild.roles.cache.find(role => role.id === process.env.ROLE));
});
client.on("guildMemberRemove", (member) => {
    client.channels.cache.get(process.env.CHANNEL).send(`${member} just left the server what a noob`);
});

client.login(process.env.DISCORD);