
 /**
 * write the date, guid and timestamp to json file with chrome fileSystem
 **/

 
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab)  {
 
 chrome.fileSystem.chooseEntry( {
      type: 'saveFile',
      suggestedName: 'todos.txt',
      accepts: [ { description: 'Text files (*.txt)',
                   extensions: ['txt']} ],
      acceptsAllTypes: true
    }, exportToFileEntry);
	
});


function()
	// document.getElementById('exportToDisk').addEventListener('click', doExportToDisk);
 