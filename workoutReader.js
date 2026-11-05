// Reading the csv workouts file using csv-parser
const fs = require('fs');
const csv = require('csv-parser');

async function readWorkoutData(filepath) {
    return new Promise((resolve, reject) => {
        const results = [];
        
        fs.createReadStream(filepath)
            .pipe(csv())
            .on('data', (row) => {
                results.push(row);
            })
            .on('end', () => {
                resolve(results);
            })
            .on('error', (error) => {
                reject(error);
            });
    });
}

// Function to count the total number of workouts and calculates total workout minutes
async function processWorkoutFile(filepath) {
    try {
        const workoutData = await readWorkoutData(filepath); 
        let totalWorkouts = workoutData.length; 
        let totalMinutes = 0; 
        for (let i = 0; i < workoutData.length; i++) { 

            const workout = workoutData[i]; 
            totalMinutes += parseFloat(workout.duration); 
    }
        console.log('Total Workouts:', totalWorkouts)
        console.log('Total Minutes:', totalMinutes)

        return { totalWorkouts, totalMinutes };

    // Error Handling
    } catch(error) {
        if (error.code === 'ENOENT') {
            console.log('CSV file not found - check the file path');
        } else {
            console.log('Error processing CSV file:', error.message);
        }
        return null
    }
}

// Calling the function with the filepath
processWorkoutFile('./data/workouts.csv');

// Export functions for use in other files
module.exports = { readWorkoutData, processWorkoutFile }