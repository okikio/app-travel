var http = require("http");
var fs = require("fs");
var path = require("path");
var PORT = process.env.PORT || 8080;

http.createServer(function (req, res) {
    console.log("request ", req.url);
    
    var filePath = '.' + req.url;
    if (filePath == './') { filePath = "./index.min.html"; }
    
    var extname = String(path.extname(filePath)).toLocaleLowerCase();
    var mimeTypes = {
        '.html': 'text/html',
        '.js': 'text/javascript',
        '.css': 'text/css',
        '.json': 'application/json',
        '.png': 'image/png',
        '.jpg': 'image/jpg',
        '.gif': 'image/gif',
        '.wav': 'audio/wav',
        '.mp4': 'video/mp4',
        '.woff': 'application/font-woff',
        '.ttf': 'application/font-ttf',
        '.eot': 'application/vnd.ms-fontobject',
        '.otf': 'application/font-otf',
        '.svg': 'application/image/svg+xml'
    };
    
    var contentType = mimeTypes[extname] || 'application/octet-stream';
    
    fs.readFile(filePath, function (err, content) {
        if (err) {
            if (err.code == 'ENONET') {
                fs.readFile('./404.html', function (err, content) {
                    if (err) { console.log("Error loading 404 page"); }
                    res.writeHead(200, { 'Content-Type': contentType });
                    res.end(content, 'utf-8');
                });
            } else {
                res.writeHead(500);
                res.end('Sorry, check with the site admin for error: ' + err.code + '..\n');
                res.end();
            }
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
}).listen(PORT);
console.log('Server running at http://127.0.0.1:' + PORT + '/');