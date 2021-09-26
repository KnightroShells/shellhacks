const express = require("express");
const router = express.Router();
const sequelize = require("../middleware/conn");
const Article = require("../models/article.model");
const User = require("../models/user.model");
const Category = require("../models/category.model");

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
