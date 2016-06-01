function Chunk(chars) {
    this.chars = chars;
}

Chunk.prototype.toString = function() {
    return this.chars;
}

Chunk.prototype.equals = function(other) {
    return this.chars === other.chars;
}

module.exports = Chunk;
