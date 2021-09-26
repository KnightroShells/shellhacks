const express = require("express");
const router = express.Router();
const axios = require('axios');
const sequelize = require("../middleware/conn");
const Article = require("../models/article.model");
const User = require("../models/user.model");
const Category = require("../models/category.model");

const gets = (url) => new Promise((resolve, reject) => {
 })
 
router.get("/external/:search", async (req, res) => {
  axios.get("https://newsapi.org/v2/everything?language=en&from=2021-08-26&sortBy=publishedAt&pageSize=5&domains=mashed.com,infoworld.com,cnet.com,techrepublic.com,techradar.com,google.com&apiKey=c9eab267662242e8843b21e804bb2596&q=" + req.params.search)
  .then(response => {
    res.status(200).json(response.data)
  })
  .catch(err => {
    console.log(err)
  })
})

// Get Articles
router.get("/", async (req, res) => {
    const articles = await Article.findAll();
    res.send(articles);
});

// Get Articles
router.get("/:category", async (req, res) => {
  const articles = await Article.findAll({
    where:{
      category: req.params.category
    }
  });
  res.send(articles);
});

// Add Article
router.post("/", async (req, res) => {
    let article = await Article.create({
      title: req.body.title, 
      description: req.body.description, 
      categories: req.body.categories, 
      link: req.body.link
     });
    res.status(201).send();
});

// Delete Article
router.delete("/:id", async (req, res) => {
  let article = await Article.destroy({
    where: { 
      articleId: req.params.id
    }
  });
  res.status(201).send();
});

module.exports = router;
