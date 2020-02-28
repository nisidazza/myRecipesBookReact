const express = require("express");
const router = express.Router();

const dbRecipesIngredients = require("../db/dbRecipesIngredients");

const { getTokenDecoder } = require("authenticare/server");

//GET - /api/v1/recipes-search

router.get("/match-all", getTokenDecoder(false), (req, res) => {
  let ingredient_ids_string = req.query.ingredient_ids;
  let ingredient_ids_strings = ingredient_ids_string.split(",");
  let ingredient_ids = ingredient_ids_strings.map(item => parseInt(item));
  dbRecipesIngredients
    .getRecipesMatchingAllIngredients(ingredient_ids, req.user ? req.user.id : -1)
    .then(recipes => res.json(recipes))
    .catch(err => {
      res.status(500).json({ message: "Something is broken" });
      console.log(err);
    });
});

router.get("/match", getTokenDecoder(false), (req, res) => {
  let ingredient_ids_string = req.query.ingredient_ids;
  let ingredient_ids_strings = ingredient_ids_string.split(",");
  let ingredient_ids = ingredient_ids_strings.map(item => parseInt(item));
  dbRecipesIngredients
    .getRecipesByIngredients(ingredient_ids, req.user ? req.user.id : -1)
    .then(recipes => {
      console.log(recipes)
      res.json(recipes)
    })
    .catch(err => {
      res.status(500).json({ message: "Something is broken" });
      console.log(err);
    });
});

module.exports = router;
