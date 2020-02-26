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
      randomNumber: 0
    };

    console.log("state : ", this.state);
  }


  onSelect = selectedList => {
    let selected_ingredient_ids = selectedList.map(item => item.id);    
    this.setState({
      selected_ingredient_ids
    })
    console.log("this.state: ", this.state)
  };
  
  searchForRecipes = () => {
    let randomNumber = Math.random()
    console.log(this.state.selected_ingredient_ids)
    apiGetRecipesMatchingAllIngredients(this.state.selected_ingredient_ids).then(
      recipes => {
        this.setState({
          recipes,
          randomNumber
        });
        console.log("recipes :", recipes)
      }  
    )
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

  render() {
    let { ingredients } = this.state;
    let options = [];
    for (let i = 0; i < ingredients.length; i++) {
      options.push(ingredients[i]);
    }

    return (
      <div id="SearchByIngredients-jsx-component">
        <div className="row">
          <div className="col-sm-3 pr-0">
            <Multiselect
              options={options}
              displayValue="name"
              onSelect={this.onSelect}
              className="border-info form-control form-control-sm"
            />
          </div>
          <div className="col-sm-3 pr-0">
            <button
              onClick={this.searchForRecipes}
              className="btn-sm btn-info ml-1"
            >
              Search
            </button>
          </div>
        </div>
        <div>
          <RecipesList recipes={this.state.recipes} key={this.state.randomNumber} />
        </div>
      </div>
    );
  }
}

export default SearchByIngredients;
