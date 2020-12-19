const db = require('../db');
const fs = require('fs');
const image = require('../image');
const util = require('./util');
const async = require("async");

/**
 *  scan album folders. Do NOT convert to promise to avoid microtasks chaining.
*/
function scanAlbumFolders(callback) {
    albumFolderNames((err, folders) => {
        async.series(folders.map(scanAlbumFolder), (err, data) => {
            callback(err, data);
        });
    });
}

function albumFolderNames(callback) {
    fs.readdir(util.rootFolder, { withFileTypes: true }, function (err, files) {
        if (err) {
            callback(err, null);
        } else {
            const folderNames = files.filter(util.isAlbumFolder).map(folder => folder.name);
            callback(err, folderNames);
        }
    });
}

function scanAlbumFolder(albumFolderName) {
    return function (callback) {

        photoFileNames(albumFolderName, (err, fileNames) => {

            const saveFunctions = fileNames.map(photoFileName => saveIfNotExists(albumFolderName, photoFileName));
            async.series(saveFunctions, (err, data) => {
                callback(err, data);
                console.log(`Done scanning folder ${albumFolderName}`);
            });
        });

    };
}

function saveIfNotExists(albumName, photoName) {
    return function (callback) {
        exists({ albumName, photoName }).then(exists => {
            if (exists) {
                callback(null, 0);
            } else {
                photoMetadata(albumName, photoName)
                    .then(save)
                    .then(numbSaved => callback(null, numbSaved))
                    .catch(err => callback(null, 0));  // TODO swallowing error here
            }
        });
    }
}

function photoMetadata(albumName, photoName) {
    return new Promise((resolve, reject) => {
        image.metadata(util.getPhotoFilePathName(albumName, photoName)).then(metadata => {
            resolve({ albumName, photoName, createTimestamp: metadata.createTimestamp });
        }).catch(reason => {
            console.log(`Error getting metadata for ${albumName}/${photoName}. Reason: ${reason}`);
            reject(reason);
        });
    });
}

function photoFileNames(albumFolderName, callback) {
    fs.readdir(util.getAlbumFolderPathName(albumFolderName), { withFileTypes: true }, (err, files) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, files.filter(util.isPhotoFile).map(file => file.name));
        }
    });
}

function save(photoMetadata) {
    db.photos.insert(photoMetadata);
    return 1;
}

function exists({ albumName, photoName }) {
    return new Promise((resolve, reject) => {
        db.photos.count({ albumName, photoName }, (err, count) => {
            if (err) {
                reject(err);
            } else {
                resolve(count > 0);
            }
        });
    });

}

exports.scanAlbumFolders = scanAlbumFolders;
