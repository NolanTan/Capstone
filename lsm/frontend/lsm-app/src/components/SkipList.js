/**
 * This file contains the classes and logic to implement a skip list.
 * 
 * @author Nolan Flinchum
 * @version 12/5/2023
 */

/**
 * Class representing a node in the SkipList.
 */
class ListNode {
    /**
     * Create a ListNode.
     * @param {*} key - The key of the node.
     * @param {*} value - The value associated with the key.
     */
    constructor(key, value) {
        this.key = key;
        this.value = value;
        this.right = null;
        this.down = null;
    }
}

/**
 * Class representing a SkipList data structure.
 */
class SkipList {
    /**
     * Create a SkipList.
     */
    constructor() {
        this.head = new ListNode(null, null);
    }
}

/**
 * Inserts a key-value pair into the SkipList.
 * @param {*} key - The key to be inserted.
 * @param {*} value - The value associated with the key.
 */
SkipList.prototype.insert = function(key, value) {
    const nodes = [];
    let node = this.head;

    // Locate insertion point
    while(node) {
        if(!node.right || node.right.key > parseInt(key)) {
            nodes.unshift(node);
            node = node.down;
        } else {
            node = node.right;
        }
    }

    // Insert node and "promote" based on a "coin toss"
    let shouldPromote = true;
    let downNode = null;
    while(shouldPromote && nodes.length) {
        const node = nodes.shift();
        const newNode = new ListNode(key, value);
        newNode.down = downNode;
        newNode.right = node.right;
        node.right = newNode;
        shouldPromote = Math.random() < 0.5; // Coin toss
        downNode = newNode;
    }

    // If still promoting, create a new level
    if(shouldPromote) {
        const newHead = new ListNode(null, null);
        newHead.right = new ListNode(key, value);
        newHead.right.down = downNode;
        newHead.down = this.head;
        this.head = newHead;
    }
}

/**
 * Searches for a key in the SkipList and returns its value if found.
 * @param {*} key - The key to search for.
 * @returns {*} The value associated with the key, or null if not found.
 */
SkipList.prototype.search = function(key) {
    let node = this.head;

    // Locate the node
    while(node) {
        if(!node.right || parseInt(node.right.key) > parseInt(key)) node = node.down;
        else if(parseInt(node.right.key) === parseInt(key)) return node.right.value;
        else node = node.right;
    }

    return null; // Node not found
}

/**
 * Updates the value associated with a given key in the SkipList.
 * @param {*} key - The key to update.
 * @param {*} newValue - The new value to assign to the key.
 * @returns {boolean} - True if the key was found and updated, false otherwise.
 */
SkipList.prototype.update = function(key, newValue) {
    let node = this.head;
    let found = false;

    // Locate the node with the given key
    while (node && !found) {
        if (!node.right || parseInt(node.right.key) > parseInt(key)) {
            node = node.down;
        } else if (parseInt(node.right.key) === parseInt(key)) {
            node = node.right;
            while(node) {
                node.value = newValue; // Update the value
                node = node.down; // Move down
            }
            found = true;
        } else {
            node = node.right;
        }
    }

    return found; 
}

/**
 * Returns all nodes at the base level of the SkipList for display purposes.
 * @returns {Array} - The array of nodes at the base level.
 */
SkipList.prototype.getBaseLevel = function() {
    const baseLevelNodes = []
    let node = this.head;
    while(node.down) node = node.down;

    while(node.right){
        node = node.right
        baseLevelNodes.push(node);
    }

    return baseLevelNodes;
}

/**
 * Returns all levels of the SkipList (for testing or bug fixing).
 * @returns {Array<Array<ListNode>>} - An array containing arrays of nodes at each level.
 */
SkipList.prototype.getAllLevels = function() {
    const allLevels = [];
    let currentLevel = this.head;

    while (currentLevel) {
        const nodesAtLevel = [];
        let node = currentLevel;

        while (node) {
            nodesAtLevel.push(node);
            node = node.right;
        }

        allLevels.push(nodesAtLevel);
        currentLevel = currentLevel.down;
    }

    return allLevels;
}

/**
 * Clears the SkipList, removing all elements.
 */
SkipList.prototype.clear = function() {
    this.head = new ListNode(null, null);
}

export default SkipList;