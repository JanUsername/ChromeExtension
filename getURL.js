/**
 * Get the current URL.
 *
 **/
 
 /**
 * TODO : make a second script for sending the URL + decode the url
 **/
 var url;
 var timestampActiveTab;
 var uuid;
 var outputString;
/**
 function createGuid()
{
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random()*16|0, v = c === 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
    });
}

**/
// this now works wohoo
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab)  {
	/**
	uuid = createGuid();
	url = changeInfo.url;
	timestampActiveTab = Date.now();
	//outputString = '{"url": url,"timestamp": timestampActiveTab,"uuid": uuid}';
   //console.log("this is a live update  " + changeInfo.url);
   if(!(url.indexOf("undefined") > -1) &&  !(url.indexOf("newtab") > -1)){
	   alert(url +" " + uuid + " " +  timestampActiveTab);
	   }
	 **/
	 //send URL to senURL.js  
	 url = changeInfo.url;
	 sendURL(url);
}); 


function sendURL(url){
	var xhr = new XMLHttpRequest();
	//xhr.onreadystatechange = handleStateChange; // Implemented elsewhere.
	xhr.open("GET","http://localhost:8080",true);
	//swap get url with localhost
	xhr.send("url");
	// send the gotten url
}