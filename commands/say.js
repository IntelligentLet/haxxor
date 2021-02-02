module.exports = {
    name: 'say',
    description: 'Make the bot send a message',
    usage: 'say <message>',
    execute(message, args, client) {
        message.channel.send(args.join(' ')).then(message.delete())
    },
};