const chai = require('chai');
const expect = chai.expect;

const sort = require('./sort');

describe('sort', () => {
    it('should sort object with no deep structure', () => {
        const object = {c: 3, b: 2, a: 1};
        const sortedObject = sort(object);

        expect(JSON.stringify(sortedObject)).to.eql(JSON.stringify({a: 1, b: 2, c: 3}));
    });

    it('should sort object with deep structure', () => {
        const object = {
            c: 3,
            b: 2,
            d: {
                b: {
                    x: {
                        z: 26,
                        b: 2
                    },
                    'b': {
                        c: 3,
                        a: 1
                    }
                },
                a: 'a'
            },
            a: 1
        };
        const sortedObject = sort(object);
        const expected = {
            a: 1,
            b: 2,
            c: 3,
            d: {
                a: 'a',
                b: {
                    b: {
                        a: 1,
                        c: 3
                    },
                    x: {
                        b: 2,
                        z: 26
                    }
                },
            }
        };

        expect(JSON.stringify(sortedObject)).to.eql(JSON.stringify(expected));
    });

    it('should sort object with deep structure and array elements', () => {
        const object = {
            c: 3,
            b: 2,
            d: {
                b: [
                    'b',
                    'c',
                    {
                        x: [
                            'z',
                            'c'
                        ]
                    },
                    'a'
                ],
                a: 'a'
            },
            a: 1
        };
        const sortedObject = sort(object);
        const expected = {
            a: 1,
            b: 2,
            c: 3,
            d: {
                a: 'a',
                b: [
                    {
                        x: [
                            'c',
                            'z'
                        ]
                    },
                    'a',
                    'b',
                    'c'
                ]
            }
        };
        expect(JSON.stringify(sortedObject)).to.eql(JSON.stringify(expected));
    });

    describe('un-sorted types', function () {
        [
            {value: 'sorting is cool', type: 'string'},
            {value: 100, type: 'integer'},
            {value: true, type: 'boolean'},
            {value: 12.5, type: 'float'},
            {value: Symbol(42), type: 'Symbol'},
            {value: new Number(100), type: 'Number'},
            {value: undefined, type: 'Undefined'},
            {value: null, type: 'Null'},
        ]
            .forEach(i => {
                it(`should return the same value when called with ${i.type}`, () => {
                    expect(sort(i.value)).to.eql(i.value);
                });
            });
    });

});
