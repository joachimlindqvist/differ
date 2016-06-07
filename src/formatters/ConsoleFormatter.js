var colors = require('colors/safe');

var ConsoleFormatter = function(difference) {
    this.difference = difference;
    this.currentType = null;
}

ConsoleFormatter.prototype.operatorForType = function(type) {

    var operators = {
        'removed': '-',
        'added': '+',
        'same': '=',
    };

    return operators[type];
}

ConsoleFormatter.prototype.isCurrentType = function(type) {
    return this.currentType === type;
}

ConsoleFormatter.prototype.currentlyNoType = function() {
    return this.currentType === null;
}

ConsoleFormatter.prototype.closeChunk = function(formatted) {
    return formatted;
}

ConsoleFormatter.prototype.openChunk = function(formatted, operator) {
    return formatted;
}

ConsoleFormatter.prototype.colors = function(type) {

    var colors = {
        'same': { 'bgColor': 'bgBlack', 'color': 'white' },
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
            this.currentType = item.type;

        }.bind(this));
    }.bind(this));

    if (formatted) {
        formatted = this.closeChunk(formatted).trim()
    }

    return formatted;
}

module.exports = ConsoleFormatter;
