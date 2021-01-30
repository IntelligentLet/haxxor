module.exports = {
    name: 'say',
    description: 'speak',
    execute(message, args, client) {
        if (args.length === 0) return
        message.delete().then(message.channel.send(args.join(' ')))
    },
};