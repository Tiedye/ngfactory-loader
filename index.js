var loaderUtils = require('loader-utils');
var parse = require('./lib/parser');
var url = require('url');

module.exports = function (content) {
    var config = loaderUtils.getLoaderConfig(this, 'ngfactoryLoader');
    var attributes = ['img:src'];
    if (config.attrs !== undefined) {
        if (typeof config.attrs === 'string') {
            attributes = config.attrs.split(' ');
        } else if (Array.isArray(config.attrs)) {
            attributes = config.attrs;
        } else {
            this.emitError('invalid config.attrs value')
        }
    }
    var links = parse(content, attributes);
    var root = config.root;
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
    return content;
}