#!/usr/bin/env node

/**
 * This script deploys the application to Render using the Render API
 * It requires the RENDER_API_KEY environment variable to be set
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

// Load environment variables from .env file
require('dotenv').config();

// Check if RENDER_API_KEY is set
const RENDER_API_KEY = process.env.RENDER_API_KEY;
if (!RENDER_API_KEY) {
  console.error('Error: RENDER_API_KEY environment variable is not set');
  process.exit(1);
}

// Read the render.yaml file
const renderYamlPath = path.join(__dirname, '..', 'render.yaml');
if (!fs.existsSync(renderYamlPath)) {
  console.error('Error: render.yaml file not found');
  process.exit(1);
}

// Create options for the API request
const options = {
  hostname: 'api.render.com',
  port: 443,
  path: '/v1/blueprints',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${RENDER_API_KEY}`
  }
};

// Create the request
const req = https.request(options, (res) => {
  let data = '';
  
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    if (res.statusCode >= 200 && res.statusCode < 300) {
      console.log('Successfully deployed to Render!');
      console.log(JSON.parse(data));
    } else {
      console.error(`Error: ${res.statusCode}`);
      console.error(data);
    }
  });
});

// Handle errors
req.on('error', (error) => {
  console.error('Error:', error);
});

// Send the request with the render.yaml file content
const renderYaml = fs.readFileSync(renderYamlPath, 'utf8');
req.write(JSON.stringify({
  name: 'BJJ Schedule App',
  yaml: renderYaml
}));
req.end();

console.log('Deploying to Render...');