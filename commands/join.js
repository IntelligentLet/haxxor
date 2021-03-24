module.exports = {
    name: 'join',
    description: 'when user joins guild',
    execute(member, client, config) {
        if (!config.join) return
        client.channels.cache.get(config.join.welcome).send(`Welcome ${member.user}! You are member #${client.guilds.cache.get(member.guild.id).memberCount}. Please read ${client.channels.cache.get(config.join.rules)} to get started!`)
        if (config.join.role) member.roles.add(member.guild.roles.cache.find(role => role.id == config.join.role))
    },
};