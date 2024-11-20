import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { networkInterfaces } from 'os';
import network from 'network';
import speedTest from 'speedtest-net';
import netUtils from 'node-os-utils';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
  }
});

// Network monitoring state
let networkInfo = {
  type: null,
  interfaces: [],
  speed: { download: 0, upload: 0 },
  latency: 0,
  packetLoss: 0,
};

// Security monitoring state
let securityState = {
  firewallActive: true,
  sslCertificates: [],
  alerts: [],
  intrusions: [],
};

// Get network type and interfaces
async function updateNetworkInfo() {
  try {
    // Get active network interface
    network.get_active_interface((err, activeInterface) => {
      if (err) return;
      networkInfo.type = activeInterface.type;
      networkInfo.interfaces = [activeInterface];
    });

    // Get all network interfaces
    const interfaces = networkInterfaces();
    networkInfo.interfaces = Object.keys(interfaces).map(name => ({
      name,
      addresses: interfaces[name]
    }));
  } catch (error) {
    console.error('Error updating network info:', error);
  }
}

// Monitor network speed and performance
async function monitorNetworkPerformance() {
  try {
    // Network speed test (run every 5 minutes)
    const speed = await speedTest({ maxTime: 5000 });
    networkInfo.speed = {
      download: speed.download.bandwidth,
      upload: speed.upload.bandwidth
    };
    
    // Latency monitoring
    networkInfo.latency = speed.ping.latency;

    // Simulate packet loss (in a real app, you'd measure this)
    networkInfo.packetLoss = Math.random() * 0.5;

    io.emit('networkUpdate', networkInfo);
  } catch (error) {
    console.error('Error monitoring network:', error);
  }
}

// Security monitoring
function monitorSecurity() {
  // Simulate security events
  const threats = ['Port Scan', 'Unusual Traffic', 'Authentication Failure'];
  const severities = ['low', 'medium', 'high'];

  if (Math.random() < 0.1) { // 10% chance of new alert
    const alert = {
      id: Date.now().toString(),
      type: severities[Math.floor(Math.random() * severities.length)],
      message: `${threats[Math.floor(Math.random() * threats.length)]} detected`,
      timestamp: new Date()
    };

    securityState.alerts.unshift(alert);
    securityState.alerts = securityState.alerts.slice(0, 10); // Keep last 10 alerts
    io.emit('securityUpdate', securityState);
  }
}

// WebSocket connection handling
io.on('connection', (socket) => {
  console.log('Client connected');

  // Send initial state
  socket.emit('networkUpdate', networkInfo);
  socket.emit('securityUpdate', securityState);

  // Handle firewall toggle
  socket.on('toggleFirewall', (active) => {
    securityState.firewallActive = active;
    io.emit('securityUpdate', securityState);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

// Start monitoring loops
setInterval(updateNetworkInfo, 5000);
setInterval(monitorNetworkPerformance, 300000); // Every 5 minutes
setInterval(monitorSecurity, 10000);

// Initial setup
updateNetworkInfo();

const PORT = 3000;
httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});