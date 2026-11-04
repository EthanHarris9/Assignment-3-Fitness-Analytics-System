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

afterAll(async () => {
    try {
        await fs.unlink(TEST_FILE);
    } catch {
        console.log('No file to delete')
    }
});