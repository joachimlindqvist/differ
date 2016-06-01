function Chunks(chunks) {

    this.chunks = [];
    this.length = 0;

    if (chunks) {
        this.setChunks(chunks);
    }
}

Chunks.prototype.setChunks = function(chunks) {

    if (!Array.isArray(chunks)) {
        throw new Error("'chunks' must be an array in Chunks.setChunks");
    }

    this.chunks = chunks;
    this.length = chunks.length;
}

Chunks.prototype.add = function(chars) {
    this.chunks.push(chars);
    this.length++;
}

Chunks.prototype.get = function(index) {
    return this.chunks[index];
}

Chunks.prototype.range = function(start, stop) {
    return new Chunks(this.chunks.slice(start, stop));
}

Chunks.prototype.indexOf = function(needle, begin) {

    var index = -1;

    for (var i = Math.max(begin, 0); i < this.chunks.length; i++) {
        if (this.chunks[i].equals(needle)) {
            return i;
        }
    }

    return index;
}

module.exports = Chunks;
