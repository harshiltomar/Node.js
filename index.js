const express = require("express");
const users = require("./MOCK_DATA.json");
const fs = require("fs");

const app = express();
const PORT = 8000;

// Middleware- Plugin
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  fs.appendFile(
    "log.txt",
    `\n${Date.now()}:${req.ip} ${req.method}: ${req.path}\n`,
    (err, data) => {
      next();
    }
  );
});

// Routes Define
app.get("/users", (req, res) => {
  const html = `
    <ul>${users.map((user) => `<li>${user.first_name}</li>`).join("")}</ul>`;
  res.send(html);
});

// REST API
app.get("/api/users", (req, res) => {
  return res.json(users);
});

app
  .route("/api/users/:id")
  .get((req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    return res.json(user);
  })
  .patch((req, res) => {
    // TODO: Edit a User with id
    const id = Number(req.params.id);
    const userIndex = users.findIndex((user) => user.id === id);

    if (userIndex !== -1) {
      users[userIndex] = { ...users[userIndex], ...req.body };

      fs.writeFile("./MOCK_DATA.jsn", JSON.stringify(users), (err, data) => {
        return res.json({
          status: "successfully patched",
          updateUser: user[userIndex],
        });
      });
    }
  })
  .delete((req, res) => {
    // TODO: Delete a User with id
    const id = Number(req.params.id);
    const userIndex = users.findIndex((user) => user.id === id);

    if (userIndex !== -1) {
      const deleteUser = users.splice(userIndex, 1)[0];

      fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
        return res.json({ status: "successfull delete", deleteUser });
      });
    }
  });

app.post("/api/users", (req, res) => {
  // TODO: Create a new User

  const body = req.body;
  console.log("Body: ", body);
  users.push({ ...body, id: users.length + 1 });
  fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
    return res.json({ status: "success", id: users.length + 1 });
  });
});

app.listen(PORT, () => console.log(`Server Started at PORT: ${PORT}`));
