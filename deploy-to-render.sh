#!/bin/bash

# Load environment variables from .env file
if [ -f .env ]; then
  export $(grep -v '^#' .env | xargs)
fi

# Check if RENDER_API_KEY is set
if [ -z "$RENDER_API_KEY" ]; then
  echo "Error: RENDER_API_KEY is not set in .env file"
  exit 1
fi

# Deploy to Render using Blueprint
echo "Deploying to Render using Blueprint..."
curl -X POST \
  "https://api.render.com/v1/blueprints/deploy" \
  -H "Authorization: Bearer $RENDER_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "repo": "https://github.com/yourusername/bjj-schedule-app",
    "branch": "main",
    "renderYamlPath": "render.yaml"
  }'

echo "Deployment initiated. Check your Render dashboard for progress."
echo "Visit: https://dashboard.render.com/"