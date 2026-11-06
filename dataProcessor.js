require('dotenv').config();

const path = require('path');
const { processWorkoutFile } = require('../workoutReader');
const { readHealthFile } = require('../healthReader.js');
