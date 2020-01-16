import React from 'react'
import {Link} from 'react-router-dom'
import { apiGetRecipeView } from '../apis/recipesApi'


class RecipeView extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            recipe: null
        }
    }

    componentDidMount() {
        const recipeId = this.props.match.params.id
        apiGetRecipeView(recipeId)
            .then(recipe => {
                this.setState({
                    recipe: recipe
                })
            })
    }

    render() {
        if (this.state.recipe == null) {
            return ""
        }
        let { ingredients, ...recipeDetails } = this.state.recipe
        return (
            <>
                <div>
                    <h3>{recipeDetails.title}</h3>
                    <p><strong>Category:</strong>{recipeDetails.category}</p>
                    <p><strong>Link: </strong><a href={recipeDetails.link} target='_blank'>{recipeDetails.link}</a></p>
                    <p><strong>Notes:</strong> {recipeDetails.notes}</p>
                </div>
                <div>
                    <h4>Ingredient</h4>
                    <>
                        {ingredients.map(ingredient => {
                            return (
                                <div>
                                    <ul>
                                        <li>{ingredient.name}: {ingredient.quantity}</li>
                                    </ul>
                                </div>
                            )
                        })}
                    </>
                </div>
                <Link to={`/recipe/${recipeDetails.id}`}>
                    <button>Back</button>
                </Link>
            </>
        )
    }
}

export default RecipeView
