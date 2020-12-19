const config = require('../config');
const rootFolder = config.rootFolder;

function isHiddenDirectoryOrFile(fileName) {
  return fileName.startsWith(".");
}

function isJpeg(fileName) {
  return fileName.toLowerCase().endsWith('.jpg') ||
      fileName.toLowerCase().endsWith('.jpeg');
}

function getAlbumFolderPathName(albumName) {
  return rootFolder + '/' + albumName;
}

function getPhotoFilePathName(albumName, photoName) {
  return getAlbumFolderPathName(albumName) + '/' + photoName;
}

function isAlbumFolder(folder) {
  return folder.isDirectory() && !isHiddenDirectoryOrFile(folder.name);
}

function isPhotoFile(file) {
  return file.isFile() &&
      !isHiddenDirectoryOrFile(file.name) &&
      isJpeg(file.name);
}

exports.isAlbumFolder = isAlbumFolder;
exports.isPhotoFile = isPhotoFile;
exports.getAlbumFolderPathName = getAlbumFolderPathName;
exports.getPhotoFilePathName = getPhotoFilePathName;
exports.rootFolder = rootFolder;