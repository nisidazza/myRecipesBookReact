import React from 'react'
import { apiGetRecipes, apiDeleteRecipe } from '../apis/recipesApi'
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
    

    deleteRecipe = (id, i) => {
        apiDeleteRecipe(id)
            .then(hasBeenDeleted => {
                if (hasBeenDeleted) {
                    this.state.recipes.splice(i, 1)
                    this.setState({
                        recipes: this.state.recipes
                    })
                } else {
                    //TODO: 
                }
            })
            .catch(err => this.setState({ error: err.message }))
    }

    viewRecipe = (id) => {
        ap
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
                                    <li><strong>{recipe.title}</strong></li>
                                    <p>Category: {recipe.category}</p>
                                    {/* <p>{recipe.id}</p> */}
                                    <div>
                                        <button onClick={() => this.deleteRecipe(recipe.id, i)}>Delete</button>
                                        <Link to={`/recipe/${recipe.id}`}>
                                            <button>Update</button>
                                        </Link>
                                        <Link to={`/view/${recipe.id}`}>
                                            <button>View</button>
                                        </Link>
                                    </div>
                                    <hr></hr>
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