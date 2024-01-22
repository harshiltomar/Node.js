const { default: ShortUniqueId } = require("short-unique-id");
const URL = require("../models/url.models");

async function handleGenerateNewShortURL(req, res) {
  const body = req.body;
  if (!body.url) return res.status(400).json({ error: "url is required" });

  const { randomUUID } = new ShortUniqueId({ length: 10 });
  const generatedShortId = randomUUID();

  await URL.create({
    shortId: generatedShortId,
    redirectURL: body.url,
    visitHistory: [],
  });

  return res.render("home", {
    id: generatedShortId,
  });
}

async function handleGetAnalytics(req, res) {
  const shortId = req.params.shortId;
  const result = await URL.findOne({ shortId });

  return res.json({
    totalClicks: result.visitHistory.length,
    analytics: result.visitHistory,
  });
}

module.exports = {
  handleGenerateNewShortURL,
  handleGetAnalytics,
};
