var sinon = require("sinon");

module.exports = function(){
	var AWS = {};
	AWS.SQS = function(){};
	AWS.S3 = function(){};

var SQSObject = {}
	SQSObject.getMessages = sinon.mock().callsArg(1);
	SQSObject.putMessage = sinon.mock().callsArg(1);

	sinon.stub(AWS, "SQS").returns(SQSObject);
	
	
	return AWS;

}