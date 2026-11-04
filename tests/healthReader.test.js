// Creating the test file before the tests run
const path = require('path'); 
const fs = require('fs/promises'); 
const { readHealthFile } = require('../healthReader.js');

const TEST_FILE = path.join(__dirname, 'test-health.json'); // Creates a path to the file
const testData = {
    user: 'TestUser', 
    metrics: [
    { 
        date: 'Test date', 
        type: 'Test type', 
        duration: '10' 
    }], 
}; 

beforeAll(async () => { 
    await fs.writeFile(TEST_FILE, JSON.stringify(testData)); 
});

// Deleting the test file when the tests are done
afterAll(async () => {
    try {
        await fs.unlink(TEST_FILE);
    } catch {
        console.log('No file to delete')
    }
});

// The unit tests for the readHealthFile function
describe('readHealthFile', () => { 
    test('reads a valid JSON file and returns the expected data structure', async () => { 
          const result = await 
    readHealthFile(TEST_FILE); 
          expect(result).not.toBeNull(); // prevents .metrics from crashing 
          expect(result.user).toBe('TestUser');
          expect(result.metrics).toHaveLength(1); 
          expect(result.metrics[0].date).toBe('Test date'); 
    }); 

    test('returns null when the file is missing', async () => { 
         const result = await
    readHealthFile('missing.json'); 
          expect(result).toBeNull(); 
    }); 

    test('returns null when the file is invalid', async () => { 
        await fs.writeFile(TEST_FILE, '{ invalid json }');
         const result = await
    readHealthFile(TEST_FILE); 
          expect(result).toBeNull(); 
    }); 
});