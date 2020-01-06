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
                <h1>Hello</h1>
                <p>{recipeInfo.title}</p>
            </>
        )
    }

}


export default Recipe