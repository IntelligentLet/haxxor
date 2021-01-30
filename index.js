const Discord = require('discord.js');
const fs = require('fs');
const express = require('express');

const server = express();
require('dotenv').config();

const prefix = 'hack';

server.listen(process.env.PORT || 5000);

const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

client.once('ready', () => {
    console.log('app ready');
    client.user.setStatus('Haxxoring the mainframe 😎');
});

client.on('message', message => {
	const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

	if (!client.commands.has(command)) return;
	if (message.author.bot) return;
    if (message.guild === null) return;
    if (!message.content.startsWith(prefix)) return;

    try {
    	client.commands.get(command).execute(message, args, client);
    } catch (error) {
    	console.error(error);
    	message.reply('there was an error trying to execute that command!');
    }

    if (message.content.includes("grabify.link") ||
        message.content.includes("lovebird.guru") ||
        message.content.includes("trulove.guru") ||
        message.content.includes("dateing.club") ||
        message.content.includes("otherhalf.life") ||
        message.content.includes("shrekis.life") ||
        message.content.includes("datasig.io") ||
        message.content.includes("datauth.io") ||
        message.content.includes("headshot.monster") ||
        message.content.includes("gaming-at-my.best") ||
        message.content.includes("progaming.monster") ||
        message.content.includes("yourmy.monster") ||
        message.content.includes("screenshare.host") ||
        message.content.includes("imageshare.best") ||
        message.content.includes("screenshot.best") ||
        message.content.includes("gamingfun.me") ||
        message.content.includes("catsnthing.com") ||
        message.content.includes("mypic.icu") ||
        message.content.includes("catsnthings.fun") ||
        message.content.includes("curiouscat.club") ||
        message.content.includes("joinmy.site") ||
        message.content.includes("fortnitechat.site") ||
        message.content.includes("fortnight.space") ||
        message.content.includes("freegiftcards.co") ||
        message.content.includes("stopify.co") ||
        message.content.includes("leancoding.co")
    ) {
        message.delete();
        message.channel.send(`No grabify links please ${message.author}`);
    }
});
//when someone joins, give roles and welcome them
client.on("guildMemberAdd", (member) => {
    client.channels.cache.get('781966894567522304').send(`Welcome ${member.user}! You are member #${(client.guilds.cache.get(member.guild.id).memberCount)}. Please read ${client.channels.cache.get('781965192887140412')} to get started!`);
    member.roles.add(member.guild.roles.cache.find(role => role.name === 'Member'));
});
client.on("guildMemberRemove", (member) => {
    client.channels.cache.get('781966894567522304').send(`${member} just left the server what a noob`);
});

client.login(process.env.DISCORD);