import React from "react";
import { apiGetLatestRecipes } from "../../apis/recipesApi";

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
        <div className="row m-0 pl-2">
          <div className="col-md-8">
            <div className="embed-responsive embed-responsive-21by9">
            <iframe class="embed-responsive-item" src="https://www.youtube.com/embed/ahCB_8OARCI"></iframe>
            </div>
          </div>
          <div className="col-6 col-md-4"></div>
        </div>
        <div className="latest-recipes-container">
          <div className="row m-0 pl-2">
            <h5 className="m-0">Latest Recipes</h5>
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
                    <div className="card-body p-2">
                      <h6 className="card-title mb-2 text-md-left">
                        <strong>{recipe.title}</strong>
                      </h6>
                      <p className="card-subtitle mb-0 text-muted">
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
