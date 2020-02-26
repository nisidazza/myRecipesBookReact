import { httpClient } from "./httpClient";
const recipesSearchUrl = "api/v1/recipes-search";

export function apiGetRecipesMatchingAllIngredients(ingredient_ids) {
  return httpClient
    .get(`${recipesSearchUrl}?ingredient_ids=${ingredient_ids}`)
    .catch(() => {
      throw Error(
        "you need to implement an API route for /api/v1/recipes-search"
      );
    })
    .then(res => {
      return res.body;
    });
}
