import React from 'react'
import { apiGetIngredients, apiAddIngredientToRecipe } from '../apis/recipesApi'

class RecipeNewIngredient extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            ingredients: [],
            newIngredient: {
                quantity: '',
                recipe_id: this.props.recipeId,
                ingredient_id: -1,
            }
        }

    }

    componentDidMount() {
        this.fetchIngredients()
    }

    fetchIngredients = () => {
        apiGetIngredients()
            .then(ingredients => {
                this.setState({
                    ingredients: ingredients
                })
            })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const newIngredient = this.state.newIngredient
        apiAddIngredientToRecipe(newIngredient.recipe_id, newIngredient.ingredient_id, newIngredient.quantity)
            .then((ingredientId) => {
                if (ingredientId > 0) {
                    this.setState({
                        newIngredient: {
                            quantity: "",
                            ingredient_id: -1,
                        }
                    })
                    this.props.onAddedIngredient(newIngredient.recipe_id, ingredientId)
                } else {
                    //TO DO HANDLE ERROR
                }
            })


    }

    handleChange = (e) => {
        this.setState({
            newIngredient: {
                ...this.state.newIngredient,
                [e.target.name]: e.target.value
            }
        })
    }

    render() {
        return (
            <div>
                <form className='form-group mt-2 ml-1' onSubmit={this.handleSubmit}>
                    <select name='ingredient_id' 
                            onChange={this.handleChange} 
                            value={this.state.newIngredient.ingredient_id} 
                            className='border-info form-control-sm '>
                        <option key="0" value='-1' disable='true'>-- Please choose... --</option>
                        {this.state.ingredients.map((ingredient, y) => {
                            return (
                                <option key={y + 1} value={ingredient.id}>{ingredient.name}</option>
                            )
                        })}
                    </select>
                    <input autoComplete='off' type='text'
                        name='quantity'
                        placeholder='insert quantity'
                        value={this.state.newIngredient.quantity}
                        onChange={this.handleChange}
                        className='form-control-sm col-sm-3 border-info '>
                    </input>
                    <button className='btn-sm btn-info ml-1'>Add</button>
                </form>
            </div>
        )
    }
}


export default RecipeNewIngredient
