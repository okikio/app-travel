var http = require("http");
var fs = require("fs");
var path = require("path");
var zlib = require('zlib');
var PORT = process.env.PORT || 8080;

http.createServer(function(req, res) {
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

    fs.readFile(filePath, function(err, content) {
        if (err) {
            if (err.code == 'ENONET') {
                fs.readFile('./404.html', function(err, content) {
                    if (err) { console.log("Error loading 404 page"); }
                    res.writeHead(200, { 'Content-Type': contentType });
                    res.end(content, 'utf-8');
                });
            }
            else {
                res.writeHead(500);
                res.end('Sorry, check with the site admin for error: ' + err.code + '..\n');
                res.end();
            }
        } else {
            var raw = fs.createReadStream(filePath.replace("./", ""));
            var acceptEncoding = req.headers['accept-encoding'];
            if (!acceptEncoding) { acceptEncoding = ''; }

            // Note: This is not a conformant accept-encoding parser.
            // See https://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.3
            if (/\bdeflate\b/.test(acceptEncoding)) {
                res.writeHead(200, { 'Content-Type': contentType, 'Content-Encoding': 'deflate' });
                raw.pipe(zlib.createDeflate()).pipe(res);
            } else if (/\bgzip\b/.test(acceptEncoding)) {
                res.writeHead(200, { 'Content-Type': contentType, 'Content-Encoding': 'gzip' });
                raw.pipe(zlib.createGzip()).pipe(res);
            } else if (/\bbr\b/.test(acceptEncoding)) {
                res.writeHead(200, { 'Content-Type': contentType, 'Content-Encoding': 'br' });
                raw.pipe(zlib.createBrotliCompress()).pipe(res);
            } else {
                res.writeHead(200, { 'Content-Type': contentType });
                raw.pipe(res);
            }
            // res.writeHead(200, { 'Content-Type': contentType });
            // res.end(content, 'utf-8');
        }
    });
}).listen(PORT);
console.log('Server running at http://127.0.0.1:' + PORT + '/');
