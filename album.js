const rootFolder = '/Volumes/TOSHIBA EXT/Shared Pictures';
const fs = require('fs');

function list() {
    var dirs = [];
    fs.readdirSync(rootFolder, {withFileTypes: true}).forEach(file => {
        if (file.isDirectory() && !isHiddenDirectory(file.name)) {
            dirs.push(file.name);
        }
      });
    return dirs;
};

function isHiddenDirectory(fileName) {
    return fileName.startsWith(".");
}

exports.list = list;
