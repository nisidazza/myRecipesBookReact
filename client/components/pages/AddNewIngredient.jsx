import React from "react";
import { apiAddNewIngredient } from "../../apis/ingredientsApi";
import Validator from "../common/utilities/Validator";

class AddNewIngredient extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      newIngredient: null
    };

    this.validator = React.createRef();
  }

  handleOnChangeName = (e) => {
    this.setState({
      newIngredient: {
        [e.target.name]: e.target.value
      },
    })
  };

  getValidationRules = () => {
    let rules = []

    rules.push({
      conditional: () => {
        return(
          this.state.newIngredient !== null && 
          this.state.newIngredient.name !== "" &&
          this.state.newIngredient.name.trim() !== "" &&
          this.state.newIngredient.name.match(/^([^0-9]*)$/) &&
          this.state.newIngredient.name.match(/^[a-zA-Z '-]+$/)
        )
      },
      errorMessage: "Please, insert a valid ingredient's name"
    })
    return rules;
  }

  handleSubmit = (e) => {
    e.preventDefault();
    if(this.validator.current.validate()) {
      apiAddNewIngredient(this.state.newIngredient)
      .then((newIngredient) => {
        if(newIngredient.status == 201){
            const { onSave } = this.props;
          onSave();
        }
      })
      .catch((err) => {
        if(err.message == "Conflict") {
          this.validator.current.showError("The ingredient's name already exists")
        } else {
          this.validator.current.showError("Something went wrong. Please,try again!")
          throw err;
        }
      })
    }
  };

  render() {
    return (
      <div id="AddNewIngredient-jsx-component">
        <form className="mt-3" autoComplete="off" onSubmit={this.handleSubmit}>
          <div className="form-group row">
            <label className="col-sm-1 pl-2">Name:</label>
            <div className="col-sm-8 ml-1">
              <input
                name="name"
                value={
                  this.state.newIngredient ? this.state.newIngredient.name : ""
                }
                onChange={this.handleOnChangeName}
                className="form-control form-control-sm border-info"
              />
            </div>
            <div className="col-sm-2 pl-1">
              <input className="btn-sm btn-info" type="submit" value="Save" />
            </div>
            <div>
              { <Validator 
                ref={this.validator}
                rules={this.getValidationRules()}/> }
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default AddNewIngredient;
