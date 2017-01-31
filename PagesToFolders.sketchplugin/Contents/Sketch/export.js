var Utilities = { };

Utilities.createFolder = function (path) {
	var fileManager = NSFileManager.defaultManager();

	// TODO Check if this failes to create the directory,
	// break the flow and alert the user.
	fileManager.createDirectoryAtPath_withIntermediateDirectories_attributes_error_(path, true, nil, nil);
};

Utilities.deleteFolder = function (path) {
	var fileManager = NSFileManager.defaultManager();

	// TODO Check if this failes to create the directory,
	// break the flow and alert the user.
	fileManager.createDirectoryAtPath_withIntermediateDirectories_attributes_error_(path, true, nil, nil);
};

Utilities.cleanArtboardName = function (name) {
	var cleanedUpName = "";

	log(cleanedUpName);

	for (var character in name) {
		if (name[character] != "/")
			cleanedUpName += name[character];
		else
			cleanedUpName += "-";
	}

	log(cleanedUpName);

	return cleanedUpName;
};

console.log(Utilities.cleanArtboardName("asdfadf"));

function exportAllPages(context) {
	var sketch = context.api();
	var application = sketch.Application();
	var doc = context.document;
	var pages = doc.pages();
	var fileFolder = doc.fileURL().path().split(doc.displayName())[0];

	var rootFolder = fileFolder + "Pages to Folders/";

	// TODO Before creating the folder, delete the existing ones since
	// we're going to be recreating them anyway.
	//
	// Documentation for NSFileManager.removeItemAtPath()
	// https://developer.apple.com/reference/foundation/nsfilemanager/1408573-removeitematpath?language=objc
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

				application.log(artboard.name());

				var artboardNameWithDashesInsteadOfSlashes = Utilities.cleanArtboardName(artboard.name());

				application.log(artboardNameWithDashesInsteadOfSlashes);

				// TODO Try and get the exportable options for each artboard,
				// and export it that way. If there are no export options,
				// export the file as a @1x .png file.
				doc.saveArtboardOrSlice_toFile_(artboard, pageFolderPath + artboardNameWithDashesInsteadOfSlashes + ".png");
			}

			pageCounter = pageCounter + 1;
		}
	}

	application.alert("This plugin is still under active development and does not work fully. Your export can be found in a new folder right next to the file you wanted to export.", "Warning");
};