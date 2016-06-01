var Chunk = require('./Chunk');
var Chunks = require('./Chunks');

function Chunkizer(str) {
    this.str = str;
}

Chunkizer.prototype.get = function() {

    var chunks = new Chunks();

    this.matches().forEach(function(match) {
        chunks.add(new Chunk(match));
    });

    return chunks;
}

Chunkizer.prototype.matches = function () {

    var pattern = /([^\s]+)/g;
    var matches = [];
    var match = null;

    while (match = pattern.exec(this.str)) {
        matches.push(match[1]);
    }

    return matches;
};

module.exports = Chunkizer;
