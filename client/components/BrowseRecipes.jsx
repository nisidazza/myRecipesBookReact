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
    let event = new CustomEvent("pageHasChanged", {detail: {pageTitle : "Recipes List"}})
    document.dispatchEvent(event)
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
            openInNewTab={false}
          />
        </div>
      </>
    );
  }
}

export default BrowseRecipes;
