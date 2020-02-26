import React from "react";
import { apiGetRecipes } from "../apis/recipesApi";
import RecipesList from "./RecipesList";

class BrowseRecipes extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      recipes: [],
      randomNumber: 0
    };
  }

  componentDidMount() {
    this.fetchRecipes();
  }

  fetchRecipes = () => {
    let randomNumber = Math.random();
    apiGetRecipes().then(recipes => {
      this.setState({
        recipes,
        randomNumber
      });
    });
  };

  render() {
    return (
      <>
        <div id="BrowseRecipes-jsx-component">
          <RecipesList
            recipes={this.state.recipes}
            key={this.state.randomNumber}
          />
        </div>
      </>
    );
  }
}

export default BrowseRecipes;
