import React from 'react'
import { apiGetRecipeDetails } from '../apis/recipesApi'
import RecipeDetails from './RecipeDetails'


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

    render() {
        if (this.state.recipe == null) {
            return ""
        }
        
        let {ingredients, ...recipeDetails} = this.state.recipe

        return (
            <>
                <RecipeDetails recipe = {recipeDetails}/>
                {this.renderIngredients(ingredients)}
            </>
        )
    }    

    renderIngredients(ingredientsInfo){
        return (
            <section>
                <h4>Ingredients</h4>
                {ingredientsInfo.map((ingredient, j) => {
                    return (
                        <div key={j}>
                            <li>{ingredient.name}: {ingredient.quantity}</li>
                        </div>
                    )
                })}
            </section>
        )
    }    
}


export default Recipe