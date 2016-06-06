var Differ = require('../src/Differ');
var Difference = require('../src/Difference');

describe('Differ', function() {

    it("should return a return a Difference object", function() {
        var differ = new Differ('first', 'second');
        expect(differ.diff()).toEqual(jasmine.any(Difference));
    });

    describe('Difference', function() {

        it("should return difference in correct order", function() {
            var differ = new Differ('0 1 2 3 4 5', '0 1 2 3 9 6');
            expect(differ.diff().chunks()).toEqual(['0', '1', '2', '3', '4', '5', '9', '6']);
        });

        it("should should respond to .format()", function() {
            var differ = new Differ('first', 'second');
            expect(differ.diff().format).toEqual(jasmine.any(Function));
        });
    })
})
