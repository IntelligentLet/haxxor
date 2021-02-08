module.exports = {
    name: 'help',
    description: 'help menu',
    usage: 'help',
    aliases: [''],
    execute(message, args, client) {
        const Discord = require('discord.js')
        const fs = require('fs')

        var embed = new Discord.MessageEmbed()
            .setTitle(`Help Menu`)
            .setDescription(`
            Your prefix is \`${process.env.PREFIX}\`.
            \`<required argument>\`
            \`(optional argument)\`
            `)
            .setTimestamp()
            .setFooter('Created by LogicGo#7666', 'https://i.imgur.com/iglEZPr.png')
            .setColor(process.env.COLOR)

        const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

        for (var file of commandFiles) {
            var command = require(`../commands/${file}`);
            if(!command.usage) continue
            embed.addField(command.name, `\`${process.env.PREFIX} ${command.usage}\``, false)
        }
        message.channel.send(embed)
    },
};