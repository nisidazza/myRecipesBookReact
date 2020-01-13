import React from 'react'
import { apiGetRecipes, apiDeleteRecipe } from '../apis/recipesApi'
import { Link } from 'react-router-dom'
import cookbook from '../../public/images/cookbook.jpg'

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



    render() {
        return (
            <div className='recipe-list-container'>
                <div className='row mt-3'>
                    {this.state.recipes.map((recipe, i) => {
                        return (
                            <div className='col-lg-4' key={i}>
                                <div className='card w-75 mx-auto mt-3' id='recipe-card' >
                                    <img className='card-img-top' src={cookbook} alt='Card image cap'/>
                                    <div className='card-body'>
                                        <h5 className='card-title text-md-left'><strong>{recipe.title}</strong></h5>
                                        <h6 className='card-subtitle mb-2 text-muted'>Category: {recipe.category}</h6>
                                        <div className='card-footer'>
                                            <button onClick={() => this.deleteRecipe(recipe.id, i)}>Delete</button>
                                            <Link to={`/recipe/${recipe.id}`}>
                                                <button>Update</button>
                                            </Link>
                                            <Link to={`/view/${recipe.id}`}>
                                                <button>View</button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
}

export default RecipesList