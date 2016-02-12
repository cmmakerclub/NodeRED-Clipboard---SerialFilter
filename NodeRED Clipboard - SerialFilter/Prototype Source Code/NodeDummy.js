
var sTestCommand ="0x55 0xAA 0x04 0x01 0x01 0xF9";

//============================================

var iLengthTest = context.iLengthTest || 0;
var sDataList = sTestCommand.split(" ");
var iLengthMax = sDataList.length;

var sData = sDataList[iLengthTest];
sData = sData.replace("0x","");


//=======================

msg.payload = sData;

if(iLengthTest < iLengthMax - 1)
{
	iLengthTest += 1;
}else{
	iLengthTest = 0;
}
context.iLengthTest = iLengthTest;

//var bData = parseInt(sData);

return msg;