#!/bin/bash

# Vue install script

set -e

echo "=== Vue Installation Script ==="

# Install Vue CLI globally
echo "Installing Vue CLI..."
npm install -g @vue/cli

# Create a new Vue project
echo "Creating a new Vue project..."
read -p "Enter project name (default: my-vue-app): " project_name
project_name=${project_name:-my-vue-app}

vue create "$project_name"

echo "=== Vue installation completed ==="
echo "To start developing, run:"
echo "  cd $project_name"
echo "  npm run serve"
