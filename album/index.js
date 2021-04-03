const _ = require("lodash");
const fs = require('fs');
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

/* list photo metadata for an album */
async function fetchPhotoMetadata(albumName) {
    const findPhotos = new Promise((resolve, reject) => {
        db.photos.find({albumName}).sort({photoName: 1}).exec((err, docs) => {
            if (err) reject(err);
            resolve(docs)
        });
    })
    const docs = await findPhotos;
    return docs.map(photo => {
        return {
            name: photo.photoName,
            description: photo.description
        };
    });
}

async function fetchAllAlbums() {
    const allAlbums = new Promise((resolve, reject) => {
        db.photos.find({}, {albumName: 1, photoName: 1}).sort({albumName: 1}).exec((err, docs) => {
            if (err) reject(err);
            resolve(docs)
        });
    })
    const docs = await allAlbums;
    return _.map(_.groupBy(docs, "albumName"), (albums, name) => ({name, photoNames: _.map(albums, "photoName")}));
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
exports.fetchPhotoMetadata = fetchPhotoMetadata;
exports.fetchAllAlbums = fetchAllAlbums;
