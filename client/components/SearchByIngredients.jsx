import React from "react";
import { apiGetIngredients } from "../apis/ingredientsApi";
import { apiGetRecipesMatchingAllIngredients } from "../apis/recipesSearchApi";
import { Multiselect } from "multiselect-react-dropdown";
import RecipesList from "./RecipesList";

class SearchByIngredients extends React.Component {
  constructor(props) {
    super(props);

    this.multiselectRef = React.createRef();

    this.state = {
      ingredients: [],
      recipes: [],
      selected_ingredient_ids: [],
      randomNumber: 0,
      message: false
    };

    console.log("state : ", this.state);
  }

  resetValues() {
    // By calling the belowe method will reset the selected values programatically
    this.multiselectRef.current.resetSelectedValues();
  }

  onSelect = selectedList => {
    let selected_ingredient_ids = selectedList.map(item => item.id);
    this.setState({
      selected_ingredient_ids
    });
    console.log("this.state: ", this.state);
  };

  searchForRecipes = () => {
    let randomNumber = Math.random();
    console.log(this.state.selected_ingredient_ids);
    apiGetRecipesMatchingAllIngredients(
      this.state.selected_ingredient_ids
    ).then(recipes => {
      if (recipes.length == 0) {
        this.setState({
          message: true
        })
        this.resetValues();
      } else {
        this.setState({
          recipes,
          randomNumber
        })
        this.resetValues();
      }
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
          {this.state.message ? (
            <div
              className="alert alert-warning alert-dismissible fade show w-50 mt-4"
              role="alert"
            >
              <strong>Sorry</strong>, there are no recipes matching all the
              selected ingredients!
              <button
                type="button"
                className="close"
                data-dismiss="alert"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
          ) : (
            <div>
              <RecipesList
                recipes={this.state.recipes}
                key={this.state.randomNumber}
              />
            </div>
          )}
        </div>
      </>
    );
  }
}

export default SearchByIngredients;
