import React from 'react'
import { apiGetRecipeDetails } from '../apis/recipesApi'
import ViewRecipe from './ViewRecipe'
import EditRecipe from './EditRecipe'


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
        
        const ingredientsInfo = this.state.recipe.recipeIngredients
        let ingredients = (
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
        )

        return (
            <>
                {this.renderRecipeFields()}
                {ingredients}
            </>
        )
    }

    renderRecipeFields() {
        if (this.state.mode == "edit") {
            return (
                <>
                    <EditRecipe recipe={this.state.recipe} />
                    <button onClick={() => this.setState({ mode: "view" })}>Save</button>
                </>
            )
        } else if (this.state.mode == "view") {
            return (
                <>
                    <ViewRecipe recipe={this.state.recipe} />
                    <button onClick={() => this.setState({ mode: "edit" })}>Edit</button>
                </>
            )
        }
    }
}


export default Recipe