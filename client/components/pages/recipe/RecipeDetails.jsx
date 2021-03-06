import React from "react";
import { apiUpdateRecipeDetails } from "../../../apis/recipesApi";
import Validator from "../../common/utilities/Validator";
import { Editor } from "react-draft-wysiwyg";
import { ContentState, EditorState, convertToRaw, convertFromHTML } from "draft-js";
import draftToHtml from "draftjs-to-html";
import "../../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

class RecipeDetail extends React.Component {
  constructor(props) {
    super(props);

    const blocksFromHTML = convertFromHTML(this.props.recipe.instructions);

    this.state = {
      recipe: this.props.recipe,
      mode: "view",
      editorState: EditorState.createWithContent(
        ContentState.createFromBlockArray(
          blocksFromHTML.contentBlocks,
          blocksFromHTML.entityMap
        )
      ),
    };

    this.validator = React.createRef();
  }

  uploadWidget = cloudinary.createUploadWidget(
    {
      cloudName: "hqwayz2au",
      uploadPreset: "brd7s5mq",
    },
    (error, result) => {
      this.checkUploadImage(result);
    }
  );

  openUploadWidget = () => {
    this.uploadWidget.open();
  };

  checkUploadImage = (result) => {
    if (result && result.event === "success") {
      let recipe = this.state.recipe;
      recipe.img_url = result.info.url;
      this.setState({
        recipe,
      });
    }
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.validator.current.validate()) {
      let modifiedRecipe = this.state.recipe;
      modifiedRecipe.instructions = draftToHtml(
        convertToRaw(this.state.editorState.getCurrentContent())
      );
      this.setState({ mode: "view" });
      apiUpdateRecipeDetails(modifiedRecipe)
        .catch((err) => {
          if (err) {
            this.validator.current.showError(
              "Something went wrong. Please, try again"
            );
          }
          this.setState({
            recipe: this.props.recipe,
          });
        })
        .then((recipe) => {
          this.setState({
            recipe,
          });
        });
    }
  };

  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    });
  };

  handleChange = (e) => {
    this.setState({
      recipe: {
        ...this.state.recipe,
        [e.target.name]: e.target.value,
      },
    });
  };

  handleCheckbox = (e) => {
    this.setState({
      recipe: {
        ...this.state.recipe,
        [e.target.name]: e.target.checked ? true : false,
      },
    });
  };

  getValidationRules = () => {
    let rules = [];

    rules.push({
      conditional: () => {
        return (
          this.state.recipe !== null &&
          this.state.recipe.title !== "" &&
          this.state.recipe.title.trim() !== ""
        );
      },
      errorMessage: "Please, insert a valid title",
    });

    rules.push({
      conditional: () => {
        return (
          this.state.recipe !== null &&
          this.state.recipe.category !== "" &&
          this.state.recipe.category.trim() !== "" &&
          this.state.recipe.category.match(/^([^0-9]*)$/) &&
          this.state.recipe.category.match(/^[a-zA-Z '-]+$/)
        );
      },
      errorMessage: "Please, insert a valid category",
    });
    return rules;
  };

  renderEditMode = () => {
    const recipeInfo = this.state.recipe;
    return (
      <div id="RecipeDetails-jsx-component">
        <form className="mt-3" onSubmit={this.handleSubmit}>
          <div className="form-group row">
            <div className="img-container">
              <img
                src={
                  recipeInfo.img_url
                    ? recipeInfo.img_url
                    : "images/test-image.png"
                }
                className="rounded mx-auto d-block img-thumbnail mr-1"
              ></img>
              <button
                type="button"
                className="btn-sm btn-info img-btn"
                onClick={this.openUploadWidget}
              >
                Upload new image
              </button>
            </div>
          </div>
          <div className="form-group row">
            <label className="col-sm-2">Title:</label>
            <input
              name="title"
              value={recipeInfo.title}
              onChange={this.handleChange}
              className="form-control form-control-sm col-md-6 border-info"
              autoComplete="off"
            />
          </div>
          <div className="form-group row">
            <label className="col-sm-2">Category:</label>
            <input
              name="category"
              value={recipeInfo.category}
              onChange={this.handleChange}
              className="form-control form-control-sm col-md-2 border-info"
              autoComplete="off"
            />
          </div>
          <div className="form-group row">
            <label className="col-sm-2">Link:</label>
            <input
              name="link"
              value={recipeInfo.link}
              onChange={this.handleChange}
              className="form-control form-control-sm col-md-9 border-info"
              autoComplete="off"
            />
          </div>
          <div className="form-group row">
            <label className="col-sm-2">Instructions:</label>
            <Editor
              editorState={this.state.editorState}
              toolbarClassName="toolbarClassName"
              wrapperClassName="wrapperClassName"
              editorClassName="editorClassName"
              onEditorStateChange={this.onEditorStateChange}
              toolbar = {{options: ['inline', 'blockType',  'list', 'textAlign', 'colorPicker', 'link', 'emoji', 'remove', 'history'],
              inline: {
                options: ['bold', 'italic', 'underline', 'strikethrough', 'monospace']
                }
              }}
            />
          </div>
          <div className="form-group row pt-5">
            <label className="col-sm-2">Notes:</label>
            <textarea
              name="notes"
              value={recipeInfo.notes}
              onChange={this.handleChange}
              className="form-control form-control-sm col-md-9 border-info"
              autoComplete="off"
            />
          </div>
          <div className="form-group">
            <div className="form-check form-check-inline row pl-0">
              <label className="form-check-label col-sm-10" htmlFor="is_public">
                Public:
              </label>
              <input
                type="checkbox"
                name="is_public"
                defaultChecked={recipeInfo.is_public}
                onChange={this.handleCheckbox}
                className="form-check-input form-control-sm border-info ml-0"
              />
              <label
                className="form-check-label col-sm-10"
                htmlFor="is_complete"
              >
                Completed:
              </label>
              <input
                type="checkbox"
                name="is_complete"
                defaultChecked={recipeInfo.is_complete}
                onChange={this.handleCheckbox}
                className="form-check-input form-control-sm  border-info ml-0"
              />
            </div>
          </div>
          <input className="btn-sm btn-info" type="submit" value="Save" />
        </form>
      </div>
    );
  };

  renderViewMode = () => {
    const recipeInfo = this.state.recipe;
    return (
      <div id="RecipeDetails-jsx-component">
        <section className="mt-2">
          <div className="text-center card-header">{recipeInfo.title}</div>
          <div className="img-container">
            <img
              src={
                recipeInfo.img_url
                  ? recipeInfo.img_url
                  : "images/test-image.png"
              }
              className="rounded mx-auto d-block img-thumbnail mr-1"
            ></img>
          </div>
          <div className="mt-2">
            <strong>Category:</strong> {recipeInfo.category}
          </div>
          <div className="mt-2">
            <strong>Link:</strong>
            <a href={recipeInfo.link} target="_blank">
              {recipeInfo.link}
            </a>
          </div>
          <div className="mt-2">
            <strong>Instructions:</strong>
            <div
              dangerouslySetInnerHTML={{ __html: recipeInfo.instructions }}
            />
          </div>
          <div className="mt-2">
            <strong>Notes:</strong> {recipeInfo.notes}
          </div>
        </section>
        <div className="mt-2">
          <button
            className={this.props.editable ? "btn-sm btn-info" : "hidden"}
            onClick={() => this.setState({ mode: "edit" })}
          >
            Edit
          </button>
        </div>
      </div>
    );
  };

  render() {
    let recipeDetailForm;
    if (this.state.mode == "edit") {
      recipeDetailForm = this.renderEditMode();
    } else if (this.state.mode == "view") {
      recipeDetailForm = this.renderViewMode();
    }
    return (
      <>
        {recipeDetailForm}
        <div>
          {<Validator ref={this.validator} rules={this.getValidationRules()} />}
        </div>
      </>
    );
  }
}

export default RecipeDetail;
