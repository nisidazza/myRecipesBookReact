import React from "react";
import { apiDeleteRecipe } from "../apis/recipesApi";
import { Link } from "react-router-dom";
import { IfAuthenticated, IfNotAuthenticated } from "./Authenticated";
import { getDecodedToken } from "authenticare/client";

class RecipesList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      recipes: this.props.recipes,
      openInNewTab: this.props.openInNewTab
    };
  }

  deleteRecipe = (id, i) => {
    apiDeleteRecipe(id)
      .then(hasBeenDeleted => {
        if (hasBeenDeleted) {
          this.state.recipes.splice(i, 1);
          this.setState({
            recipes: this.state.recipes
          });
        } else {
          //TODO:
        }
      })
      .catch(err => this.setState({ error: err.message }));
  };

  render() {
    const decodedToken = getDecodedToken();
    let userId = -1;
    if (decodedToken) {
      userId = decodedToken.id;
    }
    return (
      <div id="RecipeList-jsx-component">
        <div className="row">
          {this.state.recipes.map((recipe, i) => {
            return (
              <div className="col-lg-4" key={i}>
                <div className="card w-65 mx-auto mt-3" id="recipe-card">
                  <img
                    className="card-img-top"
                    src={"images/book.jpg"}
                    alt="Book"
                  />
                  <div className="card-body">
                    <h5 className="card-title text-md-left">
                      <strong>{recipe.title}</strong>
                    </h5>
                    <h6 className="card-subtitle mb-2 text-muted">
                      Category: {recipe.category}
                    </h6>
                    <div className="card-footer">
                      <IfAuthenticated>
                        {recipe.user_id === userId ? (
                          <div
                            className="btn-toolbar justify-content-between"
                            role="toolbar"
                            aria-label="Toolbar with button groups"
                          >
                            <div
                              className="btn-group mr-2"
                              role="group"
                              aria-label="First group"
                            >
                              <Link
                                to={`/recipes/${recipe.id}/?editable=true`}
                                target={this.state.openInNewTab ? "_blank" : ""}
                              >
                                <button
                                  type="button"
                                  className="btn btn-info mr-2"
                                >
                                  Update
                                </button>
                              </Link>
                              <Link
                                to={`/recipes/${recipe.id}/`}
                                target={this.state.openInNewTab ? "_blank" : ""}
                              >
                                <button type="button" className="btn btn-info">
                                  View
                                </button>
                              </Link>
                            </div>
                            <div
                              className="btn-group"
                              role="group"
                              aria-label="Second group"
                            >
                              <button
                                type="button"
                                className="btn btn-danger"
                                onClick={() => this.deleteRecipe(recipe.id, i)}
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        ) : (
                          <Link
                            to={`/recipes/${recipe.id}/`}
                            target={this.state.openInNewTab ? "_blank" : ""}
                          >
                            <button type="button" className="btn btn-info">
                              View
                            </button>
                          </Link>
                        )}
                      </IfAuthenticated>
                      <IfNotAuthenticated>
                        <Link
                          to={`/recipes/${recipe.id}/`}
                          target={this.state.openInNewTab ? "_blank" : ""}
                        >
                          <button type="button" className="btn btn-info">
                            View
                          </button>
                        </Link>
                      </IfNotAuthenticated>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default RecipesList;
