import React from 'react'
import { apiUpdateRecipeDetails } from '../apis/recipesApi'

class RecipeDetail extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            recipe: this.props.recipe,
            mode: "view"
        }
    }

    render() {
        const recipeInfo = this.state.recipe
        let recipeDetailForm;
        if (this.state.mode == "edit") {
            recipeDetailForm = (
                <>
                    <div >
                        <form className='form-group mt-3 ml-3' onSubmit={this.handleSubmit}>
                            <label className='mr-2' className='mr-2'>Title:</label>
                            <input name="title" value={recipeInfo.title} onChange={this.handleChange} className='form-control-md col-md-6 border-info'/>
                            <br/>
                            <label className='mr-2'>Category:</label>
                            <input name="category" value={recipeInfo.category} onChange={this.handleChange} className='form-control-md col-md-2 border-info'/>
                            <br/>
                            <label className='mr-2'>Link:</label>
                            <input name="link" value={recipeInfo.link} onChange={this.handleChange} className='form-control-md col-md-11 border-info'/>
                            <br/>
                            <label className='mr-2'>Notes:</label>
                            <input name="notes" value={recipeInfo.notes} onChange={this.handleChange} className='form-control-md col-sm-8 border-info'/>
                            <br/>
                            {/* <input type="submit" value="Save"></input> */}
                            <button className='btn-info'>Save</button>
                        </form>
                    </div>
                </>
            )
        } else if (this.state.mode == "view") {
            recipeDetailForm = (
                <>
                    <section>
                        <h2>{recipeInfo.title}</h2>
                        <p>Category: {recipeInfo.category}</p>
                        <p>Link: <a href={recipeInfo.link} target='_blank'>{recipeInfo.link}</a></p>
                        <p>Notes: {recipeInfo.notes}</p>
                    </section>
                    <button onClick={() => this.setState({ mode: "edit" })}>Edit</button>
                </>
            )
        }
        return (
            <>
                {recipeDetailForm}
                <section>
                    <h1>{this.state.errormessage}</h1>
                </section>
            </>
        )
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({ mode: "view" })
        apiUpdateRecipeDetails(this.state.recipe)
            .catch((error) => {
                this.setState({
                    recipe: this.props.pippo,
                    errormessage: error.message
                })
            })
            .then(recipe => {
                this.setState({
                    recipe
                })
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
}

export default RecipeDetail