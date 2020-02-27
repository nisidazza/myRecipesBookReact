import { httpClient } from "./httpClient";
const recipesSearchUrl = "api/v1/recipes-search";

export function apiGetRecipesMatchingAllIngredients(ingredient_ids) {
  return httpClient
    .get(`${recipesSearchUrl}/match-all?ingredient_ids=${ingredient_ids}`)
    .catch(() => {
      throw Error(
        "you need to implement an API route for /api/v1/recipes-search/match-all"
      );
    })
    .then(res => {
      return res.body;
    });
}

export function apiGetRecipesByIngredients(ingredient_ids) {
  return httpClient
    .get(`${recipesSearchUrl}/match?ingredient_ids=${ingredient_ids}`)
    .catch(() => {
      throw Error(
        "you need to implement an API route for /api/v1/recipes-search/match-all"
      );
    })
    .then(res => {
      return res.body;
    });
}
