var fs = require('fs');
var parse = require('./lib/parser');
var url = require('url');
var loaderUtils = require('loader-utils');

var root = "";

fs.readFile('test.txt', {encoding: 'utf8'}, (err, content) => {
    var links = parse(content, ['img:src']);
    links.reverse();
    content = [content];
    links.forEach(function(link) {
        if(!loaderUtils.isUrlRequest(link.value, root)) return;

        var remaining = content.pop();
        content.push(remaining.substr(link.start + link.length + 1));
        content.push('require('+JSON.stringify(loaderUtils.urlToRequest(link.value, root))+')');
        content.push(remaining.substr(0, link.start - 1));
    });
    content.reverse();
    content = content.join("");
    fs.writeFile('test.out.txt', content);
});