var Chunkizer = require('./Chunkizer');
var Chunks = require('./Chunks');
var RemovedFinder = require('./finders/RemovedFinder');
var AddedFinder = require('./finders/AddedFinder');
var UnchangedFinder = require('./finders/UnchangedFinder');
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

    var unchanged = this.unchanged();
    var removed = this.removed(unchanged);
    var added = this.added(unchanged);

    var combinedChunks = [].concat(unchanged, removed, added);
    this.difference = new Difference(this.order(combinedChunks));

    return this.difference;
}
Differ.prototype.order = function(chunks) {

    var typeOrder = { unchanged: 0, removed: 2, added: 1 };

    chunks.sort(function(a, b) {

        if (a.index === b.index) {
            return typeOrder[b.type] - typeOrder[a.type];
        }

        return a.index - b.index;
    });

    return chunks;
}

Differ.prototype.removed = function(unchanged) {
    var removedFinder = new RemovedFinder(unchanged, this.chunks.original);
    return removedFinder.get();
}

Differ.prototype.added = function(unchanged) {
    var addedFinder = new AddedFinder(unchanged, this.chunks.updated);
    return addedFinder.get();
}

Differ.prototype.unchanged = function() {
    var unchangedFinder = new UnchangedFinder(this.chunks.original, this.chunks.updated);
    return unchangedFinder.get();
}

module.exports = Differ;
