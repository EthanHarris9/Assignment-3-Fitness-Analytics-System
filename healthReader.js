const fs = require('fs/promises');

async function readHealthFile(filepath) {
    const data = await fs.readFile(filepath, 'utf8');
    const healthData = JSON.parse(data);

    console.log('Total Number of Health Entries:', healthData.metrics.length);
}

readHealthFile('./data/health-metrics.json');