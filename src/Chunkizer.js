var Chunk = require('./Chunk');
var Chunks = require('./Chunks');

function Chunkizer(str) {
    this.str = str;
}

Chunkizer.prototype.get = function() {

    var chunks = new Chunks();
    var matches = this.matches();

    matches.forEach(function(match) {
        chunks.add(new Chunk(match));
    });

    return chunks;
}

Chunkizer.prototype.matches = function () {
    return this.str.match(/([^\s]+\s*)/g) || [];
};

module.exports = Chunkizer;
