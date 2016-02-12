var payload = msg.payload;
msg.payload = "";
msg.sUseData = "";
var iState = context.iState || 0;
var sData = context.sData || "";
var sUseData = context.sUseData || "";

var bCheckSum = context.bCheckSum || 0;

var iLength = context.iLength || 0;
var iLengthMax = context.iLengthMax || 0;
var sUseData;
//=================================

var bCalCheckSum;

if(payload == "55"){
	iState = 0;
	sData = "0x55";
	bCheckSum = 0;
	iLength = 0;
	iLengthMax = 0;

	sUseData=0;
}

switch(iState)
{
	case 0 :
	if(payload == "AA")
	{
		sData += " 0xAA";
		iState = 1;
	}
	break;

	case 1 :
	iLengthMax = parseInt(payload, 16) - 2;
	sData += " 0x"+payload;
	bCheckSum += parseInt(payload, 16);
	iState = 2;
	break;

	case 2 :
	sData += " 0x"+payload;
	sUseData +="0x"+payload+" ";
	bCheckSum += parseInt(payload, 16);
	iLength+=1;

	if(iLength >= iLengthMax)
	{
		iState = 3;
	}
	break;
	case 3 :
	sData += " 0x"+payload;

	var sSum = ""+((0xFFFF00 | (bCheckSum)).toString(2)); 
	var sNotSum = "";
	for(var i = 0;i <sSum.length;i++)
	{
		if(sSum[i]==0)
		{
			sNotSum+="1";
		}else{
			sNotSum+="0";
		}
	}
	sNotSum = (parseInt(sNotSum,2)).toString(16).toUpperCase();

	if(payload == sNotSum)
	{
		msg.payload = sData;
		msg.sUseData = sUseData;
	}
		//bCalCheckSum = (~(bCheckSum%256));
		//msg.payload = sData+" c "+bCheckSum+" cs "+"0x"+bCalCheckSum;
		iState = 0;
		break;
	}


//msg.payload = (-7).toString(16)+" "+bCalCheckSum+" "+buffSum;
//msg.payload = iState+" "+iLength+" "+iLengthMax+" p "+payload+" s "+sData;

/*
parseInt("1234abcd", 16) = 305441741
(305441741).toString(16) = "1234abcd"
*/

//===========
context.iState = iState;
context.sData = sData;
context.sUseData = sUseData;
context.bCheckSum = bCheckSum;

context.iLength = iLength;
context.iLengthMax =iLengthMax;

return msg;

