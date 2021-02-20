const fs = require('fs');
const util = require('util');
const scanner = require('./scanner');
const albumUtil = require('./util');
const db = require('../db');

/* list all albums */
function list() {
    var dirs = [];
    fs.readdirSync(albumUtil.rootFolder, { withFileTypes: true }).forEach(file => {
        if (albumUtil.isAlbumFolder(file)) {
            dirs.push(file.name);
        }
    });
    return dirs;
};

/* list all photo file names */
function listPhotoNames(albumName) {
    var fileNames = [];
    fs.readdirSync(albumUtil.getAlbumFolderPathName(albumName), { withFileTypes: true }).forEach(file => {
        if (albumUtil.isPhotoFile(file)) {
            fileNames.push(file.name);
        }
    });
    return fileNames;
}

function savePhotoDescription({albumName, photoName}, desc) {
    return new Promise((resolve, reject) => {
        db.photos.update(
                {albumName, photoName}, 
                {$set: {description: desc}}, 
                {},
                (err) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve();
                    }
                });
    }
    );
}

exports.list = list;
exports.listPhotoNames = listPhotoNames;
exports.getPhotoFileName = albumUtil.getPhotoFilePathName;
exports.scanAlbumFolders = scanner.scanAlbumFolders;
exports.savePhotoDescription = savePhotoDescription;
