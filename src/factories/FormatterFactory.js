var ConsoleFormatter = require('../formatters/ConsoleFormatter');

var FormatterFactory = {
    create: function(formatAs, difference) {
        switch (formatAs) {
            case 'console':
                return new ConsoleFormatter(difference);
                break;
            default:
                throw new Error('Cannot format difference as '+formatAs);
        }
    }
}

module.exports = FormatterFactory;
