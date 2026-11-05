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