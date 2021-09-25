const express = require("express");
const router = express.Router();
const sequelize = require("../middleware/conn");
const Article = require("../models/article.model");
const User = require("../models/user.model");

// Get Articles
router.get("/", async (req, res) => {
    const articles = await fetchArticles();
    res.send(await articles);
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

async function fetchArticles() {
    let articles = Article.findAll();
    return articles;
}

module.exports = router;
