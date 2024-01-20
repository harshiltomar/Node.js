const fs = require("fs");

function logReqRes(filename) {
  return (req, res, next) => {
    fs.appendFile(
      "log.txt",
      `\n${Date.now()}:${req.ip} ${req.method}: ${req.path}\n`,
      (err, data) => {
        next();
      }
    );
  };
}

module.exports = { logReqRes };
