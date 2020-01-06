import React from 'react'

class ViewRecipe extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const recipeInfo = this.props.recipe.recipeDetail
        return (
            <>
                <section>
                    <h2>{recipeInfo.title}</h2>
                    <p>Category: {recipeInfo.category}</p>
                    <p>Link: <a href={recipeInfo.link} target='_blank'>{recipeInfo.link}</a></p>
                    <p>Notes: {recipeInfo.notes}</p>
                </section>
            </>
        )
    }

}

export default ViewRecipe