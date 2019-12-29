import React from 'react'
import {HashRouter as Router, Route, Link} from 'react-router-dom'
import Search from './Search'
import RecipesList from './RecipesList'


export function App() {
    
return (
    <Router>
        <h1>My Recipes Book</h1>
        <Route path='/ingredients' component={Search} />
        <Route path='/recipes' component={RecipesList} />
    </Router>
)

    
}

export default App