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
                console.log(recipes)
            })
    }

    deleteRecipe = (id, i) => {
        apiDeleteRecipe(id)
            .then(hasBeenDeleted =>{
                console.log(hasBeenDeleted)
                if(hasBeenDeleted) {
                    this.state.recipes.splice(i, 1)
                    this.setState({
                        recipes: this.state.recipes
                    })
                } else {
                    //TODO: 
                }
            })
            .catch(err => this.setState({ error: err.message }))
        console.log("pluto " + i)
    }

    render() {
        return (
            <div>
                <h2>Recipes List</h2>
                <ul>
                    {this.state.recipes.map((recipe, i) => {
                        return (
                            <div key={i}>
                                <div>
                                    <li>{recipe.title}</li>
                                    <p>{recipe.category}</p>
                                    <p>{recipe.notes}</p>
                                    <a href={recipe.link}><p>{recipe.link}</p></a>
                                    <p>{recipe.id}</p>
                                    <div>
                                        <button onClick={() => this.deleteRecipe(recipe.id, i)}>Delete</button>
                                    </div>
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