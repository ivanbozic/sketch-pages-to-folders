var Utilities = { };

Utilities.createFolder = function (path) {
	var fileManager = NSFileManager.defaultManager();

	fileManager.createDirectoryAtPath_withIntermediateDirectories_attributes_error_(path, true, nil, nil);
};

function exportAllPages(context) {
	var sketch = context.api();
	var application = sketch.Application();
	var doc = context.document;
	var pages = doc.pages();
	var fileFolder = doc.fileURL().path().split(doc.displayName())[0];

	var rootFolder = fileFolder + "Pages to Folders/";

	// TODO Before creating the folder, delete the existing ones since
	// we're going to be recreating them anyway.
	Utilities.createFolder(rootFolder);

	var pageCounter = 1;

	for (var i = 0; i < pages.count(); i++) {
		var currentPage = pages[i];

		if (pages[i].name() != "Symbols") {
			var pageFolderPath = rootFolder + pageCounter.toString() + " \u2013 " + pages[i].name() + "/";
			Utilities.createFolder(pageFolderPath);

			doc.setCurrentPage(currentPage);

			var artboards = doc.currentPage().artboards();

			for (var j = 0; j < artboards.count(); j++) {
				var artboard = artboards[j];

				// TODO Before saving the artboard, make sure that the name
				// of the artboard does not contain a slash (/) since that
				// can create additional folders.
				doc.saveArtboardOrSlice_toFile_(artboard, pageFolderPath + artboard.name() + ".png");
			}

			pageCounter = pageCounter + 1;
		}
	}

	application.alert("This plugin is still under active development and does not work fully. Your export can be found in a new folder right next to the file you wanted to export.", "Warning");
};