import React from "react";
import { apiUpdateRecipeDetails } from "../../../apis/recipesApi";

class RecipeDetail extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      recipe: this.props.recipe,
      mode: "view"
    };
  }

  uploadWidget = cloudinary.createUploadWidget(
    {
      cloudName: "hqwayz2au",
      uploadPreset: "brd7s5mq"
    },
    (error, result) => {
      this.checkUploadImage(result);
    }
  );

  openUploadWidget = () => {
    this.uploadWidget.open();
  };

  checkUploadImage = result => {
    if (result && result.event === "success") {
      let recipe = this.state.recipe;
      recipe.img_url = result.info.url;
      this.setState({
        recipe
      });
    }
  };

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
  };

  renderEditMode = () => {
    const recipeInfo = this.state.recipe;
    return (
      <>
        <form className="mt-3" onSubmit={this.handleSubmit}>
          <div className="form-group row">
            <div className="btn-container">
              <img
                src={
                  recipeInfo.img_url
                    ? recipeInfo.img_url
                    : "images/test-image.png"
                }
                className="rounded mx-auto d-block img-thumbnail mr-1"
              ></img>
              <button
                type="button"
                className="btn-sm btn-info img-btn"
                onClick={this.openUploadWidget}
              >
                Upload new image
              </button>
            </div>
          </div>
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
              <label className="form-check-label col-sm-10" htmlFor="is_public">
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
                defaultChecked={recipeInfo.is_complete}
                onChange={this.handleCheckbox}
                className="form-check-input form-control-sm  border-info ml-0"
              />
            </div>
          </div>
          <input className="btn-sm btn-info" type="submit" value="Save" />
        </form>
      </>
    );
  };

  renderViewMode = () => {
    const recipeInfo = this.state.recipe;
    return (
      <>
        <section className="mt-2">
          <p className="text-center card-header" style={{ border: "none" }}>
            {recipeInfo.title}
          </p>
          <div className="btn-container">
            <img
              src={
                recipeInfo.img_url
                  ? recipeInfo.img_url
                  : "images/test-image.png"
              }
              className="rounded mx-auto d-block img-thumbnail mr-1"
            ></img>
          </div>
          <p className="mt-2">
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
          className={this.props.editable ? "btn-sm btn-info" : "hidden"}
          onClick={() => this.setState({ mode: "edit" })}
        >
          Edit
        </button>
      </>
    );
  };

  render() {
    let recipeDetailForm;
    if (this.state.mode == "edit") {
      recipeDetailForm = this.renderEditMode();
    } else if (this.state.mode == "view") {
      recipeDetailForm = this.renderViewMode();
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
}

export default RecipeDetail;