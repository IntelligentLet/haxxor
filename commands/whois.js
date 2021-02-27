module.exports = {
    name: 'whois',
    description: 'get user info',
    aliases: ['userinfo'],
    usage: "whois <id/mention/username-tag>",
    execute(message, args, client, config) {
        const Discord = require('discord.js')
        const date = require('date-and-time')

        var member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        var user = message.mentions.users.first() || client.users.cache.get(args[0])

        if (!!args[0].match(/#[0-9]{4}/)) {
            var discrim = message.guild.members.cache.find(user => user.user.discriminator === (args[0].match(/#[0-9]{4}/)[0]).slice(1))
            user = client.users.cache.get(discrim.user.id)
            member = discrim
        }

        if (!user || !member) {message.channel.send(`${message.author} try a user that's in the server!`); return}

        var userinfo = new Discord.MessageEmbed()
            .setDescription(`${member}`)
            .setAuthor(user.tag, user.displayAvatarURL())
            .setThumbnail(user.displayAvatarURL())
            .addFields(
                { name: `Joined at`, value: date.format(new Date(member.joinedAt), 'ddd, MMM D, YYYY h:mm A'), inline: true},
                { name: `Registered at`, value: date.format(new Date(user.createdAt), 'ddd, MMM D, YYYY h:mm A'), inline: true } ,
                { name: `Roles [${member._roles.length + 1}]`, value: roles = member.roles.cache.map(r => `${r}`).join(' ') } ,
            )
            .setTimestamp()
            .setColor(config.meta.color)
            .setFooter('Created by LogicGo#7666', 'https://i.imgur.com/iglEZPr.png');
        message.channel.send(userinfo) 
    },
};