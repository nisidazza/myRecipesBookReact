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
                    <form className='mt-3 ml-3' onSubmit={this.handleSubmit}>
                        <div className='form-group row'>
                            <label className='col-sm-2' >Title:</label>
                            <input name="title" value={recipeInfo.title} onChange={this.handleChange} className='form-control form-control-sm col-md-6 border-info' />
                        </div>
                        <div className='form-group row'>
                            <label className='col-sm-2'>Category:</label>
                            <input name="category" value={recipeInfo.category} onChange={this.handleChange} className='form-control form-control-sm col-md-2 border-info' />
                        </div>
                        <div className='form-group row'>
                            <label className='col-sm-2'>Link:</label>
                            <input name="link" value={recipeInfo.link} onChange={this.handleChange} className='form-control form-control-sm col-md-9 border-info' />
                        </div>
                        <div className='form-group row'>
                            <label className='col-sm-2'>Notes:</label>
                            <textarea name="notes" value={recipeInfo.notes} onChange={this.handleChange} className='form-control form-control-sm col-md-9 border-info' />
                        </div>
                        {/* <input type="submit" value="Save"></input> */}
                        <button className='btn-info'>Save</button>
                    </form>
                </>
            )
        } else if (this.state.mode == "view") {
            recipeDetailForm = (
                <>
                    <section className='mt-3'>
                        <h2>{recipeInfo.title}</h2>
                        <p><strong>Category:</strong> {recipeInfo.category}</p>
                        <p><strong>Link:</strong> <a href={recipeInfo.link} target='_blank'>{recipeInfo.link}</a></p>
                        <p><strong>Notes:</strong> {recipeInfo.notes}</p>
                    </section>
                    <button className='btn-sm btn-info ml-1' onClick={() => this.setState({ mode: "edit" })}>Edit</button>
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