var payload = msg.payload;
var sUseData = msg.sUseData;
msg.payload = "";
var sUseDataList;
var sUseDataLength;
var sCommand = "";

if(sUseData != "")
{
	sUseDataList = sUseData.split(" ");
	sUseDataLength = sUseDataList.length-1;

	if(sUseDataLength >= 1)
	{
		switch(sUseDataList[0])
		{
			case "0x01" :

			sCommand = "ECG Test "+parseInt(sUseDataList[1]);
			break;
		}
	}
}
msg.payload = sCommand;
//msg.payload = payload +" "+sUseData+" "+sCommand;
return msg;