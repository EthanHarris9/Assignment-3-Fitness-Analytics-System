// Importing the workout functions and creating the test file before the tests run 
const path = require('path');
const fs = require('fs');
const { processWorkoutFile, readWorkoutData } = require('../workoutReader');

const TEST_CSV_FILE = path.join(__dirname, 'test-workout.csv');
// Create test CSV data
const testCsvData = `date,exercise,duration,calories
2024-01-15,Running,50,200
2024-01-16,Walking,20,100
2024-01-17,Swimming,30,150`;

beforeAll(async () => {
    // Create test files before running tests
    fs.writeFileSync(TEST_CSV_FILE, testCsvData);
});

afterAll(async () => {
    // Clean up test files after tests complete
    try {
        fs.unlinkSync(TEST_CSV_FILE);
    } catch {
        console.log('No file to delete')
    }
});

// The unit tests for the readWorkoutData and processWorkoutFile functions
describe('CSV Workout File Processing', () => { 
    test('reads and processes a valid CSV file', async () => { 
        const result = await 
    processWorkoutFile(TEST_CSV_FILE); 
        expect(result).not.toBeNull(); 
        expect(result.totalWorkouts).toBe(3); 
        expect(result.totalMinutes).toBe(100); 
  }); 

    test('readWorkoutData returns the correct data structure', async () => { 
        const data = await 
    readWorkoutData(TEST_CSV_FILE); 
        expect(Array.isArray(data)).toBe(true);
        expect(data).toHaveLength(3); 
        expect(data[0]).toHaveProperty('date'); 
        expect(data[0]).toHaveProperty('exercise'); 
        expect(data[0]).toHaveProperty('duration'); 
    }); 

    test('handles a missing csv file', async () => { 
        const result = await 
    processWorkoutFile('missing.csv'); 
        expect(result).toBeNull(); 
    });
});