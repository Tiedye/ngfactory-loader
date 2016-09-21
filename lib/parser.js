var Parser = require('fastparse');

var parser = new Parser({
    "source": {
        "this\\.(_el_\\d+) = this\\.renderer\\.createElement\\([^,]*,'([^']*)": function (match, id, tagName) {
            this.elements[id] = tagName;
        },
        "this\\.renderer\\.setElementAttribute\\(this\\.(_el_\\d+),": function (match, id) {
            this.currentElement = id;
            return "attribute";
        }
    },
    "attribute": {
        "('([^']*)',')([^']*)'": function (match, preValue, attribute, value, index) {
            if (this.attributes.indexOf(this.elements[this.currentElement]+":"+attribute) >= 0) {
                this.results.push({
                    start: index + preValue.length,
                    length: value.length,
                    value: value
                });
            }
            return "source"
        }
    }
});

module.exports = function parse(ngfactory, attributes) {
    return parser.parse("source", ngfactory, {
        results: [],
        attributes: attributes,
        currentElement: "",
        elements: {}
    }).results;
}