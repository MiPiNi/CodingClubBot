const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'Report',
    description: 'Allows you to report user directly to administration\nUsage: report <user> <reason>',
    execute(message, args, client){
        if (!args) return message.channel.send('You need to specify some arguments!');
        if (!message.mentions.users.size) return message.channel.send('You need to tag user you want to report!');
        const taggedUser = message.mentions.users.first();
        if (taggedUser !== getUserFromMention(args[0])) return message.channel.send('Usage: report <user> <reason>');
        const rchannel = message.guild.channels.cache.find(ch => ch.name === 'reports');
        args.splice(0,1);
        const embed = new MessageEmbed()
        .setColor('#0099ff')
        .setAuthor(message.author.username + ' reported')
        .setTitle(taggedUser.username + ' for')
        .setDescription(args.join(" "));
        rchannel.send(embed).then(()=>{message.delete();});

        function getUserFromMention(mention) {
            if (!mention) return;
        
            if (mention.startsWith('<@') && mention.endsWith('>')) {
                mention = mention.slice(2, -1);
        
                if (mention.startsWith('!')) {
                    mention = mention.slice(1);
                }
        
                return client.users.cache.get(mention);
            }
        }
    }
}