import React from 'react'
import {HashRouter as Router, Route, Link} from 'react-router-dom'
import { apiGetIngredients } from '../apis/recipes'


class App extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            ingredients: []
        }
        console.log(this.state.ingredients)
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
                    {this.state.ingredients.map(ingredient => {
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

export default App