import React from 'react'
import { apiGetRecipes, apiDeleteRecipe } from '../apis/recipesApi'


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

    deleteRecipe() {
        apiDeleteRecipe(this.state.recipes.id)
            .then(this.props.fetchRecipes)
            .then(() => this.props.history.push('/recipes'))
            .catch(err => this.setState({ error: err.message }))
    }



    render() {
        return (
            <div>
                <h2>Recipes List</h2>
                <ul>
                    {this.state.recipes.map(recipe => {
                        return (
                            <div key={recipe.id}>
                                <div>
                                    <li>{recipe.title}</li>
                                    <p>{recipe.category}</p>
                                    <p>{recipe.notes}</p>
                                    <p>{recipe.link}</p>
                                </div>
                                <div>
                                    <button onClick={this.deleteRecipe}>Delete</button>
                                </div>
                            </div>
                        )
                    })}
                </ul>
            </div>
        )
    }
}

export default RecipesList
