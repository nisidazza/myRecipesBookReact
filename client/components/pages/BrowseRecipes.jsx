import React from "react";
import {
  apiGetRecipes,
  apiGetPublicRecipes,
  apiGetUserPrivateRecipes,
} from "../../apis/recipesApi";
import RecipesList from "../common/RecipesList";
import { IfAuthenticated} from "../common/utilities/Authenticated";

class BrowseRecipes extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      recipes: [],
      randomKeyToReconstructComponent: 0,
      options: [
        {
          name: "All",
          value: "all",
        },
        {
          name: "Public",
          value: "public",
        },
        {
          name: "Private",
          value: "private",
        },
      ],
      selectedOption: "all",
    };
  }

  componentDidMount() {
    this.fetchRecipes();

    let event = new CustomEvent("pageHasChanged", {
      detail: { pageTitle: "Recipes List" },
    });
    document.dispatchEvent(event);

    document.addEventListener(
      "logOff",
      (e) => {
        this.fetchRecipes();
      },
      false
    );
  }

  handleSelectedOption = (e) => {
    this.setState({
      selectedOption: e.target.value,
    });
    this.fetchRecipes(e.target.value);
  };

  fetchRecipes = (type) => {
    let randomKeyToReconstructComponent = Math.random();
    let recipesRetrieveFunction;
    if (!type || type == "all") {
      recipesRetrieveFunction = apiGetRecipes;
    } else if (type == "public") {
      recipesRetrieveFunction = apiGetPublicRecipes;
    } else if (type == "private") {
      recipesRetrieveFunction = apiGetUserPrivateRecipes;
    }
    recipesRetrieveFunction().then((recipes) => {
      this.setState({
        recipes: recipes,
        randomKeyToReconstructComponent,
      });
    });
  };

  render() {
    return (
      <>
        <div id="BrowseRecipes-jsx-component">
          <IfAuthenticated>
            <div className="form-group mt-4">
              <select
                className="form-control col-sm-4"
                id={"recipesListOptions"}
                value={this.state.selectedOption}
                onChange={this.handleSelectedOption}
              >
                {this.state.options.map((option) => {
                  return (
                    <option key={option.value} value={option.value}>
                      {option.name}
                    </option>
                  );
                })}
              </select>
            </div>
          </IfAuthenticated>
          <RecipesList
            recipes={this.state.recipes}
            key={this.state.randomKeyToReconstructComponent}
          />
        </div>
      </>
    );
  }
}

export default BrowseRecipes;
