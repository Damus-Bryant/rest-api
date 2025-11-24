// middleware/cors.js
const allowedOrigins = (process.env.CORS_ORIGINS || "")
  .split(",")
  .map(o => o.trim())
  .filter(Boolean);

// CORS + Pre-flight middleware
function corsHandler(req, res, next) {
  const origin = req.headers.origin;

  // Always set headers for methods + allowed headers
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type,Authorization");

  // Only echo back origin if it's allowed
  if (origin && allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
    res.header("Vary", "Origin");
  }

  // Handle pre-flight OPTIONS requests here
  if (req.method === "OPTIONS") {
    // SUCCESS case: allowed origin
    if (origin && allowedOrigins.includes(origin)) {
      return res.sendStatus(204); // No Content
    }
    // FAILURE case: disallowed origin (for screenshots)
    return res.sendStatus(403);
  }

  next();
}

module.exports = { corsHandler, allowedOrigins };
