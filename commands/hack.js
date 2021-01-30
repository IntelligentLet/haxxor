module.exports = {
    name: 'hack',
    description: 'haxxor time',
    execute(message, args, client) {
        message.channel.send(`${message.author} hacking ${args[0]}'s ${args[1]} account...`)
        .then(
            setTimeout(function(){message.channel.send("applying hydra-gtk photosynthesis sqli...")}, 3000)
        )
        .then(
            setTimeout(function(){message.channel.send("injecting packets into mainframe's ip...")}, 6000)
        )
        .then(
            setTimeout(function(){message.channel.send("account breached!")}, 9000)
        )
        .then(
            setTimeout(function(){message.channel.send("hahah e/z craxxored kid")}, 10000)
        )
    },
};