import BloomFilter from '../frontend/lsm-app/src/components/BloomFilter';

describe('BloomFilter', () => {
    let filter;

    beforeEach(() => {
        filter = new BloomFilter(100); // Initialize with 100 bits
    });

    test('insert and lookup', () => {
        filter.insert('apple');
        expect(filter.lookup('apple')).toBe(true);
        expect(filter.lookup('banana')).toBe(false);
    });

    test('multiple insert and lookup', () => {
        filter.insert('apple');
        filter.insert('banana');
        filter.insert('cherry');
        expect(filter.lookup('apple')).toBe(true);
        expect(filter.lookup('banana')).toBe(true);
        expect(filter.lookup('cherry')).toBe(true);
        expect(filter.lookup('watermelon')).toBe(false);
    });

    test('hash functions', () => {
        expect(filter.hash1('test')).toBe(13715229);
        expect(filter.hash2('test')).toBe(1351328468);
        expect(filter.hash3('test')).toBe(7840355);
    });

});