const handleError = require("./errorHandler.js");

function handleAll(app, paintings) {
  app.get("/api/paintings", (req, resp) => {
    resp.json(paintings);
  });
}

const paintingPath = "/api/painting";

function handlePaintingWithID(app, paintings) {
  app.get(paintingPath + "/:id", (req, resp) => {
    const foundPainting = paintings.find(
      (painting) => painting.paintingID == req.params.id
    );
    if (foundPainting) resp.json(foundPainting);
    else
      handleError(resp, "Not painting with the id " + req.params.id + " found");
  });
}

function handlePaintingsInGalleryWithID(app, paintings) {
  app.get(paintingPath + "/gallery/:id", (req, resp) => {
    const foundPaintings = paintings.filter(
      (painting) => painting.gallery.galleryID == req.params.id
    );
    if (foundPaintings.length) resp.json(foundPaintings);
    else
      handleError(
        resp,
        "No paintings from gallery with id " + req.params.id + " found"
      );
  });
}

function handlePaintingsFromArtistWithID(app, paintings) {
  app.get(paintingPath + "/artist/:id", (req, resp) => {
    const foundPaintings = paintings.filter(
      (painting) => painting.artist.artistID == req.params.id
    );
    if (foundPaintings.length) resp.json(foundPaintings);
    else
      handleError(
        resp,
        "No paintings from the artist with id " + req.params.id + " found"
      );
  });
}

function handlePaintingsWithinTimeperiod(app, paintings) {
  app.get(paintingPath + "/year/:min/:max", (req, resp) => {
    const foundPaintings = paintings.filter(
      (painting) =>
        painting.yearOfWork >= req.params.min &&
        painting.yearOfWork <= req.params.min
    );
    if (foundPaintings.length) resp.json(foundPaintings);
    else
      handleError(
        resp,
        "No paintings drawn between " +
          req.params.min +
          " and " +
          req.params.max +
          " found"
      );
  });
}

function handlePaintingsWithTitle(app, paintings) {
  app.get(paintingPath + "/title/:text", (req, resp) => {
    const foundPaintings = paintings.filter((painting) =>
      painting.title.includes(req.params.text)
    );
    if (foundPaintings.length) resp.json(foundPaintings);
    else
      handleError(
        resp,
        'No paintings with the title containing "' + req.params.text + '" found'
      );
  });
}

function handlePaintingsContainingColor(app, paintings) {
  app.get(paintingPath + "/color/:name", (req, resp) => {
    const foundPaintings = paintings.filter((painting) =>
      painting.details.annotation.dominantColors.find(
        (color) => color.name.toLowerCase() == req.params.name.toLowerCase()
      )
    );
    if (foundPaintings.length) resp.json(foundPaintings);
    else
      handleError(
        resp,
        "No paintings containing the color " + req.params.name + " found"
      );
  });
}

module.exports = {
  handleAll,
  handlePaintingWithID,
  handlePaintingsInGalleryWithID,
  handlePaintingsFromArtistWithID,
  handlePaintingsWithinTimeperiod,
  handlePaintingsWithTitle,
  handlePaintingsContainingColor,
};
