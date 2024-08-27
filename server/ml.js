const { spawn } = require('child_process');

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
});
