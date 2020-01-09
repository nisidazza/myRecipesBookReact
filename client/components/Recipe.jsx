import React from 'react'
import { apiGetRecipeDetails } from '../apis/recipesApi'
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

    visualizeAddedIngredient(id) {
        //TO DO: get ingredient from database
        //TO DO: run a setState and add the new ingredient (from the database) to this.state.recipe.ingredients
    }

    render() {
        if (this.state.recipe == null) {
            return ""
        }

        let { ingredients, ...recipeDetails } = this.state.recipe

        return (
            <>
                <RecipeDetails recipe={recipeDetails} />
                {renderIngredients(ingredients, recipeDetails.id)}
                <button>Add Ingredient</button>
                <RecipeNewIngredient onAddedIngredient={this.visualizeAddedIngredient}/>
            </>
        )
    }
}

function renderIngredients(ingredients, recipeId) {
    return (
        <section>
            <h4>Ingredients</h4>

            {ingredients.map((ingredient, j) => {
                return (
                    <div key={j}> 
                        <RecipeIngredient ingredient={ingredient} recipeId={recipeId} />
                    </div>
                )
            })}
        </section>

    )
}

export default Recipe