module.exports = {
    name: 'whois',
    description: 'get user info',
    aliases: ['userinfo'],
    usage: "whois <id/mention/username-tag>",
    execute(message, args, client) {
        const Discord = require('discord.js')
        const date = require('date-and-time')

        var member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        var user = message.mentions.users.first() || client.users.cache.get(args[0])

        if (!!args[0].match(/#[0-9]{4}/)) {
            var discrim = message.guild.members.cache.find(user => user.user.discriminator === (args[0].match(/#[0-9]{4}/)[0]).slice(1))
            user = client.users.cache.get(discrim.user.id)
            member = discrim
        }

        if (!user) {message.channel.send("Try an actual user lmao"); return}

        var userinfo = new Discord.MessageEmbed()
            .setDescription(`${member}`)
            .setAuthor(user.tag, user.displayAvatarURL())
            .setThumbnail(user.displayAvatarURL())
            .addFields(
                { name: `Joined at`, value: date.format(new Date(member.joinedAt), 'ddd, MMM D, YYYY h:mm A'), inline: true},
                { name: `Registered at`, value: date.format(new Date(user.createdAt), 'ddd, MMM D, YYYY h:mm A'), inline: true } ,
                { name: `Roles [${member._roles.length}]`, value: roles = member.roles.cache.filter(role => role.name !== "@everyone").map(r => `${r}`).join(' ') } ,
            )
            .setTimestamp()
            .setColor(process.env.COLOR)
            .setFooter('Created by LogicGo#7666', 'https://i.imgur.com/iglEZPr.png');
        message.channel.send(userinfo) 
    },
};