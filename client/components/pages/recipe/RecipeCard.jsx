import React from "react";
import { Link } from "react-router-dom";
import { IfAuthenticated, IfNotAuthenticated } from "../../common/utilities/Authenticated";
import { getDecodedToken } from "authenticare/client";
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class RecipeCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modal: false
    }
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    })
  }

  handleDeleteConfirmation = () => {
    this.props.onClickDelete()
    this.setState({
      modal: false
    })
  }


  render() {
    let {recipe, openInNewTab} = this.props
    const decodedToken = getDecodedToken();
    let userId = -1;
    if (decodedToken) {
      userId = decodedToken.id;
    }
    return (
      <div className="col-lg-4">
        <div className="card w-65 mx-auto mt-3" id="recipe-card">
          <img
            className="card-img-top"
            src={recipe.img_url ? recipe.img_url : "images/test-image.png"}
            alt="Recipe Image"
            height="250px"
            style={{ objectFit: "cover" }}
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
                        target={openInNewTab ? "_blank" : ""}
                      >
                        <button type="button" className="btn btn-info mr-2">
                          Update
                        </button>
                      </Link>
                      <Link
                        to={`/recipes/${recipe.id}/`}
                        target={openInNewTab ? "_blank" : ""}
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
                        onClick={this.toggle}
                      >
                        Delete
                      </button>
                      <Modal isOpen={this.state.modal} toggle={this.toggle}>
                        <ModalHeader toggle={this.toggle}>ARE YOU SURE?</ModalHeader>
                        <ModalBody>
                          Would you like to delete this recipe?
                        </ModalBody>
                        <ModalFooter>
                          <button type="button"
                        className="btn btn-danger"
                        onClick={this.handleDeleteConfirmation}
                        >
                        Confirm Delete
                        </button>
                        <button type="button" className="btn btn-info" onClick={this.toggle}>Cancel</button>
                        </ModalFooter>
                      </Modal>
                    </div>
                  </div>
                ) : (
                  <Link
                    to={`/recipes/${recipe.id}/`}
                    target={openInNewTab ? "_blank" : ""}
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
                  target={!openInNewTab ? "_blank" : ""}
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
  }
}

export default RecipeCard;
