var loaderUtils = require('loaderUtils');

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
}