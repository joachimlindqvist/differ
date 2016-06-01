
var RemovedFinder = function(same, original) {
    this.same = same;
    this.original = original;
    this.removed = [];
    this.currentIndex = 0;
}

RemovedFinder.prototype.originalIndex = function(sameIndex) {
    return this.same[sameIndex] ? this.same[sameIndex].originalIndex : this.original.length;
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

RemovedFinder.prototype.loopSameChunks = function(func) {
    for (var sameIndex = 0; sameIndex < this.same.length + 1; sameIndex++) {
        func.call(this, sameIndex);
    }
}

RemovedFinder.prototype.determineChunk = function(sameIndex) {
    var originalIndex = this.originalIndex(sameIndex);

    if (this.indexHasChanged(originalIndex)) {
        this.addChunks(this.removedChunks(originalIndex));
    }

    this.advanceCurrentIndex(originalIndex);
}

RemovedFinder.prototype.result = function() {
    return this.removed;
}

RemovedFinder.prototype.get = function() {
    this.loopSameChunks(this.determineChunk);
    return this.result();
}

module.exports = RemovedFinder;
