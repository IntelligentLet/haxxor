module.exports = {
    name: 'join',
    description: 'when user joins guild',
    execute(member, client) {
        if (Date.now() - member.user.createdAt < 1000*60*60*24*7) {
            member.send("Your account was banned for being too young (< 1 week). This is to prevent spam.")
            member.ban()
            return
        }
        client.channels.cache.get(process.env.WELCOMECHANNEL)
            .send(`Welcome ${member.user}! You are member #${(client.guilds.cache.get(member.guild.id).memberCount)}. Please read ${client.channels.cache.get(process.env.RULES)} to get started!`)
    },
};