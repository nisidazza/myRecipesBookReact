import React from 'react'
import { apiEditRecipeDetails, apiGetRecipeDetails } from '../apis/recipesApi'

class EditRecipe extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            recipe: null,
        }
        console.log(this.props.recipe)
        //console.log(this.props.recipe.recipeDetail.id)
    }

    componentDidMount() {
        const id = this.props.recipe.recipeDetail.id
        apiGetRecipeDetails(id)
            .then(details => {
                this.setState({
                    recipe: details
                })
                console.log(details)
            })
    }


    handleChange = (e) => {
        this.setState({
            recipe: {
                ...this.state.recipe,
            [e.target.name]: e.target.value
            }
            
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        apiEditRecipeDetails(this.state.recipe)
    }

    render() {
        if (this.state.recipe == null) {
            return ""
        }
        const recipeInfo = this.state.recipe.recipeDetail
        console.log(recipeInfo)
        return (
            <div>
                <>
                    <h1>Hello</h1>
                </>
                <form >
                    <label>Title:</label>
                    <input name="title" value={this.state.recipe.recipeDetail.title} onChange={this.handleChange} />
                </form>
            </div>
        )
    }
}


export default EditRecipe