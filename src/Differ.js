var Chunkizer = require('./Chunkizer');
var Chunks = require('./Chunks');
var RemovedFinder = require('./finders/RemovedFinder');
var AddedFinder = require('./finders/AddedFinder');
var SameFinder = require('./finders/SameFinder');
var Difference = require('./Difference');

function Differ(original, updated) {

    this.original = original;
    this.updated = updated;
    this.difference = [];

    this.chunks = {
        original: this.chunkize('original'),
        updated: this.chunkize('updated'),
    };
}

Differ.prototype.chunkize = function(text) {
    var chunkizer = new Chunkizer(this[text]);
    return chunkizer.get();
}

Differ.prototype.diff = function(asString) {

    var same = this.same();
    var removed = this.removed(same);
    var added = this.added(same);

    var combinedChunks = [].concat(same, removed, added);
    this.difference = new Difference(this.order(combinedChunks));

    return this.difference;
}
Differ.prototype.order = function(chunks) {

    var typeOrder = { same: 0, removed: 2, added: 1 };

    chunks.sort(function(a, b) {

        if (a.index === b.index) {
            return typeOrder[b.type] - typeOrder[a.type];
        }

        return a.index - b.index;
    });

    return chunks;
}

Differ.prototype.removed = function(same) {
    var removedFinder = new RemovedFinder(same, this.chunks.original);
    return removedFinder.get();
}

Differ.prototype.added = function(same) {
    var addedFinder = new AddedFinder(same, this.chunks.updated);
    return addedFinder.get();
}

Differ.prototype.same = function() {
    var sameFinder = new SameFinder(this.chunks.original, this.chunks.updated);
    return sameFinder.get();
}

module.exports = Differ;
