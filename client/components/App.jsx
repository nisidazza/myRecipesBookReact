import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import SearchByIngredients from "./SearchByIngredients";
import BrowseRecipes from "./BrowseRecipes";
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
        <Route component={Nav} />
        <Switch>
          <Route exact path="/" component={BrowseRecipes} />
          <Route exact path="/home" component={Homepage} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/signin" component={SignIn} />
          <Route exact path="/listrecipes/" component={BrowseRecipes} />
          <Route path="/recipes/:id" component={Recipe} />
          <Route exact path="/search/" component={SearchByIngredients} />
          <Route exact path="/addrecipe/" component={AddRecipe} />
        </Switch>
      </Router>
    );
  }
}

export default App;
