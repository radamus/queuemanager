queuemanager
============

Simple wrapper for sending and receiving messages from the queue. 
Curently supports only Amazon SQS putMessage and receiveMessage.

Usage:

console:
> npm install queuemanager

code:

/*
init AWS SQS object, see: http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/SQS.html
*/

var Queue = require	("../queuemanager");

var queue = new Queue(awsqueue, queueURL);

methods:
- queue.sendMessage("messagebody", callback); - put single message into the queue 
-	queue.receiveMessage(callback); - receive single message from the queue and delete it
