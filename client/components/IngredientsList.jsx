import React from 'react'
import { apiGetIngredients } from '../apis/recipesApi'

class IngredientsList extends React.Component {
    constructor(props) {
        super(props)

        this.loginData = {
            ingredients: []
        }
        console.log(this.loginData.ingredients)
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


    render() {
        return (
            <div>
                <h1>Ingredients List</h1>
                <ul>
                    {this.loginData.ingredients.map(ingredient => {
                        return (
                            <>
                                <li>{ingredient.name}</li>
                            </>
                        )
                    })}
                </ul>
            </div>
        )
    }
}

export default IngredientsList


