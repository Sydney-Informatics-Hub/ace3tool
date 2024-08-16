#!/usr/bin/env bash
echo "Building site..."
pnpm build
echo "Removing docs/..."
rm -rf docs/
echo "Moving out/ to docs/..."
mv out/ docs/
touch docs/.nojekyll
echo "Done!"
