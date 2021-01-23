module.exports = {
    name: 'Ping',
    description: 'Pong!',
    execute(message){
        message.channel.send('Pong!');
    }
}