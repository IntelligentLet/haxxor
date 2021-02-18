module.exports = {
    name: 'join',
    description: 'when user joins guild',
    execute(member, client) {
        client.channels.cache.get(process.env.WELCOMECHANNEL)
            .send(
                `Welcome ${member.user}! You are member #${(client.guilds.cache.get(member.guild.id).memberCount)}. Please read ${client.channels.cache.get(process.env.RULES)} to get started!
                `)
        member.roles
            .add(member.guild.roles.cache.find(role => role.id === process.env.JOINROLE)).catch()
    },
};