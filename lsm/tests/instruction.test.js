import LSMTree from '../frontend/lsm-app/src/components/LSMTree';
import Memtable from '../frontend/lsm-app/src/components/Memtable';
import Disk from '../frontend/lsm-app/src/components/Disk';

describe('LSMTree processInstruction function', () => {
    let lsmTree;

    beforeEach(() => {
        // Create new LSMTree instance for each test
        lsmTree = new LSMTree({ currIndex: 0, instructions: [] });
        // Mock setState to prevent warnings about it
        lsmTree.setState = jest.fn();
    });

    it('should report when ID is not found in memtable or disk', () => {
        // Assuming neither memtable nor disk has the record with key '1'
        const memtable = new Memtable();
        const disk = new Disk();
        lsmTree.memtableRef.current = memtable;
        lsmTree.diskRef.current = disk;
    
        lsmTree.processInstruction('R 1');    
        expect(memtable.search('1')).toBe(null);
    });

    it('should successfully read from memtable', () => {
        // Assuming memtable has a record with key '1'
        const memtable = new Memtable();
        memtable.insert('1', 'Value from memtable');
        lsmTree.memtableRef.current = memtable;

        lsmTree.processInstruction('R 1');
        expect(memtable.search('1')).toBe('Value from memtable');
    });

    it('should successfully read from disk', () => {
        // Assuming disk has a record with key '1'
        const disk = new Disk();
        disk.addSSTable([{ key: '1', value: 'Value from disk' }]);
        lsmTree.diskRef.current = disk;

        expect(disk.search('1')).toBe('Value from disk');
    });

    it('should successfully write a new record to memtable', () => {
        // Assuming memtable is empty and the record is being written for the first time
        const memtable = new Memtable();
        lsmTree.memtableRef.current = memtable;
    
        lsmTree.processInstruction('W 1 John');
        expect(memtable.search('1')).toBe('John');
    });

    it('should successfully update an existing record in memtable', () => {
        // Assuming memtable already has a record with key '1' and value 'John'
        const memtable = new Memtable();
        memtable.insert('1', 'John');
        lsmTree.memtableRef.current = memtable;
    
        lsmTree.processInstruction('W 1 Bobby');    
        expect(memtable.search('1')).toBe('Bobby');
    });

    it('should successfully delete a record from memtable', () => {
        // Assuming memtable has a record with key '1'
        const memtable = new Memtable();
        memtable.insert('1', 'John');
        lsmTree.memtableRef.current = memtable;
    
        lsmTree.processInstruction('D 1');
        expect(memtable.search('1')).toBe(null);
    });
    
    it('should successfully delete a record from disk', () => {
        // Assuming disk has a record with key '1'
        const memtable = new Memtable();
        const disk = new Disk();
        disk.addSSTable([{ key: '1', value: 'John' }]);
        lsmTree.memtableRef.current = memtable;
        lsmTree.diskRef.current = disk;
    
        lsmTree.processInstruction('D 1');
        expect(memtable.search('1')).toBe(null);
    });
});