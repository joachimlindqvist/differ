var Chunks = require('../Chunks');

var UnchangedFinder = function(original, updated) {
    this.original = original;
    this.updated = updated;
    this.unchanged = [];
    this.lastFoundIndex = -1;
}

UnchangedFinder.prototype.loopChunks = function(func) {
    for (var index = 0; index < this.original.length; index++) {
        func.call(this, index);
    }
}

UnchangedFinder.prototype.isUnchanged = function(foundIndex) {
    return foundIndex !== -1;
}

UnchangedFinder.prototype.addChunk = function(originalIndex, foundIndex, chunks) {
    this.unchanged.push({
        type: 'unchanged',
        originalIndex: originalIndex,
        index: foundIndex,
        chunks: new Chunks([chunks])
    });
}

UnchangedFinder.prototype.determineChunk = function(index) {

    var original = this.original.get(index);
    var begin = this.beginSearchIndex();
    var foundIndex = this.updated.indexOf(original, begin);

    if (this.isUnchanged(foundIndex)) {
        this.setLastFoundIndex(foundIndex);
        this.removeHitsAfterIndex(foundIndex);
        this.addChunk(index, foundIndex, original);
    }
}

UnchangedFinder.prototype.beginSearchIndex = function() {
    var chunkIndex = this.unchanged.length - 1;
    return chunkIndex >= 0 ? this.unchanged[chunkIndex].index : 0;
}

UnchangedFinder.prototype.removeHitsAfterIndex = function(foundIndex) {
    this.unchanged = this.unchanged.filter(function(item) {
        return item.index < foundIndex;
    });
}

UnchangedFinder.prototype.setLastFoundIndex = function(index) {
    this.lastFoundIndex = index;
}

UnchangedFinder.prototype.result = function() {
    return this.unchanged;
}

UnchangedFinder.prototype.get = function() {
    this.loopChunks(this.determineChunk);
    return this.result();
}

module.exports = UnchangedFinder;
