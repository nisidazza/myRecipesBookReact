const express = require("express");
const router = express.Router();

const dbRecipes = require("../db/dbRecipes");
const dbUserRecipes = require("../db/dbUsersRecipes");
const dbRecipesIngredients = require("../db/dbRecipesIngredients");

const { getTokenDecoder } = require("authenticare/server");

// GET /api/v1/recipes/public
router.get("/public", (req, res) => {
  dbRecipes
    .getPublicRecipes()
    .then(publicRecipes => {
      res.json(publicRecipes);
    })
    .catch(err => {
      res.status(500).json({ message: "Something is broken" });
      console.log(err);
    });
});

//GET /api/v1/recipes --- all public and user private
router.get("/", getTokenDecoder(false), (req, res) => {
  dbRecipes
    .getPublicRecipes()
    .then(publicRecipes => {
      if (req.user) {
        dbUserRecipes
          .getUserPrivateRecipes(req.user.id)
          .then(privateRecipes => {
            const recipes = publicRecipes.concat(privateRecipes);
            res.json(recipes);
          });
      } else {
        res.json(publicRecipes);
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Something is broken" });
      console.log(err);
    });
});

router.get("/private", getTokenDecoder(), (req, res) => {
  const loggedUserId = req.user.id;
  dbUserRecipes
    .getUserPrivateRecipes(loggedUserId)
    .then(privateRecipes => {
      res.json(privateRecipes);
    })
    .catch(err => {
      res.status(500).json({ message: "Something is broken" });
      console.log(err);
    });
});

// GET /api/v1/recipes/:id
router.get("/:id", getTokenDecoder(false), (req, res) => {
  const { id } = req.params;
  dbRecipes
    .getRecipe(id)
    .then(recipeDetail => {
      if (recipeDetail) {
        const userIsAuthenticatedAndMatches = req.user && req.user.id == id;
        if (recipeDetail.is_public || userIsAuthenticatedAndMatches) {
          dbRecipesIngredients.getIngredients(id).then(ingredients => {
            res.json({ ...recipeDetail, ingredients });
          });
        }
      } else {
        res.sendStatus(404);
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Something is broken" });
      console.log(err);
    });
});

// DELETE /api/v1/recipes/:id
router.delete("/:id", getTokenDecoder(), (req, res) => {
  const { id } = req.params;
  const loggedUserId = req.user.id;
  dbRecipes
    .getRecipe(id)
    .then(recipe => {
      if (recipe) {
        if (loggedUserId === recipe.user_id) {
          dbRecipes.deleteRecipe(id).then(hasBeenDeleted => {
            if (hasBeenDeleted) {
              res.sendStatus(204);
            } else {
              res.sendStatus(404);
            }
          });
        } else {
          console.log(
            `user ${req.user.username} cannot delete recipe ${recipe.title} `
          );
          res.sendStatus(403);
        }
      } else {
        res.sendStatus(404);
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Something is broken" });
      console.log(err);
    });
});

router.patch("/:id", getTokenDecoder(), (req, res) => {
  const { id } = req.params;
  const recipe = req.body;
  const loggedUser = req.user.id;
  if (loggedUser === recipe.user_id) {
    //console.log('username:', req.user.username)
    dbRecipes
      .editRecipe(id, recipe)
      .then(({ hasBeenUpdated, newRecipe }) => {
        if (hasBeenUpdated) {
          res.status(200).json(newRecipe);
        } else {
          res.sendStatus(404);
        }
      })
      .catch(err => {
        res.status(500).json({ message: "Something is broken" });
        console.log(err);
      });
  } else {
    console.log(
      `user ${req.user.username} cannot edit recipe ${recipe.title} `
    );
    res.sendStatus(403);
  }
});

router.post("/", getTokenDecoder(), (req, res) => {
  let newRecipe = req.body;
  newRecipe.user_id = req.user.id,

  dbRecipes
    .addRecipe(newRecipe)
    .then(res.sendStatus(200))
    // dbRecipesIngredients
    //   .addIngredientToRecipe(newRecipeId, ingredient_id, quantity)
    //   .then(ingredients => {
    //     res.json({ ...newRecipe, ingredients });
    //   });
    .catch(err => {
      res.status(500).json({ message: "Something is broken" });
      console.log(err);
    });
});

module.exports = router;
