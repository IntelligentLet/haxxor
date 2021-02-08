module.exports = {
    name: 'react',
    description: 'reaction roles',
    async execute(reaction, user, client) {
        if (reaction.partial) {
            try {
                await reaction.fetch();
            } catch (error) {
                console.error(error)
                return;
            };
        };
/*
        reaction.message.channel.guild.members.cache.get(user.id)
            .roles.add(reaction.message.channel.guild.roles.cache.find(role => role.id === "765593777850941460"))
*/
        },
};