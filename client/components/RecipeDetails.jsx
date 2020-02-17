import React from "react";
import { apiUpdateRecipeDetails } from "../apis/recipesApi";

class RecipeDetail extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      recipe: this.props.recipe,
      mode: "view"
    };
  }

  render() {
    const recipeInfo = this.state.recipe;
    console.log(recipeInfo)
    let recipeDetailForm;
    if (this.state.mode == "edit") {
      recipeDetailForm = (
        <>
          <form className="mt-3 ml-3" onSubmit={this.handleSubmit}>
            <div className="form-group row">
              <label className="col-sm-2">Title:</label>
              <input
                name="title"
                value={recipeInfo.title}
                onChange={this.handleChange}
                className="form-control form-control-sm col-md-6 border-info"
              />
            </div>
            <div className="form-group row">
              <label className="col-sm-2">Category:</label>
              <input
                name="category"
                value={recipeInfo.category}
                onChange={this.handleChange}
                className="form-control form-control-sm col-md-2 border-info"
              />
            </div>
            <div className="form-group row">
              <label className="col-sm-2">Link:</label>
              <input
                name="link"
                value={recipeInfo.link}
                onChange={this.handleChange}
                className="form-control form-control-sm col-md-9 border-info"
              />
            </div>
            <div className="form-group row">
              <label className="col-sm-2">Notes:</label>
              <textarea
                name="notes"
                value={recipeInfo.notes}
                onChange={this.handleChange}
                className="form-control form-control-sm col-md-9 border-info"
              />
            </div>
            <div className="form-group">
              <div className="form-check form-check-inline row pl-0">
                <label
                  className="form-check-label col-sm-10"
                  htmlFor="is_public"
                >
                  Public:
                </label>
                <input
                  type="checkbox"
                  name="is_public"
                  defaultChecked={recipeInfo.is_public}
                  onChange={this.handleCheckbox}
                  className="form-check-input form-control-sm border-info ml-0"
                />
                <label
                  className="form-check-label col-sm-10"
                  htmlFor="is_complete"
                >
                  Completed:
                </label>
                <input
                  type="checkbox"
                  name="is_complete"
                  defaultChecked = {recipeInfo.is_complete}
                  onChange={this.handleCheckbox}
                  className="form-check-input form-control-sm  border-info ml-0"
                />
              </div>
            </div>
            <input className="btn-info" type="submit" value="Save" />
          </form>
        </>
      );
    } else if (this.state.mode == "view") {
      recipeDetailForm = (
        <>
          <section className="mt-3">
            <h2>{recipeInfo.title}</h2>
            <p>
              <strong>Category:</strong> {recipeInfo.category}
            </p>
            <p>
              <strong>Link:</strong>{" "}
              <a href={recipeInfo.link} target="_blank">
                {recipeInfo.link}
              </a>
            </p>
            <p>
              <strong>Notes:</strong> {recipeInfo.notes}
            </p>
          </section>
          <button
            className="btn-sm btn-info ml-1"
            onClick={() => this.setState({ mode: "edit" })}
          >
            Edit
          </button>
        </>
      );
    }
    return (
      <>
        {recipeDetailForm}
        <section>
          <h1>{this.state.errormessage}</h1>
        </section>
      </>
    );
  }

  handleSubmit = e => {
    e.preventDefault();
    this.setState({ mode: "view" });
    apiUpdateRecipeDetails(this.state.recipe)
      .catch(error => {
        this.setState({
          recipe: this.props.recipe,
          errormessage: error.message
        });
      })
      .then(recipe => {
        this.setState({
          recipe
        });
      });
  };

  handleChange = e => {
    this.setState({
      recipe: {
        ...this.state.recipe,
        [e.target.name]: e.target.value
      }
    });
  };

  handleCheckbox = e => {
    this.setState({
        recipe: {
          ...this.state.recipe,
          [e.target.name]: e.target.checked ? true : false
        }
      });
  }
}

export default RecipeDetail;
