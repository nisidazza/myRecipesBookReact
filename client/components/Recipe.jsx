import React from "react";
import { Link } from "react-router-dom";
import {
  apiGetRecipeDetails,
  apiGetIngredientFromRecipe
} from "../apis/recipesApi";
import RecipeDetails from "./RecipeDetails";
import RecipeIngredient from "./RecipeIngredient";
import RecipeNewIngredient from "./RecipeNewIngredient";
import { getDecodedToken } from "authenticare/client";

class Recipe extends React.Component {
  constructor(props) {
    super(props);

    const params = new URLSearchParams(this.props.location.search);
    const editable = params.get("editable");

    this.state = {
      recipe: null,
      editable: editable == "true" ? true : false,
      userCanEdit: null
    };

    this.visualizeAddedIngredient = this.visualizeAddedIngredient.bind(this);
  }

  componentDidMount() {
    const id = this.props.match.params.id;
    apiGetRecipeDetails(id).then(recipe => {
      const decodedToken = getDecodedToken();
      let userCanEdit;
      if (decodedToken) {
        userCanEdit = decodedToken.id == recipe.user_id;
      } else {
        userCanEdit = false;
      }
      this.setState({
        recipe: recipe,
        userCanEdit: userCanEdit
      });
    });
  }

  handleToggleMode = e => {
    if (e.target.name == "view") {
      this.setState({ editable: false });
    } else if (e.target.name == "edit") {
      this.setState({ editable: true });
    }
  };

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
              editable={this.state.editable && this.state.userCanEdit}
              recipe={recipeDetails}
            />
            <section>
              <h6 className="mt-2">
                <strong>Ingredients</strong>
              </h6>
              {this.state.editable && this.state.userCanEdit ? (
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
                this.state.editable && this.state.userCanEdit
              )}

              {this.state.userCanEdit ? (
                this.state.editable ? (
                  <button
                    type="button"
                    name="view"
                    className="btn-sm btn-success"
                    onClick={this.handleToggleMode}
                  >
                    View
                  </button>
                ) : (
                  <button
                    type="button"
                    name="edit"
                    className="btn-sm btn-success"
                    onClick={this.handleToggleMode}
                  >
                    Edit
                  </button>
                )
              ) : (
                <></>
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
    <ul>
      {ingredients.map((ingredient, j) => {
        return (
          <li>
            <div key={j}>
              <RecipeIngredient
                editable={editable}
                ingredient={ingredient}
                recipeId={recipeId}
              />
            </div>
          </li>
        );
      })}
    </ul>
  );
}

export default Recipe;
