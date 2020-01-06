import React from 'react'
import { apiGetRecipeDetails } from '../apis/recipesApi'

class Recipe extends React.Component {
    constructor(props) {
        super(props)
        //console.log(props)
        this.state = {
            recipe: null
        }
    }

    componentDidMount() {
        const id = this.props.match.params.id
        this.fetchRecipeDetail(id)
    }

    fetchRecipeDetail = (id) => {
        apiGetRecipeDetails(id)
            .then(response => {
                this.setState({
                    recipe: response
                })
                console.log(response)
            })

    }


    render() {
        if (this.state.recipe == null) {
            return ("")
        }

        const recipeInfo = this.state.recipe.recipeDetail
        const ingredientsInfo = this.state.recipe.recipeIngredients
        console.log(recipeInfo)
        console.log(ingredientsInfo)
        return (
            <>
                <section>
                    <h2>{recipeInfo.title}</h2>
                    <p>Category: {recipeInfo.category}</p>
                    <p>Link: <a href={recipeInfo.link} target='_blank'>{recipeInfo.link}</a></p>
                    <p>Notes: {recipeInfo.notes}</p>
                </section>
                <section>
                    <h4>Ingredients</h4>
                    {ingredientsInfo.map((ingredient, j) => {
                        return (
                            <div key={j}>
                                <li>{ingredient.ingredient_name}: {ingredient.ingredient_quantity}</li>
                            </div>
                        )
                    })}
                </section>


            </>
        )
    }

}


export default Recipe