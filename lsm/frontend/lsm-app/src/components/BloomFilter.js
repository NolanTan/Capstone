/**
 * Class representing a Bloom filter.
 * 
 * @author Nolan Flinchum
 * @version 2/24/2024
 */
class BloomFilter {

    /**
     * Initializes the size and bit array for the Bloom filter.
     * @param {int} size - size of the bit array.
     */
    constructor(size) {
        this.size = size;
        this.bitArray = new Array(size).fill(false);
    }

    /**
     * Will insert an string into the Bloom filter. Will calculate the hash values for the
     * provided string using three hash functions, and then set the corresponding bits in the
     * bit array to true.
     * 
     * @param {String} s - input string.
     */
    insert(s) {
        const indexes = this.calculateIndexes(s);
        indexes.forEach(index => this.bitArray[index] = true); // Set bits to 1
    }

    /**
     * With Bloom filters, if every bit in the bit array at the calculated indexes is 1 (true), 
     * then we can say that the data we're looking for might be there. If one of the indexes maps
     * to a 0, then we can say the data is definitely no there. 
     * 
     * @param {*} s - input string.
     * @returns true if every index has a 1, false otherwise.
     */
    lookup(s) {
        const indexes = this.calculateIndexes(s);
        return indexes.every(index => this.bitArray[index]); // Check if every index is true
    }

    /**
     * Hashes the input string using each hash to calculate the resulting index of the bit array.
     * 
     * @param {*} s - input string.
     * @returns an array containing the indexes.
     */
    calculateIndexes(s) {
        const indexes = [];
        indexes.push(this.hash1(s) % this.size);
        indexes.push(this.hash2(s) % this.size);
        indexes.push(this.hash3(s) % this.size);
        return indexes;
    }

    /**
     * Hash function 1 for the Bloom filter.
     * 
     * @param {String} input - input string to be iterated through.
     * @returns hash of the string.
     */
    hash1(input) {
        let hash = 11; // Random prime number for seed
        if (input.length === 0) return hash;

        // Iterate through string; use previous hash value and ASCII value of char
        for (let i = 0; i < input.length; i++)
            hash = (hash << 5) - hash + input.charCodeAt(i); // Equivalent to hash * 31 + char

        return hash;
    }

    /**
     * Hash function 2 for the Bloom filter.
     * 
     * @param {String} input - input string to be iterated through.
     * @returns hash of the string.
     */
    hash2(input) {
        let hash = 5381; // Random prime number for seed
        if(input.length === 0) return hash;

        // Iterate through string; use previous hash value and ASCII value of char
        for (let i = 0; i < input.length; i++)
            hash = (hash << 5) + input.charCodeAt(i); // Equivalent to hash * 32 + char
        
        return hash;
    }

    /**
     * Hash function 3 for the Bloom filter.
     * 
     * @param {String} input - input string to be iterated through.
     * @returns hash of the string.
     */
    hash3(input) {
        let hash = 3; // Random prime number for seed
        if (input.length === 0) return hash;

        // Iterate through string; use previous hash value and ASCII value of char
        for (let i = 0; i < input.length; i++)
            hash = (hash << 5) + hash + input.charCodeAt(i); // Equivalent to hash * 33 + char
        
        return hash;
    }

}