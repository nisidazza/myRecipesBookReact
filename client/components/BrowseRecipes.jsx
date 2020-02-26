import React from "react";
import { apiGetRecipes } from "../apis/recipesApi";
import RecipesList from "./RecipesList";

class BrowseRecipes extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      recipes: null
    };
  }

  componentDidMount() {
    this.fetchRecipes();
  }

  fetchRecipes = () => {
    apiGetRecipes().then(recipes => {
      this.setState({
        recipes: recipes
      });
    });
  };

  render() {
    if (this.state.recipes !== null) {
      return (
        <>
          <RecipesList recipes={this.state.recipes} />
        </>
      );
    } else {
        return (<></>)
    }
  }
}

export default BrowseRecipes;
