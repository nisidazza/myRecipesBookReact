import React from "react";
import { apiAddRecipe } from "../../apis/recipesApi";
import Validator from "../common/utilities/Validator";
import { Editor } from "react-draft-wysiwyg";
import "../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState, convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";

class AddRecipe extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      newRecipe: {
        title: "",
        category: "",
        link: "",
        instructions: "",
        is_public: false,
        is_complete: false,
      },
      editorState: EditorState.createEmpty(),
    };

    this.validator = React.createRef();
  }

  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    });
    console.log(editorState);
  };

  handleChange = (e) => {
    this.setState({
      newRecipe: {
        ...this.state.newRecipe,
        [e.target.name]: e.target.value,
      },
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.validator.current.validate()) {
      let createdRecipe = this.state.newRecipe;
      createdRecipe.instructions = draftToHtml(
        convertToRaw(this.state.editorState.getCurrentContent())
      );
      console.log(createdRecipe.instructions);
      apiAddRecipe(createdRecipe)
        .then((res) => {
          const newRecipeId = res.id;
          this.props.history.push(`/recipes/${newRecipeId}/?editable=true`);
        })
        .catch((err) => {
          if (err) {
            this.validator.current.showError(
              "Something went wrong. Please, try again"
            );
          }
        });
    }
  };

  handleCheckbox = (e) => {
    this.setState({
      newRecipe: {
        ...this.state.newRecipe,
        [e.target.name]: !this.state.newRecipe[e.target.name],
      },
    });
  };

  getValidationRules = () => {
    let rules = [];

    rules.push({
      conditional: () => {
        return (
          this.state.newRecipe !== null &&
          this.state.newRecipe.title !== "" &&
          this.state.newRecipe.title.trim() !== ""
        );
      },
      errorMessage: "Please, insert a valid title",
    });

    rules.push({
      conditional: () => {
        return (
          this.state.newRecipe !== null &&
          this.state.newRecipe.category !== "" &&
          this.state.newRecipe.category.trim() !== "" &&
          this.state.newRecipe.category.match(/^([^0-9]*)$/) &&
          this.state.newRecipe.category.match(/^[a-zA-Z '-]+$/)
        );
      },
      errorMessage: "Please, insert a valid category",
    });
    return rules;
  };

  componentDidMount() {
    let event = new CustomEvent("pageHasChanged", {
      detail: { pageTitle: "Add Recipe" },
    });
    document.dispatchEvent(event);
  }

  render() {
    return (
      <div id="AddRecipe-jsx-component">
        <h4 className="text-center mt-5 mb-1">New Recipe Form</h4>
        <div className="container-fluid form-container">
          <div className="border p-5" id="border-shadow">
            <form className="" autoComplete="off" onSubmit={this.handleSubmit}>
              <div className="form-group row">
                <label className="col-sm-2">Title:</label>
                <input
                  name="title"
                  onChange={this.handleChange}
                  className="form-control form-control-sm col-md-9 border-info"
                />
              </div>
              <div className="form-group row">
                <label className="col-sm-2">Category:</label>
                <input
                  name="category"
                  onChange={this.handleChange}
                  className="form-control form-control-sm col-md-9 border-info"
                />
              </div>
              <div className="form-group row">
                <label className="col-sm-2">Link:</label>
                <input
                  name="link"
                  onChange={this.handleChange}
                  className="form-control form-control-sm col-md-9 border-info"
                />
              </div>
              <div className="form-group row">
                <label className="col-sm-2">Instructions:</label>
                {/* <textarea
                  name="instructions"
                  onChange={this.handleChange}
                  className="form-control form-control-sm col-md-9 border-info"
                /> */}
                <Editor
                  editorState={this.state.editorState}
                  toolbarClassName="toolbarClassName"
                  wrapperClassName="wrapperClassName"
                  editorClassName="editorClassName"
                  onEditorStateChange={this.onEditorStateChange}
                  toolbar={{
                    options: [
                      "inline",
                      "blockType",
                      "list",
                      "textAlign",
                      "colorPicker",
                      "link",
                      "emoji",
                      "remove",
                      "history",
                    ],
                    inline: {
                      options: [
                        "bold",
                        "italic",
                        "underline",
                        "strikethrough",
                        "monospace",
                      ],
                    },
                  }}
                />
              </div>
              <div className="form-group row pt-5">
                <label className="col-sm-2">Notes:</label>
                <textarea
                  name="notes"
                  onChange={this.handleChange}
                  className="form-control form-control-sm col-md-9 border-info"
                />
              </div>
              <div className="form-group">
                <div className="form-check form-check-inline row pl-0">
                  <label
                    className="form-check-label col-sm-7"
                    htmlFor="is_public"
                  >
                    Public:
                  </label>
                  <input
                    type="checkbox"
                    name="is_public"
                    onChange={this.handleCheckbox}
                    className="form-check-input form-control-sm border-info ml-2"
                  />
                  <label
                    className="form-check-label col-sm-7"
                    htmlFor="is_complete"
                  >
                    Completed:
                  </label>
                  <input
                    type="checkbox"
                    name="is_complete"
                    onChange={this.handleCheckbox}
                    className="form-check-input form-control-sm  border-info ml-2"
                  />
                </div>
              </div>
              <div className="form-group row mb-4">
                <div className="ml-2">
                  <p className="mb-0 mt-1 p-1">
                    Please, save your recipe details so you can add the
                    ingredients!
                  </p>
                </div>
                <input
                  type="submit"
                  value="Save"
                  className="btn-info row ml-2"
                />
                <div>
                  {
                    <Validator
                      rules={this.getValidationRules()}
                      ref={this.validator}
                    />
                  }
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default AddRecipe;
