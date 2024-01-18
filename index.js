const http = require("http");
const fs = require("fs");
const url = require("url");

const myServer = http.createServer((req, res) => {
  if (req.url === "/favicon.io") return res.end();

  const log = `${Date.now()}: ${req.method} ${req.url} New Request Received\n`;

  const myUrl = url.parse(req.url, true);
  console.log(myUrl);

  fs.appendFile("log.txt", log, (err, data) => {
    switch (myUrl.pathname) {
      case "/":
        if (req.method === "GET") res.end("HomePage");
        break;
      case "/about":
        const username = myUrl.query.myname;
        res.end(`Hi, ${username}`);
        break;
      case "/contact":
        res.end("Contact page hai vro");
        break;
      case "/signup":
        if (req.method === "GET") res.end("THis is a Signup Form");
        else if (req.method === "POST") {
          //Send info to DB
          res.end("Success");
        }
      default:
        res.end("Sexy bhai !!");
    }
    if (err) {
      console.error("Error writing to log file:", err);
    }
  });

  console.log("New Request Received");
});

myServer.listen(8000, () => console.log("Server Started"));
