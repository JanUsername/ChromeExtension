/**
 * Get the current URL.
 *
 **/
 
 /**
 * TODO : check if the guid realy works!
 **/
 var url;
 var timestampActiveTab;
 var uuid;
 var outputString;
 
 function createGuid()
{
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random()*16|0, v = c === 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
    });
}


chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab)  {
	uuid = createGuid();
	url = changeInfo.url;
	timestampActiveTab = Date.now();
	//outputString = '{"url": url,"timestamp": timestampActiveTab,"uuid": uuid}';
   //console.log("this is a live update  " + changeInfo.url);
   if(!(url.indexOf("undefined") > -1) &&  !(url.indexOf("newtab") > -1)){
	   alert(url +" " + uuid + " " +  timestampActiveTab);
	   }
}); 
 
 /**
 * write the date, guid and timestamp to json file with chrome fileSystem
 **/
 
chrome.fileSystem.chooseEntry(function (type: "saveFile") {
		writableFileEntry.createWriter(function(writer) {
		writer.onwriteend = function(e) {
		$("#OuptutText").html("Save complete!");
		};
		writer.write(new Blob([document.getElementById("HTMLFile").value], {type: 'text/plain'})); 
	}, errorHandler);
});

