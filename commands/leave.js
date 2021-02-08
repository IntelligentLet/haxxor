module.exports = {
    name: 'leave',
    description: 'when user leaves guild',
    execute(member, client) {
        client.channels.cache.get(process.env.WELCOMECHANNEL)
            .send(`${member} just left the server :(`);
    },
};