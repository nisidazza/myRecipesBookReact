import React from 'react'
import { HashRouter as Router, Route, Link } from 'react-router-dom'
import IngredientsList from './IngredientsList'
import RecipesList from './RecipesList'
import Nav from './Nav'
import Register from './Register'
import SignIn from './SignIn'
import Recipe from './Recipe'
import RecipeView from './RecipeView'
import Homepage from './Homepage'


class App extends React.Component {
    render() {
        return (
            <Router>
                <Route path='/' component={Nav} />
                <Route path='/register' component={Register} />
                <Route path='/signin' component={SignIn} />
                <Route path='/ingredients' component={IngredientsList} />
                <Route path='/recipes/list' component={RecipesList} />
                <Route path='/recipes/:id/edit' component={Recipe} />
                <Route path='/recipes/:id/view' component={RecipeView} />
                <Route path='/homepage' component={Homepage}/>
            </Router>
        )
    }
}

export default App