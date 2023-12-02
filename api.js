const fs = require("fs");
const path = require("path");
const express = require("express");

const artists = getJSONData("artists.json");
const galleries = getJSONData("galleries.json");
const paintings = getJSONData("paintings-nested.json");

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
  const foundGalleries = galleries.filter(
    (gallery) =>
      gallery.GalleryCountry.toLowerCase() == req.params.country.toLowerCase()
  );
  resp.json(foundGalleries);
});

app.get("/api/paintings", (req, resp) => {
  resp.json(paintings);
});

const paintingPath = "/api/painting";

app.get(paintingPath + "/:id", (req, resp) => {
  const foundPainting = paintings.find(
    (painting) => painting.paintingID == req.params.id
  );
  resp.json(foundPainting);
});

app.get(paintingPath + "/gallery/:id", (req, resp) => {
  const foundPaintings = paintings.filter(
    (painting) => painting.gallery.galleryID == req.params.id
  );
  resp.json(foundPaintings);
});

app.get(paintingPath + "/artist/:id", (req, resp) => {
  const foundPaintings = paintings.filter(
    (painting) => painting.artist.artistID == req.params.id
  );
  resp.json(foundPaintings);
});

app.get(paintingPath + "year/:min/:max", (req, resp) => {
  const foundPaintings = paintings.filter(
    (painting) =>
      painting.yearOfWork >= req.params.min &&
      painting.yearOfWork <= req.params.min
  );
  resp.json(foundPaintings);
});

app.get(paintingPath + "/title/:text", (req, resp) => {
  const foundPaintings = paintings.filter((painting) =>
    painting.title.contains(req.params.text)
  );
  resp.json(foundPaintings);
});

app.get(paintingPath + "/color/:name", (req, resp) => {
  const foundPaintings = paintings.filter((painting) =>
    painting.details.annotation.dominantColors.find(
      (color) => color.name.toLowerCase() == req.params.name.toLowerCase()
    )
  );
  resp.json(foundPaintings);
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
