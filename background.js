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
// this now works wohoo
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab)  {
	uuid = createGuid();
	url = changeInfo.url;
	timestampActiveTab = Date.now();
	//outputString = '{"url": url,"timestamp": timestampActiveTab,"uuid": uuid}';
   //console.log("this is a live update  " + changeInfo.url);
   if(!(url.indexOf("undefined") > -1) &&  !(url.indexOf("newtab") > -1)){
	   alert(url +" " + uuid + " " +  timestampActiveTab);
	   }
	  saveThisJSON();
}); 

function saveThisJSON(){
chrome.fileSystem.getWritableEntry(chosenFileEntry, function(writableFileEntry) {
    writableFileEntry.createWriter(function(writer) {
		console.log("get writeable entry");
      writer.onerror = errorHandler;
      writer.onwriteend = callback;

    chosenFileEntry.file(function(file) {
		console.log("write writeable entry");
      writer.write(file);
    });
  }, errorHandler);
});


chrome.fileSystem.chooseEntry({type: 'saveFile'}, function(writableFileEntry) {
    writableFileEntry.createWriter(function(writer) {
		console.log("save file");
      writer.onerror = errorHandler;
      writer.onwriteend = function(e) {
        console.log('write complete');
      };
      writer.write(new Blob(['1234567890'], {type: 'text/plain'}));
    }, errorHandler);
});
}