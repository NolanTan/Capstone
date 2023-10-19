class Node {
    Node(name, age) {
        this.name = name;
        this.age = age;
        this.next = null;
    }
}

export class LinkedList {
    LinkedList() {
        this.head = null;
        this.size = 0;
    }

    // Add stuff to linked list
    append(name, age) {
        const newNode = new Node(name, age);
        if (!this.head) {
            this.head = newNode;
        } else {
            let current = this.head;
            while (current.next) current = current.next;
            current.next = newNode;
        }
        this.size++;
    }

    // Add read stuff later (maybe)
}