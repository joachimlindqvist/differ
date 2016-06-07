
var RemovedFinder = function(unchanged, original) {
    this.unchanged = unchanged;
    this.original = original;
    this.removed = [];
    this.currentIndex = 0;
}

RemovedFinder.prototype.originalIndex = function(unchangedIndex) {
    return this.unchanged[unchangedIndex] ? this.unchanged[unchangedIndex].originalIndex : this.original.length;
}

RemovedFinder.prototype.indexHasChanged = function(originalIndex) {
    return this.currentIndex !== originalIndex;
}

RemovedFinder.prototype.removedChunks = function(originalIndex) {
    return this.original.range(
        this.currentIndex,
        originalIndex
    );
}

RemovedFinder.prototype.addChunks = function(chunks) {
    this.removed.push({
        type: 'removed',
        index: this.currentIndex,
        chunks: chunks
    });
}

RemovedFinder.prototype.advanceCurrentIndex = function(originalIndex) {
    this.currentIndex = originalIndex + 1;
}

RemovedFinder.prototype.loopUnchangedChunks = function(func) {
    for (var unchangedIndex = 0; unchangedIndex < this.unchanged.length + 1; unchangedIndex++) {
        func.call(this, unchangedIndex);
    }
}

RemovedFinder.prototype.determineChunk = function(unchangedIndex) {
    var originalIndex = this.originalIndex(unchangedIndex);

    if (this.indexHasChanged(originalIndex)) {
        this.addChunks(this.removedChunks(originalIndex));
    }

    this.advanceCurrentIndex(originalIndex);
}

RemovedFinder.prototype.result = function() {
    return this.removed;
}

RemovedFinder.prototype.get = function() {
    this.loopUnchangedChunks(this.determineChunk);
    return this.result();
}

module.exports = RemovedFinder;
