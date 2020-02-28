const connection = require("./connection");

function addIngredientToRecipe(
  recipe_id,
  ingredient_id,
  quantity,
  db = connection
) {
  return db("recipes_ingredients")
    .where("recipe_id", recipe_id)
    .where("ingredient_id", ingredient_id)
    .select()
    .then(rows => {
      if (rows.length == 0) {
        return db("recipes_ingredients").insert({
          recipe_id,
          ingredient_id,
          quantity
        });
      } else {
        throw new Error("INGREDIENT_CONFLICT");
      }
    });
}

function deleteIngredientFromRecipe(recipe_id, ingredient_id, db = connection) {
  return db("recipes_ingredients")
    .where("recipe_id", recipe_id)
    .where("ingredient_id", ingredient_id)
    .delete();
}

function getIngredients(id, db = connection) {
  return db
    .select(
      "recipes_ingredients.ingredient_id AS id",
      "ingredients.name",
      "recipes_ingredients.quantity"
    )
    .from("recipes")
    .innerJoin(
      "recipes_ingredients",
      "recipes_ingredients.recipe_id",
      "recipes.id"
    )
    .innerJoin(
      "ingredients",
      "recipes_ingredients.ingredient_id",
      "ingredients.id"
    )
    .where("recipes.id", id);
}

function getIngredientInRecipe(recipeId, ingredientId, db = connection) {
  return db
    .select(
      "recipes_ingredients.ingredient_id AS id",
      "recipes_ingredients.recipe_id",
      "ingredients.name",
      "recipes_ingredients.quantity"
    )
    .from("ingredients")
    .innerJoin(
      "recipes_ingredients",
      "recipes_ingredients.ingredient_id",
      "ingredients.id"
    )
    .where("recipes_ingredients.recipe_id", recipeId)
    .where("ingredients.id", ingredientId);
}

function getRecipesMatchingAllIngredients(
  ingredient_ids,
  user_id = -1,
  number_of_ingredients_to_skip = 0,
  db = connection
) {
  return db("recipes_ingredients")
    .select("recipe_id")
    .groupBy("recipe_id")
    .havingRaw(
      "sum(case when ingredient_id in (" +
        ingredient_ids.map(_ => "?").join(",") +
        ") then 1 else 0 end) <= count(*) AND " +
        "sum(case when ingredient_id in (" +
        ingredient_ids.map(_ => "?").join(",") +
        ") then 1 else 0 end) >= count(*) - ?",
      ingredient_ids
        .concat(ingredient_ids)
        .concat(number_of_ingredients_to_skip)
    )
    .then(recipe_ids_obj => {
      return db("recipes")
        .select()
        .whereIn(
          "id",
          recipe_ids_obj.map(item => item.recipe_id)
        )
        .where("is_public", true)
        .orWhere("user_id", user_id);
    });
}

function getRecipesByIngredient(ingredientId, db = connection) {
  return db("recipes_ingredients")
    .innerJoin("recipes", "recipes.id", "recipes_ingredients.recipe_id")
    .where("recipes_ingredients.ingredient_id", ingredientId)
    .select("recipes.id", "recipes.title");
}

function getRecipesByIngredients(
  ingredient_ids,
  user_id = -1,
  db = connection
) {
  return db("recipes_ingredients")
    .distinct("recipe_id")
    .whereIn("recipes_ingredients.ingredient_id", ingredient_ids)
    .then(recipe_ids_obj => {
      return db("recipes")
        .select()
        .whereIn(
          "id",
          recipe_ids_obj.map(item => item.recipe_id)
        )
        .where("is_public", true)
        .orWhere("user_id", user_id);
    });
}

function updateIngredientInRecipe(
  recipe_id,
  ingredient_id,
  quantity,
  db = connection
) {
  return db("recipes_ingredients")
    .where("recipe_id", recipe_id)
    .where("ingredient_id", ingredient_id)
    .update({
      quantity
    });
}

function addMultipleIngredientsToRecipe(ingredients, db = connection) {
  return db("recipes_ingredients")
    .insert(ingredients, "*")
    .then(newIngredients => {
      for (let i = 0; i < newIngredients.length; i++) {
        delete newIngredients[i].recipe_id;
        newIngredients[i].id = newIngredients[i].ingredient_id;
        delete newIngredients[i].ingredient_id;
      }
      return newIngredients;
    });
}

module.exports = {
  getIngredients,
  getRecipesByIngredient,
  addIngredientToRecipe,
  deleteIngredientFromRecipe,
  updateIngredientInRecipe,
  getIngredientInRecipe,
  addMultipleIngredientsToRecipe,
  getRecipesMatchingAllIngredients,
  getRecipesByIngredients
};
