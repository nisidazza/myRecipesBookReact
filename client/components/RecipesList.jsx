import React from 'react'
import { apiGetRecipes } from '../apis/recipesApi'

class RecipesList extends React.Component {
    constructor(props) {
        super(props)

        this.loginData = {
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
                    {this.loginData.recipes.map(recipe => {
                        return (
                            <>
                                <li>{recipe.title}</li>
                            </>
                        )
                    })}
                </ul>
            </div>
        )
    }
}

export default RecipesList
