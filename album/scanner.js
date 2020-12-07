const db = require('../db');
const fs = require('fs');
const image = require('../image');
const util = require('./util');

/* scan album folders */
async function scanAlbumFolders() {
    const folders = await albumFolderNames();
    return Promise.all(folders.map(scanAlbumFolder));
}

function albumFolderNames() {
    return new Promise((resolve, reject) => {
        fs.readdir(util.rootFolder, { withFileTypes: true }, function (err, files) {
            if (err) {
                reject(err);
            } else {
                const folderNames = files.filter(util.isAlbumFolder).map(folder => folder.name);
                resolve(folderNames);
            }
        });
    });
}

async function scanAlbumFolder(albumFolderName) {
    const fileNames = await photoFileNames(albumFolderName);
    const data = await Promise
        .all(
            fileNames.map(photoFileName => {

                exists({ albumName: albumFolderName, photoName: photoFileName }).then(exists => {
                    if (exists) {
                        return 0;
                    } else {
                        return photoMetadata(albumFolderName, photoFileName)
                            .then(save);;
                    }
                })

            })
        );
    console.log(`Done scanning folder ${albumFolderName}`);
}

function photoMetadata(albumName, photoName) {
    return new Promise((resolve, reject) => {
        image.metadata(util.getPhotoFilePathName(albumName, photoName)).then(metadata => {
            resolve({ albumName, photoName, createTimestamp: metadata.createTimestamp });
        }).catch(reason => {
            console.log(`Error getting metadata for ${albumName}/${photoName}. Reason: ${reason}`);
        });
    });
}

function photoFileNames(albumFolderName) {
    return new Promise((resolve, reject) => {
        fs.readdir(util.getAlbumFolderPathName(albumFolderName), { withFileTypes: true }, (err, files) => {
            if (err) {
                reject(err);
            } else {
                resolve(files.filter(util.isPhotoFile).map(file => file.name));
            }
        });
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
