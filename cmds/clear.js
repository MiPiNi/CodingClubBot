const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'Clear',
    description: "Deletes <amount> latest messages from channel\nUsage: clear <amount>\nNote that I can't delete messages past 2 weeks!",
    execute(message, args){
        if(!args) return message.channel.send('You need to specify amount of messages to delete!');
        if(isNaN(args)) return message.channel.send('Given amount is not a number!');
        if(args<1) return message.channel.send("You can't delete less than 1 message!");
        if(args>99) return message.channel.send("You can't delete more than 99 messages!")

        var amount = parseInt(args)+1;

        message.channel.bulkDelete(amount, true);

        const embed = new MessageEmbed()
        .setColor('#0099ff')
        .setAuthor('DiscordBot')
        .setDescription(`Deleted ${args} messages!\nNote that I can't delete messages past 2 weeks!`);
        message.channel.send(embed);
    }
}