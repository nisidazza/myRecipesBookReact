import React from "react";
import { apiGetIngredients } from "../apis/ingredientsApi";
import { apiGetRecipesMatchingAllIngredients } from "../apis/recipesSearchApi";
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
      showError: false
    };

    console.log("state : ", this.state);
  }

  onSelect = selectedList => {
    let selected_ingredient_ids = selectedList.map(item => item.id);
    this.setState({
      selected_ingredient_ids
    });
    console.log("this.state: ", this.state);
  };

  searchForRecipes = () => {
    let randomKeyToReconstructComponent = Math.random();
    console.log(this.state.selected_ingredient_ids);
    let searchPromise;
    if(true) {
      searchPromise = apiGetRecipesMatchingAllIngredients(
        this.state.selected_ingredient_ids
      )
    } else {
      searchPromise = null
    }
    searchPromise.then(recipes => {
      this.setState({
        recipes,
        randomKeyToReconstructComponent,
        showError: recipes.length == 0
      })
      console.log("recipes :", recipes);
    });
  };


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

  closeAlert = () => {
    this.setState({
      showError : false
    })
  }

  render() {
    let { ingredients } = this.state;
    let options = [];
    for (let i = 0; i < ingredients.length; i++) {
      options.push(ingredients[i]);
    }

    return (
      <>
        <div id="SearchByIngredients-jsx-component">
          <div className="row">
            <div className="col-sm-5 pr-0 mr-0">
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
            <div className="col-sm-3 pl-0">
              <button
                onClick={this.searchForRecipes}
                className="btn-sm btn-info ml-1"
                title="Search for recipes that contain all the selected ingredients"
              >
                Search
              </button>
            </div>
          </div>
          {this.state.showError  ? (
            <div
              className="alert alert-warning alert-dismissible fade show w-50 mt-4 collapse"
              role="alert"
            >
              <strong>Sorry</strong>, there are no recipes matching all the
              selected ingredients!
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
