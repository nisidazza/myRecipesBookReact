import React from 'react'

class RecipeView extends React.Component{
    constructor(props) {
        super(props)

        this.state = {
            recipe : this.props.recipe
        }

        console.log(this.props)
    }

    render() {
        return(
            <></>
        )
    }
}

export default RecipeView
