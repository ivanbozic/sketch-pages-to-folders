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

	Utilities.createFolder(rootFolder);

	for (var i = 0; i < pages.count(); i++) {
		var currentPage = pages[i];

		Utilities.createFolder(rootFolder + pages[i].name() + "/");
	}
};