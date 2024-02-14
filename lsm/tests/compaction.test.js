import Level from './Level'; // Problem?
import SSTable from './SSTable'; //Problem?

// Mocking SSTable class to isolate testing to compact() method only
jest.mock('../frontend/lsm-app/src/components/SSTable'); 

describe('Level', () => {
    let level;

    beforeEach(() => {
        level = new Level();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('compact() method should properly combine and filter data', () => {
        const mockSSTable1 = new SSTable(); // Creating mock SSTable
        mockSSTable1.getData.mockReturnValue([ // Creating mock data from mock SSTable
            { key: '1', value: 'value1' },
            { key: '2', value: 'newerValue2' },
        ]);

        const mockSSTable2 = new SSTable(); // Creating mock SSTable
        mockSSTable2.getData.mockReturnValue([ // Creating mock data from mock SSTable
            { key: '2', value: 'value2' },
            { key: '3', value: 'value3' },
        ]);

        // Setting up level, mockSSTable2 is the older data
        level.sstables = [mockSSTable1, mockSSTable2];
        level.sstableCount = 2;

        // Calling compact method
        const compactedData = level.compact();
        expect(compactedData).toEqual([
            { key: '1', value: 'value1' },
            { key: '3', value: 'value3' },
            { key: '2', value: 'newerValue2' },
        ]);
    });

});