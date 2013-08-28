var path = require('path');
module.exports.datadir = path.join(__dirname, "../data/sites.txt"); // tests will need to override this.
var fs = require('fs');
var url = require('url');
var status200 = 200;
var status201 = 201;
var status404 = 404;
var headers = {
  'Content-Type': 'text/html'
};

module.exports.router = function(request, response) {
  var urlObj = url.parse(request.url);
  var homeRegex = new RegExp('^/$');
  var siteRegex = new RegExp('\/\\w+\\.\\w+\\.\\w+');
  switch (true) {
    case homeRegex.test(urlObj.path):
      readIndex(urlObj.path, response);
      break;
    case siteRegex.test(urlObj.path):
      readSites(urlObj.path, response);
      break;
  default:
    response.writeHead(status404, headers);
    response.end();

  }
};

var readIndex = function(url, response) {
  response.writeHead(status200, headers);
  fs.readFile(__dirname + '/public/index.html', function(err, data) {
    if (err) {
      return err;
    }
    response.end(data.toString());
  });
};

var readSites = function(url, response) {
  fs.readFile(__dirname + '/..' + '/data/sites' + url, function(err, data) {
    if (err) {
      return err;
    }
    response.end(data.toString());
  });
};
