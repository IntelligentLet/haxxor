module.exports = {
    name: 'join',
    description: 'when user joins guild',
    execute(member, client, config) {
        const rules = config.join.rules
        const roles = config.join.role
        const user = member.user
        const count = client.guilds.cache.get(member.guild.id).memberCount
        const welcome = config.join.welcome
        const send = config.join.send

        send.replace(/\${rules}/g, rules)
        send.replace(/\${user}/g, user)
        send.replace(/\${count}/g, count)

        client.channels.cache.get(welcome).send(send)
        if (config.join.role) member.roles.add(member.guild.roles.cache.find(role => role.id == roles))
    },
};