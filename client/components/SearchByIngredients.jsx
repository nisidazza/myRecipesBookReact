import React from "react";
import { apiGetIngredients } from "../apis/ingredientsApi";
import {
  apiGetRecipesMatchingAllIngredients,
  apiGetRecipesByIngredients
} from "../apis/recipesSearchApi";
import { Multiselect } from "multiselect-react-dropdown";
import RecipesList from "./RecipesList";

class SearchByIngredients extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ingredients: [],
      recipes: [],
      selected_ingredient_ids: [],
      randomKeyToReconstructComponent: 0,
      showError: false,
      matchAllIngredients: false
    };
  }

  componentDidMount() {
    this.fetchIngredients();
    let event = new CustomEvent("pageHasChanged", {
      detail: { pageTitle: "Search by Ingredients" }
    });
    document.dispatchEvent(event);
  }

  onSelect = selectedList => {
    let selected_ingredient_ids = selectedList.map(item => item.id);
    this.setState({
      selected_ingredient_ids
    });
  };

  searchForRecipes = () => {
    let randomKeyToReconstructComponent = Math.random();
    let searchPromise;
    if (this.state.matchAllIngredients) {
      searchPromise = apiGetRecipesMatchingAllIngredients(
        this.state.selected_ingredient_ids
      );
    } else {
      searchPromise = apiGetRecipesByIngredients(
        this.state.selected_ingredient_ids
      );
    }
    searchPromise.then(recipes => {
      this.setState({
        recipes,
        randomKeyToReconstructComponent,
        showError: recipes.length == 0
      });
    });
  };

  fetchIngredients = () => {
    apiGetIngredients().then(ingredients => {
      this.setState({
        ingredients: ingredients
      });
    });
  };

  closeAlert = () => {
    this.setState({
      showError: false
    });
  };

  handleCheckBox = e => {
    this.setState({
      matchAllIngredients: e.target.checked
    });
  };

  render() {
    let { ingredients } = this.state;
    let options = [];
    for (let i = 0; i < ingredients.length; i++) {
      options.push(ingredients[i]);
    }

    return (
      <>
        <div id="SearchByIngredients-jsx-component">
          <div className="row mt-4">
            <div className="col-sm-8 pr-0 mr-0">
              <Multiselect
                options={options}
                displayValue="name"
                onSelect={this.onSelect}
                onRemove={this.onSelect}
                closeIcon="close"
                placeholder="Select Ingredients"
                ref={this.multiselectRef}
                className="border-info form-control form-control-sm"
              />
            </div>
            <div className="col-sm pl-0">
              <button
                onClick={this.searchForRecipes}
                className="btn-md btn-info ml-1 mt-1"
              >
                Search
              </button>
            </div>
            <div className="form-check col-sm-3 pt-1">
              <input
                type="checkbox"
                className="form-check-input mt-2"
                name="matchAll"
                onChange={this.handleCheckBox}
                checked={this.state.matchAllIngredients}
              />
              <label
                className="form-check-label"
                style={{ fontSize: "0.9em" }}
                htmlFor="matchAll"
              >
                Match all ingredients
              </label>
            </div>
          </div>
          {this.state.showError ? (
            <div
              className="alert alert-warning alert-dismissible fade show w-50 mt-4 collapse"
              role="alert"
            >
              {this.state.selected_ingredient_ids.length == 1 ? (
                <>
                  <strong>Sorry</strong>, there are no recipes matching the
                  selected ingredient!
                </>
              ) : (
                <>
                  <strong>Sorry</strong>, there are no recipes matching the
                  selected ingredients!
                </>
              )}
              <button
                type="button"
                className="close"
                aria-label="Close"
                onClick={this.closeAlert}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
          ) : (
            <div>
              <RecipesList
                recipes={this.state.recipes}
                key={this.state.randomKeyToReconstructComponent}
                openInNewTab={true}
              />
            </div>
          )}
        </div>
      </>
    );
  }
}

export default SearchByIngredients;
