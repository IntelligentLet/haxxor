module.exports = {
    name: 'whois',
    description: 'get user info',
    aliases: ['userinfo'],
    usage: "whois <id/mention>",
    execute(message, args, client) {
        const Discord = require('discord.js')

        var guildmember = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]))
        var user = message.mentions.users.first() || client.users.cache.get(args[0])

        function isotodate(iso) {
            date = new Date(iso);
            year = date.getFullYear();
            month = date.getMonth()+1;
            dt = date.getDate();

            if (dt < 10) {
              dt = '0' + dt;
            }
            if (month < 10) {
              month = '0' + month;
            }

            return (`${year}/${month}/${dt}`);
        }

        var userinfo = new Discord.MessageEmbed()
            .setDescription(`${guildmember}`)
            .setAuthor(user.tag, user.displayAvatarURL())
            .setThumbnail(user.displayAvatarURL())
            .addFields(
                { name: `Joined at`, value: isotodate(guildmember.joinedAt) },
                { name: `Registered at`, value: isotodate(user.createdAt) }
            )
            .setTimestamp()
            .setColor(process.env.COLOR)
            .setFooter('Created by LogicGo#7666', 'https://i.imgur.com/iglEZPr.png');
        message.channel.send(userinfo) 
    },
};