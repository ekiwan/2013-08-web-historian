var path = require('path');
module.exports.datadir = path.join(__dirname, "../data/sites.txt"); // tests will need to override this.
var fs = require('fs');
var url = require('url');
var headers = {
  'Content-Type': 'text/html'
};

module.exports.router = function(request, response) {
  var urlObj = url.parse(request.url);
  var path = urlObj.path;
  var homeRegex = new RegExp('^/$');
  var siteRegex = new RegExp('\/\\w+\\.\\w+\\.\\w+');
  switch (true) {
    case (request.method === "POST"):
      recPost(request, response);
      break;
    case homeRegex.test(path):
      readIndex(path, response);
      break;
    case siteRegex.test(path):
      readSites(path, response);
      break;
  default:
    response.writeHead(404, headers);
    response.end();

  }
};

var readIndex = function(url, response) {
  response.writeHead(200, headers);
  fs.readFile(__dirname + '/public/index.html', function(err, data) {
    if (err) {
      return err;
    }
    response.end(data.toString());
  });
};

var readSites = function(url, response) {
  response.writeHead(200, headers);
  fs.readFile(__dirname + '/../data/sites' + url, function(err, data) {
    if (err) {
      return err;
    }
    response.end(data.toString());
  });
};

var recPost = function(request, response) {
  //get data from POST -- async
  //write content of POST data to data/sites.txt
  //if url is not already archived, redirect user to waiting page
  //if url is archived, redirect to our copy
  var data = "";

  request.on('data', function(chunk) {
    data += chunk;
  });

  request.on('end', function() {
    fs.writeFile(__dirname + '/..' + '/spec/testdata/sites.txt',
      data.slice(4) + '\n', function(err) {
        if (err) {
          throw err;
        }
        console.log("success");
        response.writeHead(302, headers);
        response.end(data);
      });
  });

};
