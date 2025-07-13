#!/bin/bash

# Deploy to Netlify
echo "🚀 Deploying to Netlify..."

# Check if netlify CLI is installed
if ! command -v netlify &> /dev/null; then
    echo "❌ Netlify CLI not found. Installing..."
    npm install -g netlify-cli
fi

# Login to Netlify (if not already logged in)
echo "🔐 Checking Netlify login status..."
netlify status

# Deploy to Netlify
echo "📦 Deploying to Netlify..."
netlify deploy --prod --dir=dist

echo "✅ Deployment complete!"
echo "🌐 Your app should be live at the URL shown above." 