import { httpClient } from "./httpClient";
const recipesUrl = "api/v1/recipes";

export function apiAddIngredientToRecipe(recipe_id, ingredient_id, quantity) {
  return httpClient
    .post(`${recipesUrl}/${recipe_id}/ingredients/${ingredient_id}`)
    .send({
      quantity
    })
    .catch(() => {
      throw Error("API route not found");
    })
    .then(res => {
      if (res.status == 201) {
        return ingredient_id;
      } else if (res.status == 404) {
        return -1;
      } else if (res.status == 409) {
        return -1;
      } else {
        return -1;
      }
    });
}

export function apiAddRecipe(recipe) {
  return httpClient
    .post(recipesUrl)
    .send(recipe)
    .catch(err => {
      console.log("ERROR:", err);
      throw Error("API not found");
    })
    .then(res => {
      if (res.status == 200) {
        console.log("RES.BODY:", res.body);
        return res.body;
      } else {
        throw Error("Unexpected HTTP Code " + res.status);
      }
    });
}

export function apiDeleteIngredientFromRecipe(recipe_id, ingredient_id) {
  return httpClient
    .delete(`${recipesUrl}/${recipe_id}/ingredients/${ingredient_id}`)
    .catch(() => {
      throw Error("API route not found");
    })
    .then(res => {
      if (res.status <= 299) return true;
      if (res.status == 404) return false;
      //TODO: what should we do in case of redirect?
      throw Error("Unexpected HTTP Code " + res.status);
    });
}

export function apiDeleteRecipe(id) {
  return httpClient
    .delete(`${recipesUrl}/${id}`)
    .catch(err => {
      console.log(err);
      throw Error("API route not found");
    })
    .then(res => {
      if (res.status <= 299) return true;
      if (res.status == 404) return false;
      //TODO: what should we do in case of redirect?
      throw Error("Unexpected HTTP Code " + res.status);
    });
}

export function apiGetPublicRecipes() {
  return httpClient
    .get(`${recipesUrl}/public`)
    .catch(() => {
      throw Error(
        "you need to implement an API route for /api/v1/recipes/public"
      );
    })
    .then(res => {
      return res.body;
    });
}

export function apiGetUserPrivateRecipes() {
  return httpClient
    .get(`${recipesUrl}/private`)
    .catch(() => {
      throw Error(
        "you need to implement an API route for /api/v1/recipes/private"
      );
    })
    .then(res => {
      return res.body;
    });
}

export function apiGetIngredientFromRecipe(recipe_id, ingredient_id) {
  return httpClient
    .get(`${recipesUrl}/${recipe_id}/ingredients/${ingredient_id}`)
    .catch(() => {
      throw Error("API route not found");
    })
    .then(res => {
      if (res.status == 200) {
        return res.body;
      } else {
        throw Error("Unexpected HTTP Code " + res.status);
      }
    });
}

export function apiGetRecipes() {
  return httpClient
    .get(recipesUrl)
    .catch(() => {
      throw Error("you need to implement an API route for /api/v1/recipes");
    })
    .then(res => {
      return res.body;
    });
}

export function apiGetRecipeDetails(id) {
  return httpClient
    .get(`${recipesUrl}/${id}`)
    .catch(() => {
      throw Error("you need to implement an API route for /api/v1/recipes/:id");
    })
    .then(res => res.body);
}

export function apiUpdateIngredientInRecipe(recipe_id, ingredient) {
  return httpClient
    .patch(`${recipesUrl}/${recipe_id}/ingredients/${ingredient.id}`)
    .send(ingredient)
    .catch(() => {
      throw Error("API route not found");
    })
    .then(res => {
      if (res.status == 200) return res.body;
      throw Error("Unexpected HTTP Code " + res.status);
    });
}

export function apiUpdateRecipeDetails(recipe) {
  return httpClient
    .patch(`${recipesUrl}/${recipe.id}`)
    .send(recipe)
    .catch(err => {
      console.log(err);
      throw Error("API route not found");
    })
    .then(res => {
      if (res.status == 200) return res.body;
      throw Error("Unexpected HTTP Code " + res.status);
    });
}
