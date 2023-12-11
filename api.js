const express = require("express");

const { artists, galleries, paintings } = require("./dataProvider.js");

const artistsAPI = require("./artistsAPI.js");
const galleriesAPI = require("./galleriesAPI.js");
const paintingsAPI = require("./paintingsAPI.js");

const app = express();

artistsAPI.handleAll(app, artists);
artistsAPI.handleArtistsFromCountry(app, artists);

galleriesAPI.handleAll(app, galleries);
galleriesAPI.handleGalleriesInCountry(app, galleries);

paintingsAPI.handleAll(app, paintings);
paintingsAPI.handlePaintingWithID(app, paintings);
paintingsAPI.handlePaintingsInGalleryWithID(app, paintings);
paintingsAPI.handlePaintingsFromArtistWithID(app, paintings);
paintingsAPI.handlePaintingsWithinTimeperiod(app, paintings);
paintingsAPI.handlePaintingsWithTitle(app, paintings);
paintingsAPI.handlePaintingsContainingColor(app, paintings);

const port = 8080;
app.listen(port, () => {
  console.log("Running on port: " + port);
});
