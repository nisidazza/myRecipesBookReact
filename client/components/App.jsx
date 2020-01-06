import React from 'react'
import { HashRouter as Router, Route, Link } from 'react-router-dom'
import IngredientsList from './IngredientsList'
import RecipesList from './RecipesList'
import Nav from './Nav'
import Register from './Register'
import SignIn from './SignIn'
import Recipe from './Recipe'
import EditRecipe from './EditRecipe'


class App extends React.Component {
    render() {
        return (
            <Router>
                <h1>My Recipes Book</h1>
                <Route path='/' component={Nav} />
                <Route path='/register' component={Register} />
                <Route path='/signin' component={SignIn} />
                <Route path='/ingredients' component={IngredientsList} />
                <Route path='/recipes' component={RecipesList} />
                <Route path='/recipe/:id' component={Recipe} />
                <Route path='/edit/:id' component={EditRecipe} />
            </Router>
        )
    }
}

export default App