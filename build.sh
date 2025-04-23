#!/bin/bash
echo "Installing dependencies..."
npm ci

echo "Building the project..."
npm run build

echo "Build completed successfully!" 