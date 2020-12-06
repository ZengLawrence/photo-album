const config = require('./config');
const rootFolder = config.rootFolder;

const db = require('./db');
const fs = require('fs');
const image = require('./image');

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
    return fileName.toLowerCase().endsWith('.jpg') ||
    fileName.toLowerCase().endsWith('.jpeg');
}
function getPhotoFileName(albumName, photoName) {
    return rootFolder + '/' + albumName + '/' + photoName;
}

/* scan album folders */
async function scanAlbumFolders() {
    const folders = await albumFolderNames();
    return Promise.all(folders.map(scanAlbumFolder));
}

function albumFolderNames() {
    return new Promise((resolve, reject) => {
        fs.readdir(rootFolder, { withFileTypes: true }, function (err, files) {
            if (err) {
                reject(err);
            } else {
                const folderNames = files.filter(isAlbumFolder).map(folder => folder.name);
                resolve(folderNames);
            }
        });
    });
}

function isAlbumFolder(folder) {
    return folder.isDirectory() && !isHiddenDirectoryOrFile(folder.name); 
}

function scanAlbumFolder(albumFolderName) {
    return photoFileNames(albumFolderName).then(fileNames => {
        return Promise.all(fileNames.map(photoFileName => photoMetadata(albumFolderName,  photoFileName).then(save)));
    });
}

function  photoMetadata(albumName, photoName) {
    return new Promise((resolve, reject) => {
        image.metadata(getPhotoFileName(albumName, photoName)).then( metadata => {
            resolve({albumName, photoName, createTimestamp: metadata.createTimestamp});
        });
    });
}

function photoFileNames(albumFolderName) {
    return new Promise((resolve, reject) => {
        fs.readdir(rootFolder + '/' + albumFolderName, {withFileTypes: true}, (err, files) => {
            if (err) {
                reject(err);
            } else {
                resolve(files.filter(isPhotoFile).map(file => file.name));
            }
        });
    });
}

function isPhotoFile(file) {
    return file.isFile() &&
        !isHiddenDirectoryOrFile(file.name) &&
        isJpeg(file.name);
}

function save(photoMetadata) {
    db.photos.insert(photoMetadata);
    return 1;
}

exports.list = list;
exports.listPhotoNames = listPhotoNames;
exports.getPhotoFileName = getPhotoFileName;
exports.scanAlbumFolders = scanAlbumFolders;
