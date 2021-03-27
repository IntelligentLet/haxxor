module.exports = {
    name: 'ban',
    description: 'ban user by id/tag/mention',
    usage: 'ban <user> (reason)',
    aliases: ['banhammer', 'out', 'cya', 'adios'],
    execute(message, args, client, config) {
        const Discord = require('discord.js')

        if (!message.guild.member(message.author).hasPermission('BAN_MEMBERS')) {
            message.channel.send(`${message.author} you thought LOL`)
            return
        }

        var member = message.mentions.members.first() || message.guild.members.cache.get(args[0])

        if (!!args[0].match(/#[0-9]{4}/)) {
            var discrim = message.guild.members.cache.find(user => user.user.discriminator === (args[0].match(/#[0-9]{4}/)[0]).slice(1))
            if (!discrim) {message.channel.send(`${message.author} try a user that's in the server!`); return}
            member = discrim
        }

        args.shift()
        var reason = args.join('')

        member.ban({reason: reason})
        message.channel.send(`out lol (${reason})`)
    }
};