const should = require('should');

const parse = require('../lib/parser');

describe('parser', function () {
    it('should capture normal', function () {
        parse("this._el_10 = this.renderer.createElement((null as any),'img',(null as any));\n" +
            "this.renderer.setElementAttribute(this._el_10,'src','cheese.png');\n", ["img:src"])
            .map(function (link) { return link.value; }).should.be.eql(['cheese.png']);
    });
});