import React from 'react'


class RecipeIngredient extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            ingredient: this.props.ingredient,
            mode: 'view'
        }
    }

    render() {
        const ingredientDetail = this.state.ingredient
        let ingredientForm;
        if (this.state.mode == 'edit') {
            ingredientForm = (
                <>
                    <div>
                        <form onSubmit={this.handleSubmit}>
                            <input name="name" value={ingredientDetail.name} onChange={this.handleChange} />
                            <input name="quantity" value={ingredientDetail.quantity} onChange={this.handleChange} />
                            <input type="submit" value="Save"></input>
                        </form>
                    </div>
                </>
            )
        } else if (this.state.mode == 'view') {
            ingredientForm = (
                <>
                    <div key={ingredientDetail.id}>
                        <li>{ingredientDetail.name}: {ingredientDetail.quantity}</li>
                    </div>
                    <div>
                        <button onClick={() => this.setState({ mode: "edit" })}>Edit</button>
                        <button>Delete</button>
                    </div>
                </>
            )
        }

        return (
            <>
                {ingredientForm}
            </>
        )
    }

    handleChange = (e) => {
        this.setState({
            ingredient : {
                ...this.state.ingredient,
                [e.target.name] : e.target.value
            }
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        this.setState({
            mode : 'view'
        })
        //TO DO IMPLEMENT
    }
}

export default RecipeIngredient