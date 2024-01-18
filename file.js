const fs = require("fs");

// Syncronouus Call
// fs.writeFileSync("./text.txt", "Hey There");

//fs.writeFile("./text.txt", "Hey There Async", (err) => {});

//Async... Non Blocking
fs.readFile("./contacts.txt", "utf-8", (err, result) => {
  if (err) {
    console.log("Error", err);
  } else {
    console.log(result);
  }
});

//Sync... Blocking
fs.appendFileSync("./test.txt", new Date().getDate().toLocaleString());
