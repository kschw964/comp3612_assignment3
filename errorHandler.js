function sendNotFoundResponse(resp, message) {
  resp.json({ error: "Requested item(s) not found", details: message });
}

module.exports = sendNotFoundResponse;
