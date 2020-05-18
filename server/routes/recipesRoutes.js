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

// GET /api/v1/recipes/latest
router.get("/latest", (req,res) => {
  dbRecipes
    .getLatestPublicRecipes()
    .then(latestRecipes => {
      res.json(latestRecipes)
    })
    .catch(err => {
      res.status(500).json({message: "Something is broken"});
    });
})

//GET /api/v1/recipes --- all public and user private
router.get("/", getTokenDecoder(false), (req, res) => {
  dbRecipes
    .getPublicRecipes()
    .then(publicRecipes => {
      if (req.user) {
        dbUserRecipes
          .getUserPrivateRecipes(req.user.id)
          .then(privateRecipes => {
            let recipes = publicRecipes.concat(privateRecipes);
            recipes = recipes.sort((recipeA, recipeB) => {
              return recipeB.title > recipeA.title ? -1 : 1;
            });
            console.log(recipes)
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
        const userIsAuthenticatedAndMatches =
          req.user && req.user.id == recipeDetail.user_id;
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
  let recipe = req.body;
  recipe.title = recipe.title.trim();
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
  newRecipe.title = newRecipe.title.trim()
  let ingredients = newRecipe.ingredients;
  delete newRecipe.ingredients; //delete ingredients column to prevent error "column "ingredients" of relation "recipes" does not exist"
  newRecipe.user_id = req.user.id;
  dbRecipes
    .addRecipe(newRecipe)
    .then(recipeDetails => {
      let newRecipeId = recipeDetails[0].id;
      if (ingredients == undefined || ingredients.length == 0) {
        res.json(recipeDetails[0]);
      } else {
        for (let i = 0; i < ingredients.length; i++) {
          ingredients[i].recipe_id = newRecipeId;
          ingredients[i].ingredient_id = ingredients[i].id;
          delete ingredients[i].id;
        }
        dbRecipesIngredients
          .addMultipleIngredientsToRecipe(ingredients)
          .then(newIngredients => {
            res.json({ ...recipeDetails[0], newIngredients });
          });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Something is broken" });
      console.log(err);
    });
});

module.exports = router;
