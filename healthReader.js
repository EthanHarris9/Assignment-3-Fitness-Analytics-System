const fs = require('fs/promises');

async function readHealthFile(filepath) {
    try {
        const data = await fs.readFile(filepath, 'utf8');
        const healthData = JSON.parse(data);

        console.log("Success! Found your health data!");
    
        console.log('Total Number of Health Entries:', healthData.metrics.length);

        return healthData;

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

readHealthFile('./data/health-metrics.json');