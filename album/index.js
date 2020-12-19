const fs = require('fs');
const scanner = require('./scanner');
const util = require('./util');

/* list all albums */
function list() {
    var dirs = [];
    fs.readdirSync(util.rootFolder, { withFileTypes: true }).forEach(file => {
        if (util.isAlbumFolder(file)) {
            dirs.push(file.name);
        }
    });
    return dirs;
};

/* list all photo file names */
function listPhotoNames(albumName) {
    var fileNames = [];
    fs.readdirSync(util.getAlbumFolderPathName(albumName), { withFileTypes: true }).forEach(file => {
        if (util.isPhotoFile(file)) {
            fileNames.push(file.name);
        }
    });
    return fileNames;
}

exports.list = list;
exports.listPhotoNames = listPhotoNames;
exports.getPhotoFileName = util.getPhotoFilePathName;
exports.scanAlbumFolders = scanner.scanAlbumFolders;
