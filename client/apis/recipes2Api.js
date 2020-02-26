import { httpClient } from "./httpClient";
const recipes2Url = "api/v1/recipes2";

export function apiGetRecipesMatchingAllIngredients(ingredient_ids) {
  return httpClient
    .get(`${recipes2Url}?ingredient_ids=${ingredient_ids}`)
    .catch(() => {
      throw Error(
        "you need to implement an API route for /api/v1/recipes2"
      );
    })
    .then(res => {
      return res.body;
    });
}
