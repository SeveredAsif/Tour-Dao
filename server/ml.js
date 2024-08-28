/*const { spawn } = require('child_process');

// Example of using spawn to run a Python script
const pythonProcess = spawn('python', ['travel-Recommendation.py','Kovalam Beach']);

pythonProcess.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
});

pythonProcess.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
});

pythonProcess.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
});*/

const user_input = JSON.stringify({
    'stops': 1,
    'class': 1,
    'days_left': 15,
    'airline': 'AirAsia',
    'source_city': 'Delhi',
    'destination_city': 'Bangalore'
});

const { spawn } = require('child_process');

// Example of using spawn to run a Python script
const pythonProcess = spawn('python', ['flightPricePrediction.py',user_input]);

pythonProcess.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
});

pythonProcess.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
});

pythonProcess.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
});
