const zmq = require('zeromq');
const pub = zmq.socket('pub'), sub = zmq.socket('sub'),
    endpoint = '127.0.0.1', port = [5556, 5555], master = 0, 
    servant = 1, topic = "SERVANT", channel = 'MASTER', 
    lyrics = [`IT'S A LOT!`, `IT'S A LOT!`, `IT'S A LOT!`, `LIKE LIFE!`];
pub.bindSync(`tcp://*:${port[servant]}`);
sub.connect(`tcp://${endpoint}:${port[master]}`);
sub.subscribe(channel);
sub.on('message', (top, message) => {
    pub.send([topic, lyrics[message]]);
});