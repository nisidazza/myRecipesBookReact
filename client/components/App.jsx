import React from "react";
import { HashRouter as Router, Route } from "react-router-dom";
import IngredientsList from "./IngredientsList";
import RecipesList from "./RecipesList";
import Nav from "./Nav";
import Register from "./Register";
import SignIn from "./SignIn";
import Recipe from "./Recipe";
import RecipeView from "./RecipeView";
import Homepage from "./Homepage";
import AddRecipe from "./AddRecipe";

class App extends React.Component {
  render() {
    return (
      <Router>
        <Route path="/" component={Nav} />
        <Route path="/register" component={Register} />
        <Route path="/signin" component={SignIn} />
        <Route path="/ingredients" component={IngredientsList} />
        <Route path="/recipes/list" component={RecipesList} />
        <Route path="/recipes/add" component={AddRecipe} />
        <Route
          path="/recipes/:id/edit"
          render={props => <Recipe {...props} editable={true} />}
        />
        <Route
          path="/recipes/:id/view"
          render={props => <Recipe {...props} editable={false} />}
        />
        <Route path="/homepage" component={Homepage} />
      </Router>
    );
  }
}

export default App;
