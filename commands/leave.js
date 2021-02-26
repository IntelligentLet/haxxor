module.exports = {
    name: 'leave',
    description: 'when user leaves guild',
    execute(member, client, config) {
        client.channels.cache.get(config.join.welcome).send(`${member.user} just left the server :(`)
    },
};