import React from "react";
import { Link } from "react-router-dom";
import {
  apiGetRecipeDetails,
  apiGetIngredientFromRecipe
} from "../apis/recipesApi";
import RecipeDetails from "./RecipeDetails";
import RecipeIngredient from "./RecipeIngredient";
import RecipeNewIngredient from "./RecipeNewIngredient";

class Recipe extends React.Component {
  constructor(props) {
    super(props);
    //console.log(props)
    this.state = {
      recipe: null,
      mode: "view"
    };

    this.visualizeAddedIngredient = this.visualizeAddedIngredient.bind(this);
  }

  componentDidMount() {
    const id = this.props.match.params.id;
    this.fetchRecipeDetail(id);
  }

  fetchRecipeDetail(id) {
    apiGetRecipeDetails(id).then(response => {
      this.setState({
        recipe: response
      });
      //console.log(response)
    });
  }

  visualizeAddedIngredient(recipeId, ingredientId) {
    apiGetIngredientFromRecipe(recipeId, ingredientId).then(ingredient => {
      this.setState({
        ingredients: this.state.recipe.ingredients.push(ingredient)
      });
    });
  }

  render() {
    if (this.state.recipe == null) {
      return "";
    }

    let { ingredients, ...recipeDetails } = this.state.recipe;

    return (
      <div id="Recipe-jsx-component">
        <div className="form-container">
          <div className=" border px-4 py-3" id="border-shadow">
            <RecipeDetails
              editable={this.props.editable}
              recipe={recipeDetails}
            />
            <section>
              <h6 className="mt-2">
                <strong>Ingredients</strong>
              </h6>
              {this.props.editable ? (
                <RecipeNewIngredient
                  recipeId={recipeDetails.id}
                  onAddedIngredient={this.visualizeAddedIngredient}
                />
              ) : (
                <></>
              )}

              {renderIngredients(
                ingredients,
                recipeDetails.id,
                this.props.editable
              )}

              {this.props.editable ? (
                <Link to={`/recipes/${recipeDetails.id}/view`}>
                  <button type="button" className="btn-sm btn-success">
                    View
                  </button>
                </Link>
              ) : (
                <Link to={`/recipes/${recipeDetails.id}/edit`}>
                  <button type="button" className="btn-sm btn-success">
                    Edit
                  </button>
                </Link>
              )}
            </section>
          </div>
        </div>
      </div>
    );
  }
}

function renderIngredients(ingredients, recipeId, editable) {
  return (
    <>
      {ingredients.map((ingredient, j) => {
        return (
          <div key={j}>
            <RecipeIngredient
              editable={editable}
              ingredient={ingredient}
              recipeId={recipeId}
            />
          </div>
        );
      })}
    </>
  );
}

export default Recipe;
