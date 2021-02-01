module.exports = {
    name: 'crypto',
    description: 'Track the price of crypto currency',
    aliases: ['cryptocurrency'],
    execute(message, args, client) {
        const Discord = require('discord.js')
        const axios = require('axios');
        const Vibrant = require('node-vibrant')

        var crypto = new Discord.MessageEmbed()

        if (args[0].toLowerCase() === "timercoin") {
            crypto
                .setTitle(`TimerCoin (TRC)`)
                .setDescription(`Priceless. Time is money, after all.`)
                .setThumbnail(`https://i.imgur.com/WPGQPEH.png`)
                .setTimestamp()
                .setFooter('Created by LogicGo#7666', 'https://i.imgur.com/iglEZPr.png')
                .setColor([255, 255, 255])
            message.channel.send(crypto)
            return
        }

        if (args.length < 2) {
            args.push('usd');
        }

        axios.get(`https://api.coingecko.com/api/v3/coins/${args[0].toString()}?localization=false&tickers=false&market_data=false&community_data=false&developer_data=false&sparkline=false`)
            .then(res1 => {
                crypto
                    .setTitle(`${res1.data.name} (${res1.data.symbol.toUpperCase()})`)
                    .setThumbnail(res1.data.image.large)
                    .setTimestamp()
                    .setFooter('Created by LogicGo#7666', 'https://i.imgur.com/iglEZPr.png');

                Vibrant.from(res1.data.image.large).getPalette()
                    .then(palette => {
                        if (palette.Vibrant){
                            crypto.setColor(palette.Vibrant._rgb)
                        } else {
                            crypto.setColor(palette.Muted._rgb)
                        }
                        axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${args[0].toString()}&vs_currencies=${args[1].toString()}`)
                            .then(res => {
                                crypto.setDescription(`${res.data[args[0]][args[1]]} ${args[1].toUpperCase()}`)
                                message.channel.send(crypto)
                            })
                            .catch(err => {
                                message.channel.send(`${message.author} error! (${err})`)
                            })
                    })
                    .catch()
                })
            .catch(err => {
                message.channel.send(`${message.author} error! (${err})`)
            })
    },
};