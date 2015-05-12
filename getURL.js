/**
 * Get the current URL.
 *
 **/
 
 /**
 * TODO : make a second script for sending the URL + decode the url
 **/
 var url = "";
 var local = "http:localhost:8195";

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab)  {
	if(changeInfo.status == "loading") {
		url = changeInfo.url;

		if(!(url.indexOf("undefined") != -1) &&  !(url.indexOf("newtab") != -1)){
			sendURL(url);
		}
	}

}); 

function sendURL(url){
	var xhr = new XMLHttpRequest();
	var urlEncoded = fixedEncodeURIComponent(url);
	var local2 = local+ "/?url"+ urlEncoded;
	xhr.open("GET",local2,true);

	xhr.send();

}

function fixedEncodeURIComponent(url){
	var tmp = url;
     return encodeURIComponent(url).replace(/[!'()]/g, escape).replace(/\*/g, "%2A");
}