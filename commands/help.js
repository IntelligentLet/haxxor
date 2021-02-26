module.exports = {
    name: 'help',
    description: 'help menu',
    usage: 'help',
    aliases: [''],
    execute(message, args, client, config) {
        const Discord = require('discord.js')
        const fs = require('fs')

        var embed = new Discord.MessageEmbed()
            .setTitle(`Help Menu`)
            .setDescription(`
            Your prefix is \`${config.meta.prefix}\`.
            \`<required argument>\`
            \`(optional argument)\`
            `)
            .setTimestamp()
            .setFooter('Created by LogicGo#7666', 'https://i.imgur.com/iglEZPr.png')
            .setColor(config.meta.color)

        const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

        for (var file of commandFiles) {
            var command = require(`../commands/${file}`);
            if(!command.usage) continue
            embed.addField(command.name, `\`${config.meta.prefix} ${command.usage}\``, false)
        }
        message.channel.send(embed)
    },
};