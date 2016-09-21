const should = require('should');

const loader = require('../');

describe('loader', function () {
    it('should convert img:src by default', function () {
        loader.call(
            {
                options: {}
            }, 
            "this._el_10 = this.renderer.createElement((null as any),'img',(null as any));\n" +
            "this.renderer.setElementAttribute(this._el_10,'src','cheese.png');\n"
        ).should.be.eql(
            "this._el_10 = this.renderer.createElement((null as any),'img',(null as any));\n" +
            "this.renderer.setElementAttribute(this._el_10,'src',require(\"./cheese.png\"));\n"
        );
    });
    it('should accept attrs from query', function () {
        loader.call(
            {
                query:  '?attrs=img:src div:tst',
                options: {}
            }, 
            "this._el_10 = this.renderer.createElement((null as any),'img',(null as any));\n" +
            "this.renderer.setElementAttribute(this._el_10,'src','cheese.png');\n" +
            "this._el_11 = this.renderer.createElement((null as any),'div',(null as any));\n" +
            "this.renderer.setElementAttribute(this._el_11,'tst','pie.txt');\n"
        ).should.be.eql(
            "this._el_10 = this.renderer.createElement((null as any),'img',(null as any));\n" +
            "this.renderer.setElementAttribute(this._el_10,'src',require(\"./cheese.png\"));\n" + 
            "this._el_11 = this.renderer.createElement((null as any),'div',(null as any));\n" +
            "this.renderer.setElementAttribute(this._el_11,'tst',require(\"./pie.txt\"));\n"
        );
    });
});