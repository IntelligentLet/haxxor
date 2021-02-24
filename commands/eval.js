module.exports = {
    name: 'eval',
    description: 'run code',
    usage: 'eval <lang> <code>',
    aliases: ['run', 'evaluate', 'execute'],
    execute(message, args, client) {
        const axios = require('axios')

        var lang = args[0]
        args.shift()
        var source = args.join(" ")

        source = source.replace(/```.*\n/, "");
        source = source.replace(/```/g, "");

        axios.post(`https://emkc.org/api/v1/piston/execute`, {
            "language": lang,
            "source": source
        })
            .then(res => {
                    if (!res.data.ran) {
                        message.channel.send(`${message.author} your code didn't run :/`)
                        return
                    }
                    if (res.data.stderr.length > 12000 || res.data.stdout.length > 12000) {
                        message.channel.send(`${message.author} your output is too long (> 12k characters), sorry.`)
                        return
                    }
                    if (res.data.stderr === "") {
                        message.channel.send(`${message.author} here is your output!`)
                        message.channel.send(res.data.stdout, { split: true })                    
                    } else {
                        message.channel.send(`${message.author} your code ran with an error!`)
                        message.channel.send(res.data.stderr, { split: true }) 
                    }
                })
            .catch()
    },
};