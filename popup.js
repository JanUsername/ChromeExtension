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

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
   alert(changeInfo.url);
    

}); 
 
chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
    url = tabs[0].url;
	timestampActiveTab = Date.now();
	uuid = createGuid();
	console.log("URL: " + url +  " timestamp: " + timestampActiveTab + " UUID: " + uuid);
	outputString = '{"url": url,"timestamp": timestampActiveTab,"uuid": uuid}';
	//var outputObj = JSON.parse(outputString); does not work with variables
	//writeToJSONFile();

});

 /**
 * write the date, guid and timestamp to json file with chrome fileSystem
 **/
chrome.fileSystem.chooseEntry({type: 'saveFile',suggestedName: 'myfile.html'}, 
	function(writableFileEntry) {
		writableFileEntry.createWriter(function(writer) {
		writer.onwriteend = function(e) {
		$("#OuptutText").html("Save complete!");
		};
		writer.write(new Blob([document.getElementById("HTMLFile").value], {type: 'text/plain'})); 
	}, errorHandler);
});

