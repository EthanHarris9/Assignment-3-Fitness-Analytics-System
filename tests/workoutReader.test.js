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

const emptyCsvData = `date,exercise,duration,calories`;

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