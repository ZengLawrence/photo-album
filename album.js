//const rootFolder = '/Users/lawrencezeng/Projects/Pictures';
const rootFolder = '/Volumes/TOSHIBA EXT/Shared Pictures';
const fs = require('fs');

/* list all albums */
function list() {
    var dirs = [];
    fs.readdirSync(rootFolder, {withFileTypes: true}).forEach(file => {
        if (file.isDirectory() && !isHiddenDirectoryOrFile(file.name)) {
            dirs.push(file.name);
        }
      });
    return dirs;
};

function isHiddenDirectoryOrFile(fileName) {
    return fileName.startsWith(".");
}

/* list all photo file names */
function listPhotoNames(albumName) {
    var fileNames = [];
    fs.readdirSync(rootFolder + '/' + albumName, {withFileTypes: true}).forEach(file => {
        if (file.isFile() && 
            !isHiddenDirectoryOrFile(file.name) &&
            isJpeg(file.name)) {
            fileNames.push(file.name);
        }
      });
    return fileNames;
}

function isJpeg(fileName) {
    return fileName.toLowerCase().endsWith('.jpg');
}
function getPhotoFileName(albumName, photoName) {
    return rootFolder + '/' + albumName + '/' + photoName;
}

exports.list = list;
exports.listPhotoNames = listPhotoNames;
exports.getPhotoFileName = getPhotoFileName;
