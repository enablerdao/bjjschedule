#!/bin/bash

# Set the port for the development server
export PORT=12000

# Start the Next.js development server
npm run dev -- -p $PORT -H 0.0.0.0