var fs = require('fs');

module.exports.readUrls = function(filePath, cb){
  fs.readFile(filePath, function(err, data) {
    if (err) {
      throw err;
    }
    cb(data.toString());
  });
};

module.exports.downloadUrls = function(urls){
  return 1;
};
