import React from 'react'
import { apiGetRecipes } from '../apis/recipesApi'
import { Link } from 'react-router-dom'

class RecipesList extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            recipes: []
        }
    }

    componentDidMount() {
        this.fetchRecipes()
    }

    fetchRecipes = () => {
        apiGetRecipes()
            .then(recipes => {
                this.setState({
                    recipes: recipes
                })
            })
    }

    render() {
        return (
            <div>
                <h2>Recipes List</h2>
                <ul>
                    {this.state.recipes.map(recipe => {
                        return (
                            <div key={recipe.id}>
                                <li>{recipe.title}</li>
                                <p>{recipe.category}</p>
                                <p>{recipe.notes}</p>
                                <p>{recipe.link}</p>
                            </div>
                        )
                    })}
                </ul>
            </div>
        )
    }
}

export default RecipesList
