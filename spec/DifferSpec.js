var Differ = require('../src/Differ');
var Difference = require('../src/Difference');

describe('Differ', function() {

    var expectDiffToEqual = function(diff, toEqual) {
        for (var i = 0; i < diff.difference.length; i++) {
            expect(diff.difference[i].type).toEqual(toEqual[i].type);
            expect(diff.difference[i].index).toEqual(toEqual[i].index);
            var mergedStrings = diff.difference[i].chunks.chunks.map(function(item) {
                return item.chars;
            });
            expect(mergedStrings).toEqual(toEqual[i].chunks)
        }
    }

    it("should return a return a Difference object", function() {
        var differ = new Differ('first', 'second');
        expect(differ.diff()).toEqual(jasmine.any(Difference));
    });

    describe('Difference', function() {

        it("should return correct difference when original is longer than updated", function() {
            var differ = new Differ("1 2 1 1 1 1", "1 2 3");
            var result = [
                { type: 'same', index: 0, chunks: ['1 '] },
                { type: 'same', index: 1, chunks: ['2 '] },
                { type: 'removed', index: 2, chunks: ['1 ', '1 ', '1 ', '1'] },
                { type: 'added', index: 2, chunks: ['3'] }
            ];
            expectDiffToEqual(differ.diff(), result);
        });

        it("should return correct difference when original is shorter than updated", function() {
            var differ = new Differ("1 2 3", "1 2 1 1 1 1");
            var result = [
                { type: 'same', index: 0, chunks: ['1 '] },
                { type: 'same', index: 1, chunks: ['2 '] },
                { type: 'removed', index: 2, chunks: ['3'] },
                { type: 'added', index: 2, chunks: ['1 ', '1 ', '1 ', '1'] }
            ];
            expectDiffToEqual(differ.diff(), result);
        });

        it("should return all added when original is empty", function() {
            var differ = new Differ("", "1 2 3 4");
            var result = [
                { type: 'added', index: 0, chunks: ['1 ', '2 ', '3 ', '4'] }
            ];
            expectDiffToEqual(differ.diff(), result);
        });

        it("should return all added when updated is empty", function() {
            var differ = new Differ("1 2 3 4", "");
            var result = [
                { type: 'removed', index: 0, chunks: ['1 ', '2 ', '3 ', '4'] }
            ];
            expectDiffToEqual(differ.diff(), result);
        });

        it("should return all unchanged when nothing has changed", function() {
            var differ = new Differ("1 2 3 4", "1 2 3 4");
            var result = [
                { type: 'same', index: 0, chunks: ['1 '] },
                { type: 'same', index: 1, chunks: ['2 '] },
                { type: 'same', index: 2, chunks: ['3 '] },
                { type: 'same', index: 3, chunks: ['4'] },
            ];
            expectDiffToEqual(differ.diff(), result);
        });

        it("should return difference in correct order", function() {
            var differ = new Differ('0 1 2 3 4 5', '0 1 2 3 9 6');
            expect(differ.diff().chunks()).toEqual([ '0 ', '1 ', '2 ', '3 ', '4 ', '5', '9 ', '6' ]);
        });

        it("should should respond to .format()", function() {
            var differ = new Differ('first', 'second');
            expect(differ.diff().format).toEqual(jasmine.any(Function));
        });
    })
})
