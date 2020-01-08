import React from 'react'
import { apiUpdateIngredientInRecipe, apiDeleteIngredientFromRecipe } from '../apis/recipesApi'


class RecipeIngredient extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            ingredient: this.props.ingredient,
            mode: 'view'
        }
    }

    handleChange = (e) => {
        this.setState({
            ingredient: {
                ...this.state.ingredient,
                [e.target.name]: e.target.value
            }
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        this.setState({
            mode: 'view'
        })
        apiUpdateIngredientInRecipe(this.props.recipeId, this.state.ingredient)
    }

    handleEditClick = () => {
        this.setState({ mode: 'edit' })
    }


    handleDeleteClick = () => {
        this.setState({ mode: 'deleted' })
        apiDeleteIngredientFromRecipe(this.props.recipeId, this.state.ingredient.id)
    }

    render() {
        const ingredientDetail = this.state.ingredient
        let ingredientForm;
        if (this.state.mode == 'deleted') {
            return ""
        } else {
            if (this.state.mode == 'edit') {
                ingredientForm = renderEditMode(this.handleSubmit, this.handleChange, ingredientDetail);
            } else if (this.state.mode == 'view') {
                ingredientForm = renderViewMode(this.handleEditClick, this.handleDeleteClick, ingredientDetail)
            }
            return (
                <>
                    {ingredientForm}
                </>
            )
        }
    }
}

function renderEditMode(handleSubmit, handleChange, ingredientDetail) {
    return (
        <>
            <div>
                <form onSubmit={handleSubmit}>
                    {ingredientDetail.name}: <input name="quantity" value={ingredientDetail.quantity} onChange={handleChange} />
                    <input type="submit" value="Save"></input>
                </form>
            </div>
        </>
    )
}

function renderViewMode(handleEditClick, handleDeleteClick, ingredientDetail) {
    return (
        <>
            <div key={ingredientDetail.id}>
                <li>{ingredientDetail.name}: {ingredientDetail.quantity}</li>
            </div>
            <div>
                <button onClick={handleEditClick}>Edit</button>
                <button onClick={handleDeleteClick}>Delete</button>
            </div>
        </>
    )
}

export default RecipeIngredient