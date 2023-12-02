const fs = require("fs");
const path = require("path");
const express = require("express");

const artists = getJSONData("artists.json");
const galleries = getJSONData("galleries.json");

const app = express();

app.get("/api/artists", (req, resp) => {
  resp.json(artists);
});

app.get("/api/artists/:country", (req, resp) => {
  const foundArtists = artists.filter(
    (artist) =>
      artist.Nationality.toLowerCase() == req.params.country.toLowerCase()
  );
  resp.json(foundArtists);
});

app.get("/api/galleries", (req, resp) => {
  resp.json(galleries);
});

app.get("/api/galleries/:country", (req, resp) => {
  const foundArtists = galleries.filter(
    (gallery) =>
      gallery.GalleryCountry.toLowerCase() == req.params.country.toLowerCase()
  );
  resp.json(foundArtists);
});

const port = 8080;
app.listen(port, () => {
  console.log("Running on port: " + port);
});

function getJSONData(filename) {
  const pathToFile = path.join(__dirname, "data", filename);
  const fileContent = fs.readFileSync(pathToFile, "utf8");
  return JSON.parse(fileContent);
}
