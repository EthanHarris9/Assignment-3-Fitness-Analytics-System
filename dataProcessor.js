// Loading environment variables and workoutReader and healthReader functions
require('dotenv').config();

const path = require('path');
const { processWorkoutFile } = require('./workoutReader');
const { readHealthFile } = require('./healthReader.js');

// New function to call both health and workout functions and display data
async function main() {
    try {
        const userName = process.env.USER_NAME;
        const weeklyGoal = Number(process.env.WEEKLY_GOAL)

        const workoutData = await processWorkoutFile('./data/workouts.csv');
        const healthData = await readHealthFile('./data/health-metrics.json');

        // Display username value from .env
        console.log(`Welcome, processing data for: ${userName}` );

        // Display workout data summary
        if (workoutData !== null) {
            console.log('\n--- Workout Summary ---');
            console.log('Total Workouts:', workoutData.totalWorkouts);
            console.log('Total Workout Minutes:', workoutData.totalMinutes);
        }

        // Display health data summary
        if (healthData !== null) {
            console.log('\n--- Health Summary ---');
            console.log('Total Health Entries:', healthData.metrics.length);
        }

        // Display weekly goal value from .env and check if it was reached
        if (workoutData !== null) {
            console.log('\n--- Weekly Goal ---');
            console.log(`Weekly Goal: ${weeklyGoal} minutes`);

            if (workoutData.totalMinutes >= weeklyGoal) {
                console.log('Congratulations! You have met your weekly workout goal!');
            } else {
                console.log('You have not met your weekly workout goal yet.');
                console.log('Minutes remaining:', weeklyGoal - workoutData.totalMinutes);
            }
        }

    // Handle errors
    } catch (error) {
        console.log('Somthing went wrong when trying to run the program:', error.message);
    }
}

// Run the main program
main();

