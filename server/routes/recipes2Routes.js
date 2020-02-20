const express = require("express");
const router = express.Router();

const dbRecipes = require("../db/dbRecipes");

//GET - /api/v1/recipes2

router.get("/", (req, res) => {
  let ingredient_ids_string = req.query.ingredient_ids;
  let ingredient_ids_strings = ingredient_ids_string.split(",");
  let ingredient_ids = ingredient_ids_strings.map(item => parseInt(item));
  dbRecipes
    .getRecipesMatchingAllIngredients(ingredient_ids)
    .then(allRecipes => {
      let recipes = allRecipes;
      res.json(recipes);
    })
    .catch(err => {
      res.status(500).json({ message: "Something is broken" });
      console.log(err);
    });
});

module.exports = router;