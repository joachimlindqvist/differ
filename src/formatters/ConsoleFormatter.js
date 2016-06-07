var colors = require('colors/safe');

var ConsoleFormatter = function(difference) {
    this.difference = difference;
}

ConsoleFormatter.prototype.colors = function(type) {

    var colors = {
        'unchanged': { 'bgColor': 'bgBlack', 'color': 'white' },
        'removed': { 'bgColor': 'bgRed', 'color': 'black' },
        'added': { 'bgColor': 'bgGreen', 'color': 'black' },
    };

    return colors[type];
}

ConsoleFormatter.prototype.format = function() {

    var formatted = '';

    this.difference.forEach(function(item) {
        return item.chunks.chunks.forEach(function(chars) {
            var printColors = this.colors(item.type);
            formatted += colors[printColors.bgColor](colors[printColors.color](chars.toString()));
        }.bind(this));
    }.bind(this));

    return formatted;
}

module.exports = ConsoleFormatter;
