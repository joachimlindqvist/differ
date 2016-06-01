var FormatterFactory = require('./factories/FormatterFactory');

var Difference = function(difference) {
    this.difference = difference;
};

Difference.prototype.format = function(formatAs) {
    var formatter = FormatterFactory.create(formatAs, this.difference);
    return formatter.format();
}

Difference.prototype.chunks = function() {

    var chunks = this.difference.map(function(chunk) {
        return chunk.chunks.chunks;
    });

    var chunksFlat =  Array.prototype.concat.apply([], chunks);
    
    return chunksFlat.map(function(chunk) {
        return chunk.chars;
    });
}

module.exports = Difference;
