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
    apiDeleteIngredientFromRecipe(
      this.props.recipeId,
      this.state.ingredient.id
    ).then(() => {
      this.props.onDelete();
    });
  };

  render() {
    if (this.state.mode == "edit") {
      return <>{this.renderEditMode()}</>;
    } else if (this.state.mode == "view") {
      return <>{this.renderViewMode()}</>;
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
  };

  renderViewMode() {
    return (
      <div>
        <div className="row" key={this.state.ingredient.id}>
          <div className="col-sm">
            <p>
              <strong>{this.state.ingredient.name}</strong>:{" "}
              {this.state.ingredient.quantity}
            </p>
          </div>
          <div className="col-sm-3 pl-0">
            <button
              onClick={this.handleEditClick}
              className={
                this.props.editable ? "btn-sm btn-info mr-1" : "hidden"
              }
            >
              Edit
            </button>
            <button
              onClick={this.handleDeleteClick}
              className={this.props.editable ? "btn-sm btn-danger" : "hidden"}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default RecipeIngredient;
