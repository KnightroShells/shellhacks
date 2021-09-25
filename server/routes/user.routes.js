const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');
const sequelize = require("../middleware/conn");
const Article = require("../models/article.model");
const User = require("../models/user.model");

// Register
router.post("/register", async (req, res) => {
  const {email, password} = req.body;

  if(!email || !password)
    return res.status(400).json({error: "Empty field in form input."})

  if(email.length < 5 || email.length > 255)
    return res.status(400).json({error: "Invalid email address."})

    if(password.length < 6 || email.length > 40)
      return res.status(400).json({error: "Password must be between 6 and 40 characters."})

  let exists = await User.findOne({ where: { email: email }})
  if(exists){
    res.status(409).json({error: "An account with this email already exists."}); // 409 = conflict error code
    return;
  }

  bcrypt.hash(password, 10).then(async (hash) => {
    let user = await User.create({
      email: email, 
      password: hash,
      interests: "",
     });
  });

  res.status(201).send();
});


module.exports = router;
