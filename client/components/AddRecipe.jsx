import React from "react";
import { apiAddRecipe } from "../apis/recipesApi";
import { apiGetIngredients } from "../apis/ingredientsApi";
import RecipeNewIngredient from "./RecipeNewIngredient";

class AddRecipe extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      newRecipe: {
        is_public: false,
        is_complete: false
      },
    };
  }

  render() {
    return (
      <div id="AddRecipe-jsx-component">
        <div className="form-container">
          <div className="border p-3" id="border-shadow">
            <form className="mt-3 ml-3" onSubmit={this.handleSubmit}>
              <div className="form-group row">
                <label className="col-sm-2">Title:</label>
                <input
                  name="title"
                  onChange={this.handleChange}
                  className="form-control form-control-sm col-md-6 border-info"
                />
              </div>
              <div className="form-group row">
                <label className="col-sm-2">Category:</label>
                <input
                  name="category"
                  onChange={this.handleChange}
                  className="form-control form-control-sm col-md-6 border-info"
                />
              </div>
              <div className="form-group row">
                <label className="col-sm-2">Link:</label>
                <input
                  name="link"
                  onChange={this.handleChange}
                  className="form-control form-control-sm col-md-6 border-info"
                />
              </div>
              <div className="form-group row">
                <label className="col-sm-2">Notes:</label>
                <input
                  name="notes"
                  onChange={this.handleChange}
                  className="form-control form-control-sm col-md-6 border-info"
                />
              </div>
              <div className="form-group">
                <div className="form-check form-check-inline row pl-0">
                  <label className="form-check-label col-sm-10" for="is_public">
                    Public:
                  </label>
                  <input
                    type="checkbox"
                    name="is_public"
                    onChange={this.handleCheckbox1}
                    className="form-check-input form-control-sm border-info ml-0"
                  />
                  <label
                    className="form-check-label col-sm-10"
                    for="is_complete"
                  >
                    Completed:
                  </label>
                  <input
                    type="checkbox"
                    name="is_complete"
                    onChange={this.handleCheckbox2}
                    className="form-check-input form-control-sm  border-info ml-0"
                  />
                </div>
              </div>
              {/* <section>
            <h6>Ingredients:</h6>
            <RecipeNewIngredient />
          </section> */}
              <div>
                <input type="submit" value="Save" className="btn-info row" />
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

  handleChange = e => {
    this.setState({
      newRecipe: {
        ...this.state.newRecipe,
        [e.target.name]: e.target.value
      }
    });
    console.log(this.state);
  };

  handleSubmit = e => {
    e.preventDefault();
    apiAddRecipe(this.state.newRecipe).then(res => {
      if (res == 200) {
        console.log(res);
        this.setState({ recipeAdded: true });
      }
    });
  };

  handleCheckbox1 = () => {
    this.setState({
      newRecipe: {
        ...this.state.newRecipe,
        is_public: !this.state.newRecipe.is_public
      }
    });
  };

  handleCheckbox2 = () => {
    this.setState({
      newRecipe: {
        ...this.state.newRecipe,
        is_complete: !this.state.newRecipe.is_complete
      }
    });
  };
}

export default AddRecipe;
