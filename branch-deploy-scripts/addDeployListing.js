"use strict";

const fs = require("fs");

const data = JSON.parse(
  fs.readFileSync("../expDeployBranches/deployListing.json")
);

let branch = process.argv[2];

let names = data.branches.map((b) => b.name);
let checkOld = names.indexOf(branch);
if (checkOld > -1) {
  data.branches.splice(checkOld, 1);
}

data.branches.unshift({
  url: "https://grantcuster.github.io/branches/" + branch,
  name: process.argv[2],
  date: new Date().toJSON(),
});

fs.writeFileSync(
  "../expDeployBranches/deployListing.json",
  JSON.stringify(data, null, 4)
);
