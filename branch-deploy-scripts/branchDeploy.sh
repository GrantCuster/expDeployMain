#!/bin/bash
dir=$(pwd)
echo $dir
# runs through npm, root directory is one above
# get branch name
branch=$(git branch | sed -n -e 's/^\* \(.*\)/\1/p')
# backup package json
cp package.json package-original.json
# node script to rename homepage field
node branch-deploy-scripts/packageRename.js $branch
node branch-deploy-scripts/addDeployListing.js $branch
# build with new homepage field
npm run build
# clear out old branch
rm -rf ../expDeployBranches/$branch
# move new branch to destination
mv build ../expDeployBranches/$branch
# remove edited package json
rm package.json
# restore original package json
mv package-original.json package.json

# add commit use branch name in commit push
cd ../expDeployBranches
git add .
git commit -am "deploy $branch"
git push origin main
