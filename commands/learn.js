module.exports = {
    name: 'learn',
    description: 'reference links to a topic',
    usage: 'learn <topic>',
    aliases: [''],
    execute(message, args, client) {
        const Discord = require('discord.js')
        const Vibrant = require('node-vibrant')

        const learnsrc = require(`../learn/${args[0]}.json`)
        if (learnsrc === null) {
            message.channel.send(`${message.author} that topic doesn't exist!`)
        }

        const embed = new Discord.MessageEmbed()
            .setTitle(learnsrc.title)
            .setThumbnail(learnsrc.icon)
            .setDescription(learnsrc.description)
        var i = 1;
        for (var link of learnsrc.links) {
            embed.addField(`Link ${i}`, link)
            i++
        }
        Vibrant.from(learnsrc.icon).getPalette()
            .then(palette => {
                embed.setColor(palette.Vibrant._rgb)
                message.channel.send(embed)
            })
    },
};