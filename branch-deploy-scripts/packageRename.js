"use strict";

const fs = require("fs");

const data = JSON.parse(fs.readFileSync("package.json"));

data.homepage = "https://grantcuster.github.io/branches/" + process.argv[2];

fs.writeFileSync("package.json", JSON.stringify(data, null, 4));
