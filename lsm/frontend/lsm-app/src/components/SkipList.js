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
        if(!node.right || node.right.key > key) {
            nodes.unshift(node);
            node = node.down;
        } else {
            node = node.right;
        }
    }

    // Insert node and promote as necessary
    let shouldPromote = true;
    let downNode = null;
    while(shouldPromote && nodes.length) {
        const node = nodes.shift();
        const newNode = new ListNode(key, value);
        newNode.down = downNode;
        newNode.right = node.right;
        node.right = newNode;
        shouldPromote = Math.random() < 0.5;
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
        if(!node.right || node.right.key > key) node = node.down;
        else if(node.right.key === key) return node.right.value;
        else node = node.right;
    }

    return null; // Node not found
}

export default SkipList;