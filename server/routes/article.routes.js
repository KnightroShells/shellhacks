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
    console.log(sequelize);
    let article = await sequelize.models.article.create({
      title: req.body.title, 
      description: req.body.description, 
      categories: req.body.categories, 
      link: req.body.link
     });
    res.status(201).send();
});

// Delete Article
router.delete("/:id", async (req, res) => {
  console.log(sequelize);
  let article = await sequelize.models.article.destroy({
    where: { 
      articleId: req.params.id
    }
  });
  res.status(201).send();
});

async function fetchArticles() {
    let articles = await sequelize.models.article.findAll();
    articles.forEach(article => console.log(article.title));
    return articles;
}

module.exports = router;
