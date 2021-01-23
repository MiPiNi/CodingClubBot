const Discord = require('discord.js');

const Client = new Discord.Client();
const prefix = ',';
const fs = require('fs');


Client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./cmds/').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
    const command = require(`./cmds/${file}`);

    Client.commands.set(command.name, command);
}


Client.on('ready', () =>{
    console.log("Bot is ready.");
});
Client.on('guildMemberAdd', function(member){
    const channel = member.guild.channels.cache.find(ch => ch.name === 'logs');
    if(!channel) return;
    channel.send(`Welcome ${member}, on the server!`);
});
Client.on('guildBanRemove', function(guild, user){
    const channel = guild.channels.cache.find(ch => ch.name === 'logs');
    if(!channel) return;
    channel.send(`User ${user} is no longer banned on the server!`);
});
Client.on('guildBanAdd', function(guild, user){
    const channel = guild.channels.cache.find(ch => ch.name === 'logs');
    if(!channel) return;
    channel.send(`User ${user} was banned on the server! :Biblethump:`);
});
Client.on('message', message =>{
    if(!message.content.startsWith(prefix) || message.author.bot) return;
    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();
    if(command === 'ping') Client.commands.get('Ping').execute(message);
    if(command === 'clear') Client.commands.get('Clear').execute(message, args[0]);
    if(command === 'report') Client.commands.get('Report').execute(message, args, Client);
    if(command === 'help'){
        const embed = new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setAuthor('DiscordBot')
        .setDescription(`**${Client.commands.get('Ping').name}** *${Client.commands.get('Ping').description}*\n
        **${Client.commands.get('Clear').name}** *${Client.commands.get('Clear').description}*\n
        **${Client.commands.get('Report').name}** *${Client.commands.get('Report').description}*\n
        **Help** *Display this message!*`);
        message.channel.send(embed);
    }

});

var stream = fs.createReadStream('./secrets/token.txt');
stream.on("data", function(data){
    var token = data.toString();
    console.log(token);
    Client.login(token);
});