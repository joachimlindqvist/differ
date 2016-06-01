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
    return foundIndex !== -1 && foundIndex > this.lastFoundIndex && foundIndex - this.lastFoundIndex < 3
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
    var foundIndex = this.updated.indexOf(original, this.lastFoundIndex);

    if (this.isSame(foundIndex)) {
        this.addChunk(index, foundIndex, original);
        this.setLastFoundIndex(foundIndex);
    }
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
