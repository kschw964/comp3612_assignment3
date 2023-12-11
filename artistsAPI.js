const handleError = require("./errorHandler.js");

function handleAll(app, artists) {
  app.get("/api/artists", (req, resp) => {
    resp.json(artists);
  });
}

function handleArtistsFromCountry(app, artists) {
  app.get("/api/artists/:country", (req, resp) => {
    const foundArtists = artists.filter(
      (artist) =>
        artist.Nationality.toLowerCase() == req.params.country.toLowerCase()
    );
    if (foundArtists.length) resp.json(foundArtists);
    else handleError(resp, "No artists from " + req.params.country + " found");
  });
}

module.exports = { handleAll, handleArtistsFromCountry };
