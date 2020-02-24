import React from "react";
import { HashRouter as Router, Route } from "react-router-dom";
import SearchByIngredients from "./SearchByIngredients";
import RecipesList from "./RecipesList";
import Nav from "./Nav";
import Register from "./Register";
import SignIn from "./SignIn";
import Recipe from "./Recipe";
import Homepage from "./Homepage";
import AddRecipe from "./AddRecipe";

class App extends React.Component {
  render() {
    return (
      <Router>
        <Route path="/" component={Nav} />
        <Route path="/homepage" component={Homepage} />
        <Route path="/register" component={Register} />
        <Route path="/signin" component={SignIn} />
        <Route path="/recipes/:id" component={Recipe} />
        <Route path="/search/" component={SearchByIngredients} />
        <Route path="/listrecipes/" component={RecipesList} />
        <Route path="/addrecipe/" component={AddRecipe} />
      </Router>
    );
  }
}

export default App;
