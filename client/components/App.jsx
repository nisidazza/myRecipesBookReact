import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import SearchByIngredients from "./pages/SearchByIngredients";
import BrowseRecipes from "./pages/BrowseRecipes";
import Nav from "./navigation/Nav";
import Register from "./pages/Register";
import SignIn from "./pages/SignIn";
import Recipe from "./pages/recipe/Recipe";
import Homepage from "./pages/Homepage";
import AddRecipe from "./pages/AddRecipe";
import RequestResetToken from "./pages/RequestResetToken";
import ResetPassword from "./pages/ResetPassword";

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
          <Route exact path="/recovery/email/" component={RequestResetToken} />
          <Route exact path="/resetPassword/" component={ResetPassword} />
        </Switch>
      </Router>
    );
  }
}

export default App;
