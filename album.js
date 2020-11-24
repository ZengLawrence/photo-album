const rootFolder = '/Volumes/TOSHIBA EXT/Shared Pictures';
const fs = require('fs');

 function list() {
    var dirs = [];
    fs.readdirSync(rootFolder, {withFileTypes: true}).forEach(file => {
        if (file.isDirectory()) {
            dirs.push(file.name);
        }
      });
    return dirs;
};

exports.list = list;
