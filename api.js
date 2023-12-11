const express = require("express");

const { artists, galleries, paintings } = require("./dataProvider.js");

const artistsAPI = require("./artistsAPI.js");

const app = express();

artistsAPI.handleAll(app, artists);
artistsAPI.handleArtistsFromCountry(app, artists);

app.get("/api/paintings", (req, resp) => {
  resp.json(paintings);
});

const paintingPath = "/api/painting";

app.get(paintingPath + "/:id", (req, resp) => {
  const foundPainting = paintings.find(
    (painting) => painting.paintingID == req.params.id
  );
  if (foundPainting) resp.json(foundPainting);
  else
    sendNotFoundResponse(
      resp,
      "Not painting with the id " + req.params.id + " found"
    );
});

app.get(paintingPath + "/gallery/:id", (req, resp) => {
  const foundPaintings = paintings.filter(
    (painting) => painting.gallery.galleryID == req.params.id
  );
  if (foundPaintings) resp.json(foundPaintings);
  else
    sendNotFoundResponse(
      resp,
      "No paintings from gallery with id " + req.params.id + " found"
    );
});

app.get(paintingPath + "/artist/:id", (req, resp) => {
  const foundPaintings = paintings.filter(
    (painting) => painting.artist.artistID == req.params.id
  );
  if (foundPaintings) resp.json(foundPaintings);
  else
    sendNotFoundResponse(
      resp,
      "No paintings from the artist with id " + req.params.id + " found"
    );
});

app.get(paintingPath + "year/:min/:max", (req, resp) => {
  const foundPaintings = paintings.filter(
    (painting) =>
      painting.yearOfWork >= req.params.min &&
      painting.yearOfWork <= req.params.min
  );
  if (foundPaintings) resp.json(foundPaintings);
  else
    sendNotFoundResponse(
      resp,
      "No paintings drawn between " +
        req.params.min +
        " and " +
        req.params.max +
        " found"
    );
});

app.get(paintingPath + "/title/:text", (req, resp) => {
  const foundPaintings = paintings.filter((painting) =>
    painting.title.contains(req.params.text)
  );
  if (foundPaintings) resp.json(foundPaintings);
  else
    sendNotFoundResponse(
      resp,
      'No paintings with the title containing "' + req.params.text + '" found'
    );
});

app.get(paintingPath + "/color/:name", (req, resp) => {
  const foundPaintings = paintings.filter((painting) =>
    painting.details.annotation.dominantColors.find(
      (color) => color.name.toLowerCase() == req.params.name.toLowerCase()
    )
  );
  if (foundPaintings) resp.json(foundPaintings);
  else
    sendNotFoundResponse(
      resp,
      "No paintings containing the color " + req.params.name + " found"
    );
});

const port = 8080;
app.listen(port, () => {
  console.log("Running on port: " + port);
});

function sendNotFoundResponse(resp, message) {
  resp.json({ error: "Requested item(s) not found", details: message });
}
