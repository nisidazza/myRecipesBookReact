import React from 'react'
import { apiGetIngredients } from '../apis/recipesApi'

class RecipeNewIngredient extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            ingredients: [],
            newIngredient: {
                quantity: null,
                recipe_id: null,
                ingredient_id: -1
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
        e.preventDefault();

        //TO DO CALL API
        //TO DO FORCE UPDATE
        this.props.onAddedIngredient()
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
                <form onSubmit={this.handleSubmit}>
                    <select name='ingredient_id' onChange={this.handleChange} value={this.state.newIngredient.ingredient_id}>
                        <option key="0" value='-1' disable>-- Please choose... --</option>
                        {this.state.ingredients.map((ingredient, y) => {
                            return (
                                <option key={y + 1} value={ingredient.id}>{ingredient.name}</option>
                            )
                        })}
                    </select>
                    <input type='text' name='quantity' placeholder='insert quantity' onChange={this.handleChange}></input>
                    <input type="submit" value="Save"></input>
                </form>
            </div>
        )
    }
}


export default RecipeNewIngredient
