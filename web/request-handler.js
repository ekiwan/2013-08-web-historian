var path = require('path');
module.exports.datadir = path.join(__dirname, "../data/sites.txt"); // tests will need to override this.
var fs = require('fs');
module.exports.handleRequest = function (request, response) {
  console.log(exports.datadir);
  //set response headers
  //look at request url
  //serve appropriate file
  //find the file and write it to response
  var statusCode = 200;
  var headers = {
    'Content-Type': 'text/html'
  };
  response.writeHead(statusCode, headers);
  fs.readFile(__dirname + '/public/index.html', function(err, data) {
    if (err) {
      return err;
    }
    response.end(data.toString());
  });
};

var readData = function(url, response) {
  fs.readFile(__dirname + '/..' + '/data/sites' + url, function(err, data) {
    if (err) {
      return err;
    }
    response.end(data.toString());
  });
};
