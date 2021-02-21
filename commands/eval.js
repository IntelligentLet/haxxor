module.exports = {
    name: 'eval',
    description: 'run code',
    usage: 'eval <lang> <\`\`\`code\`\`\`>',
    aliases: ['run', 'evaluate', 'execute'],
    execute(message, args, client) {
        const axios = require('axios')
        const Discord = require('discord.js')

        var lang = args[0]
        args.shift()
        var source = args.join(" ")

        source = source.replace("\n", "")
        source = source.replace(/(```)([a-z]*)(\n)/, "");
        source = source.replace(/(\n)(```)/, "");

        console.log(source)

        axios.post(`https://emkc.org/api/v1/piston/execute`, {
            "language": lang,
            "source": source
        })
            .then(res => {
                if (!res.data.ran) {
                    message.channel.send(`${message.author} your code didn't run :/`)
                    return
                }
                var embed = new Discord.MessageEmbed()
                    .setTitle(`${message.author.tag}'s code output`)
                    .setDescription(`${res.data.language} ${res.data.version}`)
                    .setColor(process.env.COLOR)
                    .setTimestamp()
                    .setFooter('Created by LogicGo#7666', 'https://i.imgur.com/iglEZPr.png')
                if (res.data.stdout !== "") embed.addField("Output", `\`\`\`${res.data.stdout}\`\`\``);
                if (res.data.stderr !== "") embed.addField("Error", `\`\`\`${res.data.stderr}\`\`\``);
                message.channel.send(embed)
                })
            .catch(res => {
                message.channel.send(`${message.author} error!`)
            })
    },
};