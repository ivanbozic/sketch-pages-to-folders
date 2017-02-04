var Utilities = { };

Utilities.createFolder = function (path) {
	var fileManager = NSFileManager.defaultManager();

	// TODO Check if this failes to create the directory,
	// break the flow and alert the user.
	fileManager.createDirectoryAtPath_withIntermediateDirectories_attributes_error_(path, true, nil, nil);
};

Utilities.deleteFolder = function (path) {
	var fileManager = NSFileManager.defaultManager();

	fileManager.removeItemAtPath_error(path, nil);
};

Utilities.deleteAndCreateFolder = function (path) {
	Utilities.deleteFolder(path);
	Utilities.createFolder(path);
};

Utilities.cleanArtboardName = function (name) {
	var cleanedUpName = "";

	for (var i = 0; i < name.length; i++) {
		if (name[i] != "/")
			cleanedUpName += name[i];
		else
			cleanedUpName += "-";
	}

	return cleanedUpName;
};