const handleError = require("./errorHandler.js");

function handleAll(app, galleries) {
  app.get("/api/galleries", (req, resp) => {
    resp.json(galleries);
  });
}

function handleGalleriesInCountry(app, galleries) {
  app.get("/api/galleries/:country", (req, resp) => {
    const foundGalleries = galleries.filter(
      (gallery) =>
        gallery.GalleryCountry.toLowerCase() == req.params.country.toLowerCase()
    );
    if (foundGalleries.length) resp.json(foundGalleries);
    else handleError(resp, "No galleries in " + req.params.country + " found");
  });
}

module.exports = { handleAll, handleGalleriesInCountry };
