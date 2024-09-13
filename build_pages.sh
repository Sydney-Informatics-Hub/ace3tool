#!/usr/bin/env bash
echo "Building site..."
pnpm build
echo "Add .nojekyll file"
touch docs/.nojekyll
echo "Done!"
