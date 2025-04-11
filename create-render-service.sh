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

# Create a new web service on Render
echo "Creating new web service on Render..."
curl -X POST \
  "https://api.render.com/v1/services" \
  -H "Authorization: Bearer $RENDER_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "type": "web_service",
    "name": "bjj-schedule-app",
    "env": "node",
    "region": "oregon",
    "branch": "main",
    "repo": "https://github.com/yourusername/bjj-schedule-app",
    "autoDeploy": true,
    "buildCommand": "npm install && npm run build",
    "startCommand": "npm start",
    "envVars": [
      {
        "key": "NODE_ENV",
        "value": "production"
      },
      {
        "key": "NEXT_PUBLIC_SUPABASE_URL",
        "value": "'"$NEXT_PUBLIC_SUPABASE_URL"'"
      },
      {
        "key": "NEXT_PUBLIC_SUPABASE_ANON_KEY",
        "value": "'"$NEXT_PUBLIC_SUPABASE_ANON_KEY"'"
      },
      {
        "key": "NEXT_PUBLIC_GOOGLE_MAPS_API_KEY",
        "value": "'"$NEXT_PUBLIC_GOOGLE_MAPS_API_KEY"'"
      }
    ]
  }'

echo "Service creation initiated. Check your Render dashboard for progress."
echo "Visit: https://dashboard.render.com/"