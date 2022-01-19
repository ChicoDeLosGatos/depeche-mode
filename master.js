const zmq = require('zeromq'); 
const pub = zmq.socket('pub'), sub = zmq.socket('sub'),
    endpoint = '127.0.0.1', port = [5556, 5555], color = ['\x1b[31m', '\x1b[34m', '\x1b[0m'],
    master = 0, servant = 1, reset = 2, topic = "MASTER", channel = 'SERVANT', seconds=1000,
    lyrics = [`IT'S A LOT!`, `IT'S A LOT!`, `IT'S A LOT!`, `IT'S A LOT!`];
let idx = 0;
pub.bindSync(`tcp://*:${port[master]}`);
sub.connect(`tcp://${endpoint}:${port[servant]}`);
sub.subscribe(channel);
console.log("WAITING FOR SERVANT...\n");
setInterval(() => {
    if(idx == lyrics.length) idx = 0;
    pub.send([topic, idx++]);
}, 2*seconds);
sub.on('message', (top, message) => {
    console.log(color[master],`${topic}:`, color[reset], '\t', lyrics[idx-1]);
    setTimeout(() => {
        console.log(color[servant], `${top}:`, color[reset], '\t', message.toString());
        if(idx==lyrics.length) console.log("");
    }, seconds)
  
});

