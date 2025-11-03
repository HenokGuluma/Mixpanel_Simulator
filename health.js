// Combined server that runs both health check and simulator
const http = require('http');
const { spawn } = require('child_process');

// Start simulator as child process
console.log('Starting Mixpanel simulator...');
const simulator = spawn('node', ['simulator.js'], {
  stdio: 'inherit',
  detached: true
});

simulator.unref(); // Allow simulator to run independently

// Health check server
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ 
    status: 'ok', 
    message: 'Mixpanel Simulator is running',
    timestamp: new Date().toISOString()
  }));
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, '0.0.0.0', () => {
  console.log(`Health check server running on port ${PORT}`);
});