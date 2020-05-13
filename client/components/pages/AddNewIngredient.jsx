import React from "react";
import { apiAddNewIngredient } from "../../apis/ingredientsApi";

class AddNewIngredient extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      newIngredient: null,
    };
  }

  handleOnChange = (e) => {
    this.setState({
      newIngredient: {
        [e.target.name]: e.target.value,
      },
    });
    console.log(e.target.value);
  };

  handleSubmit = (e) => {
    e.preventDefault();
    apiAddNewIngredient(this.state.newIngredient)
    .then((newIngredient) => {
        console.log(newIngredient)
      if (newIngredient.status == 201) {
        const { onSave } = this.props;
        onSave();
      }
      // TO DO: error message if ingredient is not added
    });
  };

  render() {
    return (
      <div>
        <form className="mt-3" autoComplete="off" onSubmit={this.handleSubmit}>
          <div className="form-group row">
            <label className="col-sm-2">Name:</label>
            <input
              name="name"
              value={
                this.state.newIngredient ? this.state.newIngredient.name : ""
              }
              onChange={this.handleOnChange}
              className="form-control form-control-sm col-md-6 border-info"
            />
            <input className="btn-sm btn-info" type="submit" value="Save" />
            
          </div>
        </form>
      </div>
    );
  }
}

export default AddNewIngredient;
