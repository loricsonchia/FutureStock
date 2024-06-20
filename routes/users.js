const express = require("express");
const router = express.Router();
const User = require("../models/user");

// All users routes
router.get("/", async (req, res) => {
  let searchOptions = {}; //store all search options
  if (req.query.name != null && req.query.name != "") {
    searchOptions.name = new RegExp(req.query.name, "i");
  }
  try {
    const users = await User.find(searchOptions);
    res.render("users/index", {
      users: users,
      searchOptions: req.query,
    });
  } catch (err) {
    //res.status(500).send("Error rendering users index");
    res.redirect("/");
  }
});

// Display new user form
router.get("/new", (req, res) => {
  res.render("users/new", { user: new User() });
});

// Create new user
router.post("/", async (req, res) => {
  const user = new User({
    name: req.body.name,
  });

  try {
    const newUser = await user.save();
    res.redirect("/users");
  } catch (err) {
    res.render("users/new", {
      user: user,
      errorMessage: "Error creating User",
    });
  }
});

module.exports = router;
