/**
 * @file
 *
 * ### Responsibilities
 * - unit test spel2js.js
 *
 * Scaffolded with generator-microjs v0.1.2
 *
 * @author  <>
 */
'use strict';

/*global spel2js*/
describe('spel expression evaluator', function () {
    var evaluator = window.SpelExpressionEvaluator;

    beforeEach(function () {
        // add spies
    });

    describe('compile', function () {

        it('should compile an expression an return an evaluator', function () {
            //when
            var compiledExpression = evaluator.compile('1234');

            //then
            expect(compiledExpression.eval).toBeDefined();
        });

    });


    describe('parse', function () {

        describe('primitives', function () {

            it('should evaluate a number', function () {
                //when
                var numberInt = evaluator.eval('123');
                var numberFloat = evaluator.eval('123.4');

                //then
                expect(numberInt).toBe(123);
                expect(numberFloat).toBe(123.4);
            });

            it('should evaluate a string', function () {
                //when
                var stringSingle = evaluator.eval('\'hello world!\'');
                var stringDouble = evaluator.eval('"hello world!"');

                //then
                expect(stringSingle).toBe('hello world!');
                expect(stringDouble).toBe('hello world!');
            });

            it('should evaluate a boolean', function () {
                //when
                var boolTrue = evaluator.eval('true');
                var boolFalse = evaluator.eval('false');

                //then
                expect(boolTrue).toBe(true);
                expect(boolFalse).toBe(false);
            });

        });

        describe('lookups', function () {

            var context;

            beforeEach(function () {
                context = {
                    iAmANumber: 1,
                    iAmANestedPropertyName: 'propLookup',
                    nested: {
                        iAmAString: 'hi',
                        reallyNested: {
                            iAmTrue: true,
                            hi: 'bye'
                        },
                        propLookup: 'Found!'
                    }
                };
            });

            it('should look up a primitive in the context', function () {
                //when
                var number = evaluator.eval('iAmANumber', context);

                //then
                expect(number).toBe(1);
            });

            it('should look up a nested primitive in the context using dot notation', function () {
                //when
                var string = evaluator.eval('nested.iAmAString', context);

                //then
                expect(string).toBe('hi');
            });

            it('should look up a doubly nested primitive in the context using dot notation', function () {
                //when
                var bool = evaluator.eval('nested.reallyNested.iAmTrue', context);

                //then
                expect(bool).toBe(true);
            });

            it('should look up a nested primitive in the context using bracket notation literal', function () {
                //when
                var string = evaluator.eval('nested["iAmAString"]', context);

                //then
                expect(string).toBe('hi');
            });

            it('should look up a nested primitive in the context using bracket notation', function () {
                //when
                var string = evaluator.eval('nested[iAmANestedPropertyName]', context);

                //then
                expect(string).toBe('Found!');
            });

            it('should look up a really nested primitive in the context using bracket notation', function () {
                //when
                var string = evaluator.eval('nested.reallyNested[nested.iAmAString]', context);

                //then
                expect(string).toBe('bye');
            });

        });


        describe('comparisons', function () {

            it('should evaluate an equality', function () {
                //when
                var comp1 = evaluator.eval('1 == 1');
                var comp2 = evaluator.eval('1 == 2');

                //then
                expect(comp1).toBe(true);
                expect(comp2).toBe(false);
            });

            it('should evaluate an equality with lookups', function () {
                //given
                var context = {
                    left: 1,
                    right: 1
                };

                //when
                var comp = evaluator.eval('left == right', context);

                //then
                expect(comp).toBe(true);
            });

            it('should evaluate an inequality (not equal)', function () {
                //when
                var comp1 = evaluator.eval('1 != 2');
                var comp2 = evaluator.eval('1 != 1');

                //then
                expect(comp1).toBe(true);
                expect(comp2).toBe(false);
            });

            it('should evaluate an inequality (greater than)', function () {
                //when
                var comp1 = evaluator.eval('2 > 1');
                var comp2 = evaluator.eval('1 > 1');

                //then
                expect(comp1).toBe(true);
                expect(comp2).toBe(false);
            });

            it('should evaluate an inequality (greater than or equal to)', function () {
                //when
                var comp1 = evaluator.eval('1 >= 1');
                var comp2 = evaluator.eval('2 >= 1');
                var comp3 = evaluator.eval('1 >= 2');

                //then
                expect(comp1).toBe(true);
                expect(comp2).toBe(true);
                expect(comp3).toBe(false);
            });

            it('should evaluate an inequality (less than)', function () {
                //when
                var comp1 = evaluator.eval('1 < 2');
                var comp2 = evaluator.eval('1 < 1');

                //then
                expect(comp1).toBe(true);
                expect(comp2).toBe(false);
            });

            it('should evaluate an inequality (less than or equal to)', function () {
                //when
                var comp1 = evaluator.eval('1 <= 2');
                var comp2 = evaluator.eval('1 <= 2');
                var comp3 = evaluator.eval('2 <= 1');

                //then
                expect(comp1).toBe(true);
                expect(comp2).toBe(true);
                expect(comp3).toBe(false);
            });

            it('should evaluate a complex inequality', function () {
                //when
                var comp = evaluator.eval('"abc".length <= "abcde".length');

                //then
                expect(comp).toBe(true);
            });

        });

    });

});
