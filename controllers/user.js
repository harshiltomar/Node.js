const User = require("../models/user.model");

async function handleGetAllUsers(req, res) {
  const allDbUsers = await User.find({});
  return res.json(allDbUsers);
}

async function handlegetUserById(req, res) {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ error: "user not found" });
  return res.json(user);
}

async function handleUpdateUserById(req, res) {
  // TODO: Edit a User with id
  await User.findByIdAndUpdate(req.params.id, { lastName: "Changes" });
  return res.json({ status: "Pending" });
}

async function handleDeleteUserById(req, res) {
  // TODO: Delete a User with id
  const id = Number(req.params.id);
  const userIndex = users.findIndex((user) => user.id === id);

  if (userIndex !== -1) {
    const deleteUser = users.splice(userIndex, 1)[0];

    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
      return res.json({ status: "successfull delete", deleteUser });
    });
  }
}

async function handleCreateNewUser(req, res) {
  //CREATE NEW USER
  const body = req.body;
  if (
    !body ||
    !body.first_name ||
    !body.last_name ||
    !body.email ||
    !body.email ||
    !body.job_title
  ) {
    return res.status(400).json({ msg: "All feilds are req..." });
  }

  const result = await User.create({
    firstName: body.first_name,
    lastName: body.last_name,
    email: body.email,
    gender: body.gender,
    jobTitle: body.job_title,
  });

  console.log("result", result);

  return res.status(201).json({ msg: "success" });
}

module.exports = {
  handleGetAllUsers,
  handlegetUserById,
  handleUpdateUserById,
  handleDeleteUserById,
  handleCreateNewUser,
};
