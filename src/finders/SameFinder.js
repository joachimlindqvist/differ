var Chunks = require('../Chunks');

var SameFinder = function(original, updated) {
    this.original = original;
    this.updated = updated;
    this.same = [];
    this.lastFoundIndex = -1;
}

SameFinder.prototype.loopChunks = function(func) {
    for (var index = 0; index < this.original.length; index++) {
        func.call(this, index);
    }
}

SameFinder.prototype.isSame = function(foundIndex) {
    return foundIndex !== -1;
}

SameFinder.prototype.addChunk = function(originalIndex, foundIndex, chunks) {
    this.same.push({
        type: 'same',
        originalIndex: originalIndex,
        index: foundIndex,
        chunks: new Chunks([chunks])
    });
}

SameFinder.prototype.determineChunk = function(index) {

    var original = this.original.get(index);
    var begin = this.beginSearchIndex();
    var foundIndex = this.updated.indexOf(original, begin);

    if (this.isSame(foundIndex)) {
        this.setLastFoundIndex(foundIndex);
        this.removeHitsAfterIndex(foundIndex);
        this.addChunk(index, foundIndex, original);
    }
}

SameFinder.prototype.beginSearchIndex = function() {
    var chunkIndex = this.same.length - 2;
    return chunkIndex >= 0 ? this.same[chunkIndex].index : 0;
}

SameFinder.prototype.removeHitsAfterIndex = function(foundIndex) {
    this.same = this.same.filter(function(item) {
        return item.index < foundIndex;
    });
}

SameFinder.prototype.setLastFoundIndex = function(index) {
    this.lastFoundIndex = index;
}

SameFinder.prototype.result = function() {
    return this.same;
}

SameFinder.prototype.get = function() {
    this.loopChunks(this.determineChunk);
    return this.result();
}

module.exports = SameFinder;
