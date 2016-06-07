
var AddedFinder = function(unchanged, updated) {
    this.unchanged = unchanged;
    this.updated = updated;
    this.added = [];
    this.currentIndex = 0;
}

AddedFinder.prototype.updatedIndex = function(unchangedIndex) {
    return this.unchanged[unchangedIndex] ? this.unchanged[unchangedIndex].index : this.updated.length;
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

AddedFinder.prototype.loopUnchangedChunks = function(func) {
    for (var unchangedIndex = 0; unchangedIndex < this.unchanged.length + 1; unchangedIndex++) {
        func.call(this, unchangedIndex);
    }
}

AddedFinder.prototype.determineChunk = function(unchangedIndex) {
    var updatedIndex = this.updatedIndex(unchangedIndex);

    if (this.indexHasChanged(updatedIndex)) {
        this.addChunks(this.addedChunks(updatedIndex));
    }

    this.advanceCurrentIndex(updatedIndex);
}

AddedFinder.prototype.result = function() {
    return this.added;
}

AddedFinder.prototype.get = function() {
    this.loopUnchangedChunks(this.determineChunk);
    return this.result();
}

module.exports = AddedFinder;
