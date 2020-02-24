import React from "react";
import { apiGetIngredients } from "../apis/ingredientsApi";
import { Multiselect } from "multiselect-react-dropdown";

class SearchByIngredients extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ingredients: []
    };
  }

  onSelect(selectedList, selectedItem) {
    console.log(selectedList);
    console.log(selectedItem);
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

  handleChange = e => {
    console.log(e.target.value);
  };

  render() {
    let ingredients = this.state.ingredients;
    let options = [];
    for (let i = 0; i < ingredients.length; i++) {
      options.push(ingredients[i]);
    }
    console.log(options);

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
            <button className="btn-sm btn-info ml-1">Search</button>
          </div>
        </div>
      </div>
    );
  }
}

export default SearchByIngredients;
