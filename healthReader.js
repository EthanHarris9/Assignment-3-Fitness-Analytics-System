const fs = require('fs/promises');

// Function that reads the Health metrics JSON file and retuns the total number of entries.
async function readHealthFile(filepath) {
    try {
        const data = await fs.readFile(filepath, 'utf8');
        const healthData = JSON.parse(data);

        return healthData;

    // Error handling
    } catch(error) {
        if (error.code === 'ENOENT') {
            console.log('File not found - check the file path');
        } 
        else if (error.name === 'SyntaxError') {
            console.log('Invalid JSON! - check the file format');
        }
        else {
            console.log('Unknown error:', error.message);
        }
        return null;

    }
}

// Calling the function with the filepath
readHealthFile('./data/health-metrics.json');

// Export function for use in other files
module.exports = { readHealthFile }