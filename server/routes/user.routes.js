const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authenticateToken = require('../middleware/auth')
const sequelize = require("../middleware/conn");
const Article = require("../models/article.model");
const User = require("../models/user.model");
const Category = require("../models/category.model");

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

  bcrypt.hash(password, 10)
    .then(async (hash) => {
      let user = await User.create({
        email: email, 
        password: hash,
        interests: "",
      });
    })
    .catch(error => {
      return res.status(500).json({error: error});
    });


  res.status(201).send();
});

// Login
router.post("/login", async (req, res) => {
   
  const {email, password} = req.body;

  if(!email || !password)
    return res.status(400).json({error: "Empty field in form input."})

    let user = await User.findOne({
      where: { email: email}
    });
    if(!user)
      return res.status(400).json({error: "Invalid email or password."});

    const validPassword = await bcrypt.compare(password, user.password);
    if(!validPassword)
      return res.status(400).json({error: "Invalid email or password."});
    
    const accessToken = jwt.sign(email, process.env.AUTH_TOKEN_SECRET);
    res.status(200).json({accessToken: accessToken});
});

router.put("/update-interests", authenticateToken, async (req, res) => {
  const {interests} = req.body;
  const interestsArray = interests.split(",");
  const categories = await Category.findAll();
  const categoryNames = categories.map(c => c.name);
  for(let i = 0; i < interestsArray.length; i++) {
    if(!categoryNames.includes(interestsArray[i]))
      return res.status(400).json({ error: "Invalid interest" });
  }
  User.update({interests: interests}, {
    where: {
      email: req.email
    }
  })

  res.status(200).send();
});

module.exports = router;
