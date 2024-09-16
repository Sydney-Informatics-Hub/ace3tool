#!/usr/bin/env bash
echo "Building site..."
pnpm build
echo "Move to docs/"
rm -rf docs/
mv out docs
echo "Add .nojekyll file"
touch docs/.nojekyll
echo "Done!"
