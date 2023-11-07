class ListNode {
    constructor(key, value) {
        this.key = key;
        this.value = value;
        this.right = null;
        this.down = null;
    }
}

class SkipList {
    constructor() {
        this.head = new ListNode(null, null);
    }
}

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

// Returns all nodes to be displayed on frontend
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

// Function to return all levels of the SkipList (testing/bug fixing)
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

SkipList.prototype.clear = function() {
    this.head = new ListNode(null, null);
}

export default SkipList;