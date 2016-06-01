var FormatterFactory = require('../src/factories/FormatterFactory');
var ConsoleFormatter = require('../src/formatters/ConsoleFormatter');

describe('FormatterFactory', function() {

    it('should return Error on wrong formatter', function() {
        var error = new Error('Cannot format difference as invalid');
        expect(FormatterFactory.create.bind(this, 'invalid')).toThrow(error);
    });

    it('should return formatter', function() {
        expect(FormatterFactory.create('console')).toEqual(jasmine.any(ConsoleFormatter));
    });

})
