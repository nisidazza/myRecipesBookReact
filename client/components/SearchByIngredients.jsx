import React from "react";
import { apiGetIngredients } from "../apis/ingredientsApi";
import { apiGetRecipesMatchingAllIngredients } from "../apis/recipes2Api";
import { Multiselect } from "multiselect-react-dropdown";

class SearchByIngredients extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ingredients: [],
      selected_ingredient_ids: []
    };
  }

  onSelect = selectedList => {
    const {selected_ingredient_ids} = this.state
    for (let i = 0; i < selectedList.length; i++) {
      let ingredientId = selectedList[i].id;
      selected_ingredient_ids.push(ingredientId);
    }
    console.log(selected_ingredient_ids)
    return selected_ingredient_ids
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
      </div>
    );
  }
}

export default SearchByIngredients;
