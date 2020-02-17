import React from "react";
import {
  apiUpdateIngredientInRecipe,
  apiDeleteIngredientFromRecipe
} from "../apis/recipesApi";

class RecipeIngredient extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ingredient: this.props.ingredient,
      mode: "view"
    };
  }

  handleChange = e => {
    this.setState({
      ingredient: {
        ...this.state.ingredient,
        [e.target.name]: e.target.value
      }
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.setState({
      mode: "view"
    });
    apiUpdateIngredientInRecipe(this.props.recipeId, this.state.ingredient);
  };

  handleEditClick = () => {
    this.setState({ mode: "edit" });
  };

  handleDeleteClick = () => {
    this.setState({ mode: "deleted" });
    apiDeleteIngredientFromRecipe(
      this.props.recipeId,
      this.state.ingredient.id
    );
  };

  render() {
    const ingredientDetail = this.state.ingredient;
    let ingredientForm;
    if (this.state.mode == "deleted") {
      return "";
    } else {
      if (this.state.mode == "edit") {
        ingredientForm = this.renderEditMode();
      } else if (this.state.mode == "view") {
        ingredientForm = renderViewMode(
          this.handleEditClick,
          this.handleDeleteClick,
          ingredientDetail,
          this.props.editable
        );
      }
      return <>{ingredientForm}</>;
    }
  }

   renderEditMode = () => {
    return (
      <>
        <form className="mt-3" onSubmit={this.handleSubmit}>
          <div className="form-group row">
            <label className="col-sm-3">{this.state.ingredient.name}: </label>
            <input
              name="quantity"
              value={this.state.ingredient.quantity}
              onChange={this.handleChange}
              className="form-control form-control-sm col-md-5 border border-info mr-1"
            />
            <button className="btn-sm btn-info">Save</button>
          </div>
        </form>
      </>
    );
  }


}



function renderViewMode(handleEditClick, handleDeleteClick, ingredientDetail, editable) {
  return (
    <div>
      <div className="row" key={ingredientDetail.id}>
        <div className="col-sm">
          <p>
            <strong>{ingredientDetail.name}</strong>:{" "}
            {ingredientDetail.quantity}
          </p>
        </div>
        <div className="col-sm-4">
          <button
            onClick={handleEditClick}
            className={
              editable ? "btn-sm btn-info ml-1 mb-1" : "hidden"
            }
          >
            Edit
          </button>
          <button
            onClick={handleDeleteClick}
            className= {editable ? "btn-sm btn-danger ml-1 mb-1" : "hidden"}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default RecipeIngredient;
