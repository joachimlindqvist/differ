
var AddedFinder = function(same, updated) {
    this.same = same;
    this.updated = updated;
    this.added = [];
    this.currentIndex = 0;
}

AddedFinder.prototype.updatedIndex = function(sameIndex) {
    return this.same[sameIndex] ? this.same[sameIndex].index : this.updated.length;
}

AddedFinder.prototype.indexHasChanged = function(updatedIndex) {
    return this.currentIndex !== updatedIndex;
}

AddedFinder.prototype.addedChunks = function(updatedIndex) {
    return this.updated.range(
        this.currentIndex,
        updatedIndex
    );
}

AddedFinder.prototype.addChunks = function(chunks) {
    this.added.push({
        type: 'added',
        index: this.currentIndex,
        chunks: chunks
    });
}

AddedFinder.prototype.advanceCurrentIndex = function(updatedIndex) {
    this.currentIndex = updatedIndex + 1;
}

AddedFinder.prototype.loopSameChunks = function(func) {
    for (var sameIndex = 0; sameIndex < this.same.length + 1; sameIndex++) {
        func.call(this, sameIndex);
    }
}

AddedFinder.prototype.determineChunk = function(sameIndex) {
    var updatedIndex = this.updatedIndex(sameIndex);

    if (this.indexHasChanged(updatedIndex)) {
        this.addChunks(this.addedChunks(updatedIndex));
    }

    this.advanceCurrentIndex(updatedIndex);
}

AddedFinder.prototype.result = function() {
    return this.added;
}

AddedFinder.prototype.get = function() {
    this.loopSameChunks(this.determineChunk);
    return this.result();
}

module.exports = AddedFinder;
