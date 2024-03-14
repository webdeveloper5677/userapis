const cluster = require('cluster');
const os = require('os');
import 'dotenv/config'

let numCPUs = os.cpus().length;
if (numCPUs > 6) {
    numCPUs = 6
}

if (cluster.isMaster) {
    console.log(`Master ${process.pid} is running`);

    // Fork workers
    for (let i = 0; i < numCPUs; i++) {
        const workerEnv = { ...process.env, PORT: `${process.env.PORT + i + 1}` };
        cluster.fork(workerEnv);
    }

    cluster.on('exit', (worker, code, signal) => {
        console.log(`Worker ${worker.process.pid} died`);
    });
} else {
    require('dotenv').config(); // Load environment variables
    require('./src/main'); // Assuming your main NestJS file is named main.ts or main.js
}
