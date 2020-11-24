const rootFolder = '/Volumes/TOSHIBA EXT/Shared Pictures';
const fs = require('fs');

 function list() {
    var dirs = [];
    fs.readdirSync(rootFolder).forEach(file => {
        dirs.push(file);
      });
    return dirs;
};

exports.list = list;
