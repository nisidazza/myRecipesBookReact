import React from 'react'
import { Link } from 'react-router-dom'
import { apiGetRecipeDetails, apiGetIngredientFromRecipe } from '../apis/recipesApi'
import RecipeDetails from './RecipeDetails'
import RecipeIngredient from './RecipeIngredient'
import RecipeNewIngredient from './RecipeNewIngredient'


class Recipe extends React.Component {
    constructor(props) {
        super(props)
        //console.log(props)
        this.state = {
            recipe: null,
            mode: "view"
        }

        this.visualizeAddedIngredient = this.visualizeAddedIngredient.bind(this)
    }

    componentDidMount() {
        const id = this.props.match.params.id
        this.fetchRecipeDetail(id)
    }

    fetchRecipeDetail(id) {
        apiGetRecipeDetails(id)
            .then(response => {
                this.setState({
                    recipe: response
                })
                //console.log(response)
            })
    }

    visualizeAddedIngredient(recipeId, ingredientId) {
        apiGetIngredientFromRecipe(recipeId, ingredientId)
            .then(ingredient => {
                this.setState({
                    ingredients: this.state.recipe.ingredients.push(ingredient)
                })
            })
    }

    render() {
        if (this.state.recipe == null) {
            return ""
        }

        let { ingredients, ...recipeDetails } = this.state.recipe

        return (
            <div id='Recipe-jsx-component'/*style={{ maxWidth: '700px', maxHeight: '100%', margin: 'auto' }}*/ >
                    <form style={{ maxWidth: '700px', backgroundColor: 'white', margin:'auto'}} >
                        <div className=' border p-3' id='border-shadow'>
                            <RecipeDetails recipe={recipeDetails} />
                            <section >
                                <h5>Ingredients</h5>
                                <RecipeNewIngredient recipeId={recipeDetails.id} onAddedIngredient={this.visualizeAddedIngredient} />
                                {renderIngredients(ingredients, recipeDetails.id)}
                                <Link to={`/recipes/${recipeDetails.id}/view`}>
                                    <button type='button' className='btn-sm btn-success'>View</button>
                                </Link>
                            </section>
                        </div>
                    </form> 
            </div>
        )
    }
}

function renderIngredients(ingredients, recipeId) {
    return (
        <>
            {
                ingredients.map((ingredient, j) => {
                    return (
                        <div key={j}>
                            <RecipeIngredient ingredient={ingredient} recipeId={recipeId} />
                        </div>
                    )
                })
            }
        </>

    )
}

export default Recipe