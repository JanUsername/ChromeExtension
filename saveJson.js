
 /**
 * write the date, guid and timestamp to json file with chrome fileSystem
 **/

 
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab)  {
	exportToDisk();
});

function exportToDisk(){
 chrome.fileSystem.chooseEntry( {
      type: 'saveFile',
      suggestedName: 'todos.txt',
      accepts: [ { description: 'Text files (*.txt)',
                   extensions: ['txt']} ],
      acceptsAllTypes: true
    }, exportToFileEntry);
}

function exportToFileEntry(){
	fileEntry.createWriter(function(fileWriter) {

		var truncated = false;
		var content = ['<a id="a"><b id="b">this is just a test!</b></a>'];
		var blob = new Blob([content]);
	
		fileWriter.onwriteend = function(e) {
			if (!truncated) {
			truncated = true;
			this.truncate(blob.size);
			return;
			}
		};

		fileWriter.onerror = function(e) {
			status.innerText = 'Export failed: '+e.toString();
		};

		fileWriter.write(blob);

		});
}
 