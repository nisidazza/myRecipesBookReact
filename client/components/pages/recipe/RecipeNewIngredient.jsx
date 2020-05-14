import React from "react";
import { apiAddIngredientToRecipe } from "../../../apis/recipesApi";
import { apiGetIngredients } from "../../../apis/ingredientsApi";
import AddNewIngredient from "../AddNewIngredient";

class RecipeNewIngredient extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ingredients: [],
      newIngredient: this.resetIngredient(),
      showForm: false
    };
  }

  componentDidMount() {
    this.fetchIngredients();
  }

  fetchIngredients = () => {
    apiGetIngredients().then((ingredients) => {
      this.setState({
        ingredients: ingredients,
        showForm: false
      });
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const newIngredient = this.state.newIngredient;
    apiAddIngredientToRecipe(
      newIngredient.recipe_id,
      newIngredient.ingredient_id,
      newIngredient.quantity
    ).then((ingredientId) => {
      if (ingredientId > 0) {
        this.setState({
          newIngredient: this.resetIngredient(),
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
      ingredient_id: -1,
    };
  };

  handleChange = (e) => {
    this.setState({
      newIngredient: {
        ...this.state.newIngredient,
        [e.target.name]: e.target.value,
      },
    });
  };

  handleShowForm = () => {
    this.setState({
      showForm: true
    }) 
  }

  render() {
    const addedIngredient = this.state.newIngredient
    return (
      <div id="RecipeNewIngredient-jsx-component">
        <form className="mt-2" autoComplete="off" onSubmit={this.handleSubmit}>
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
            <div className="col-sm-5">
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
            <div className="col-sm-3 pl-2">
              <button className="btn-sm btn-info">Add</button>
            </div>
          </div>
        </form>
        <p >
          Is the ingredient you are looking for not in the list?
          <button
            type="button"
            name="showForm"
            className="btn-sm btn btn-link"
            onClick={this.handleShowForm}
          >
            Click here to add it!
          </button>
        </p>
        {this.state.showForm ? <AddNewIngredient newIngredient={addedIngredient} onSave={this.fetchIngredients} /> : ""}
      </div>
    );
  }
}

export default RecipeNewIngredient;
