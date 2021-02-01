module.exports = {
    name: 'say',
    description: 'Make the bot send a message',
    execute(message, args, client) {
        if (args.length === 0) return
        message.channel.send(args.join(' ')).then(message.delete())
    },
};