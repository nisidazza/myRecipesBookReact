const connection = require("./connection");

function addRecipe(newRecipe, db = connection) {
  return db("recipes").insert(newRecipe, ["*"]);
}

function deleteRecipe(id, db = connection) {
  return db("recipes")
    .where("id", id)
    .first()
    .delete();
}

function editRecipe(id, newRecipe, db = connection) {
  return db("recipes")
    .where("id", id)
    .select()
    .then(oldRecipe => {
      if (oldRecipe.length == 0) return { hasBeenUpdated: false };
      return db("recipes")
        .where("id", id)
        .update(newRecipe, ["*"])
        .then(updatedRecipes => {
          let hasBeenUpdated = updatedRecipes && updatedRecipes.length > 0;
          let newRecipe = hasBeenUpdated ? updatedRecipes[0] : null;
          return {
            hasBeenUpdated,
            newRecipe
          };
        });
    });
}

function getPublicRecipes(db = connection) {
  return db("recipes")
    .select()
    .where("is_public", true)
    .orderBy("recipes.title");
}

function getListRecipes(db = connection) {
  return db("recipes")
    .select()
    .orderBy("recipes.title");
}

function getRecipesMatchingAllIngredients(ingredient_ids, number_of_ingredients_to_skip = 0, db = connection) {
  return db("recipes_ingredients")
    .select("recipe_id")
    .groupBy("recipe_id")
    .havingRaw(
      "sum(case when ingredient_id in (" + ingredient_ids.map(_ => "?").join(",") + ") then 1 else 0 end) <= count(*) AND " +
      "sum(case when ingredient_id in (" + ingredient_ids.map(_ => "?").join(",") + ") then 1 else 0 end) >= count(*) - ?",
      ingredient_ids.concat(ingredient_ids).concat(number_of_ingredients_to_skip)
    )
    .then(recipe_ids_obj => {
      return db("recipes")
        .select()
        .whereIn("id", recipe_ids_obj.map(item => item.recipe_id))
    });
}

function getRecipe(id, db = connection) {
  return db("recipes")
    .where("id", id)
    .first();
}

module.exports = {
  addRecipe,
  deleteRecipe,
  editRecipe,
  getPublicRecipes,
  getListRecipes,
  getRecipe,
  getRecipesMatchingAllIngredients
};
