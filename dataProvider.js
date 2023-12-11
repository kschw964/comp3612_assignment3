const fs = require("fs");
const path = require("path");

function getJSONData(filename) {
  const pathToFile = path.join(__dirname, "data", filename);
  const fileContent = fs.readFileSync(pathToFile, "utf8");
  return JSON.parse(fileContent);
}

const artists = getJSONData("artists.json");
const galleries = getJSONData("galleries.json");
const paintings = getJSONData("paintings-nested.json");

module.exports = { artists, galleries, paintings };
