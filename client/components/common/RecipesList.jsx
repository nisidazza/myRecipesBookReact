import React from "react";
import RecipeCard from "../pages/recipe/RecipeCard"
import { apiDeleteRecipe } from "../../apis/recipesApi";

class RecipesList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      recipes: this.props.recipes
    };
  }

  deleteRecipe = (id, i) => {
    apiDeleteRecipe(id)
      .then(hasBeenDeleted => {
        if (hasBeenDeleted) {
          this.state.recipes.splice(i, 1);
          this.setState({
            recipes: this.state.recipes
          });
        } else {
          //TODO:
        }
      })
      .catch(err => this.setState({ error: err.message }));
  };

  render() {
    return (
      <div id="RecipesList-jsx-component">
        <div className="row">
          {this.state.recipes.map((recipe, i) => {
            return (
              <RecipeCard key={i} openInNewTab={true} recipe={recipe} onClickDelete={() => this.deleteRecipe(recipe.id, i)}/>
            );
          })}
        </div>
      </div>
    );
  }
}

export default RecipesList;
