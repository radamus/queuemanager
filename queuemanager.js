
var SQS = function(sqs, QueueUrl){
  this.sqs = sqs;
  this.QueueUrl = QueueUrl;
}

SQS.prototype.sendMessage = function(message, callback) {
    console.log("sending message: " + message);
  this.sqs.sendMessage(
        {
          MessageBody: message,
          "QueueUrl": this.QueueUrl    
        },
        onMessageSendConfirmed(callback)
      );
}


var onMessageSendConfirmed = function(callback) {
  return function(err, data){
    if(err) {console.log(err); callback(err); return;}     
     callback(null, data);
  }
}


SQS.prototype.receiveMessages = function(maxMessages, callback){
  	this.sqs.receiveMessage(
      {
        "QueueUrl": this.QueueUrl,
        "MaxNumberOfMessages": maxMessages,
        "VisibilityTimeout": 30,
        "WaitTimeSeconds": 20
      },
      onMessageRecievied(this,callback)
    );
}

SQS.prototype.receiveMessage = function(callback){
    this.receiveMessages(1, 
      function(err, data) {
        if(err) {
          callback(err);
          return;
        }else {
          var singleMessage = data[0];
          callback(null, singleMessage);
        }
      });
}


var onMessageRecievied = function(sqsObj, callback) {
  return function(err, data){
    if(err) {console.log(err); callback(err); return;}
      
      sqsObj.sqs.deleteMessage({
                "QueueUrl" : sqsObj.QueueUrl,
                "ReceiptHandle" :data.Messages[0].ReceiptHandle
              }); 
      callback(null, data.Messages);
  }
}

module.exports = SQS;