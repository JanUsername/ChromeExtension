
 /**
 * write the date, guid and timestamp to json file with chrome fileSystem
 **/
alert("first line of method");
	chrome.fileSystem.getWritableEntry(chosenFileEntry, function(writableFileEntry) {
		alert("inside the method get writable entry");
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
		alert("in");
		writableFileEntry.createWriter(function(writer) {
			console.log("save file");
			writer.onerror = errorHandler;
		writer.onwriteend = function(e) {
			console.log('write complete');
		};
		writer.write(new Blob(['1234567890'], {type: 'text/plain'}));
		}, errorHandler);
	});