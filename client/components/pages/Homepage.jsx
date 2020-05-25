import React from "react";
import { apiGetLatestRecipes } from "../../apis/recipesApi";
import { Link } from "react-router-dom";

class Homepage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      recipes: [],
    };
  }

  componentDidMount() {
    apiGetLatestRecipes().then((recipes) => {
      this.setState({
        recipes: recipes,
      });
    });

    let event = new CustomEvent("pageHasChanged", {
      detail: { pageTitle: "Home" },
    });
    document.dispatchEvent(event);
  }

  render() {
    return (
      <div id="Homepage-jsx-component">
        <div className="demo-features-container">
          <div className="row m-0 pl-2">
            <div className="col-md-8 pl-0">
              <div className="row main-title m-0 pl-2">
                <h5 className="m-0">Watch the Demo!</h5>
              </div>
              <div className="embed-responsive embed-responsive-21by9">
                <iframe
                  className="embed-responsive-item pl-2 pt-3"
                  src="https://www.youtube.com/embed/ahCB_8OARCI"
                ></iframe>
              </div>
            </div>
            <div className="col-6 col-md-4">
              <div className="row main-title m-0 pl-2">
                <h5 className="m-0">Features</h5>
              </div>
              <div className="features-container">
                <div className="card">
                  <div className="card-body features p-1">
                    <h5 className="card-title features-title">About</h5>
                    <h6 className="card-subtitle features-subtitle mb-2 text-muted">
                     My Recipe Book - Your personal recipe organiser.
                    </h6>
                    <p className="card-text mb-1">
                      Save your favourite recipes from different websites all in one place,
                      share them with other people or make them private!
                    </p>
                    <Link to="/register" target="_blank" className="card-link">
                      Register Now!
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="latest-recipes-container">
          <div className="row main-title m-0 pl-2">
            <h5 className="m-0">Check out some of the latest recipes!</h5>
          </div>
          <div className="row m-0 row-cols-5">
            {this.state.recipes.map((recipe, i) => {
              return (
                <div className="col p-0" key={i}>
                  <div
                    className="card mx-auto mt-3"
                    style={{ width: "14em" }}
                    id="recipe-card"
                  >
                    <Link to={`/recipes/${recipe.id}`} target="_blank">
                      <img
                        className="card-img-top"
                        src={
                          recipe.img_url
                            ? recipe.img_url
                            : "images/test-image.png"
                        }
                        alt="Recipe Image"
                        height="200em"
                        style={{ objectFit: "cover" }}
                      />
                    </Link>
                    <div className="card-body p-2">
                      <h6 className="card-title latest-title mb-2 text-md-left">
                        <strong>{recipe.title}</strong>
                      </h6>
                      <p className="card-subtitle latest-subtitle mb-0 text-muted">
                        Category: {recipe.category}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default Homepage;
