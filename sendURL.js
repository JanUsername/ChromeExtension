
 /**
 * write the date, guid and timestamp to json file with chrome fileSystem
 
 * TODO: store the item in local store and read them here
 **/

 //(function() {
 
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab)  {
	sendURL();
});

function sendURL(){
var xhr = new XMLHttpRequest();
xhr.onreadystatechange = handleStateChange; // Implemented elsewhere.
xhr.open("GET", chrome.extension.getURL('/config_resources/config.json'), true);
//swap get url with localhost
xhr.send();;
}
