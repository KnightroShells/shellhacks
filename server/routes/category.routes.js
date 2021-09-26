const express = require("express");
const router = express.Router();
const sequelize = require("../middleware/conn");
const Article = require("../models/article.model");
const User = require("../models/user.model");
const Category = require("../models/category.model");

// Get Articles
router.get("/", async (req, res) => {
    const categories = await fetchCategories();
    res.send(await categories);
});

// Add Article
router.post("/", async (req, res) => {
    let category = await Category.create({
      name: req.body.name
     });
    res.status(201).send();
});

// Delete Article
router.delete("/:id", async (req, res) => {
  let category = await Category.destroy({
    where: { 
      categoryId: req.params.id
    }
  });
  res.status(201).send();
});

async function fetchCategories() {
    let categories = Category.findAll();
    return categories;
}

module.exports = router;
