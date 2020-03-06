import React from "react";
import { apiAddIngredientToRecipe } from "../apis/recipesApi";
import { apiGetIngredients } from "../apis/ingredientsApi";

class RecipeNewIngredient extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ingredients: [],
      newIngredient: this.resetIngredient()
    };
  }

  componentDidMount() {
    this.fetchIngredients();
  }

  fetchIngredients = () => {
    apiGetIngredients().then(ingredients => {
      this.setState({
        ingredients: ingredients
      });
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const newIngredient = this.state.newIngredient;
    apiAddIngredientToRecipe(
      newIngredient.recipe_id,
      newIngredient.ingredient_id,
      newIngredient.quantity
    ).then(ingredientId => {
      if (ingredientId > 0) {
        this.setState({
          newIngredient: this.resetIngredient()
        });
        this.props.onAddedIngredient(newIngredient.recipe_id, ingredientId);
      } else {
        //TO DO HANDLE ERROR
      }
    });
  };

  resetIngredient = () => {
    return {
      quantity: "",
      recipe_id: this.props.recipeId,
      ingredient_id: -1
    };
  };

  handleChange = e => {
    this.setState({
      newIngredient: {
        ...this.state.newIngredient,
        [e.target.name]: e.target.value
      }
    });
  };

  render() {
    return (
      <div>
        <form className="mt-2" onSubmit={this.handleSubmit}>
          <div className="form-group row">
            <div className="col-sm-4 pr-0">
              <select
                name="ingredient_id"
                onChange={this.handleChange}
                value={this.state.newIngredient.ingredient_id}
                className="border-info form-control form-control-sm"
              >
                <option key="0" value="-1" disable="true">
                  -- Please choose... --
                </option>
                {this.state.ingredients.map((ingredient, y) => {
                  return (
                    <option key={y + 1} value={ingredient.id}>
                      {ingredient.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="col-sm-4">
              <input
                autoComplete="off"
                type="text"
                name="quantity"
                placeholder="insert quantity..."
                value={this.state.newIngredient.quantity}
                onChange={this.handleChange}
                className="border border-info form-control form-control-sm p-1 pl-2"
              ></input>
            </div>
            <div className="col-sm-4">
              <button className="btn-sm btn-info">Add</button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default RecipeNewIngredient;
