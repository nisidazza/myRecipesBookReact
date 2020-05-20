import React from "react";
import { apiGetRecipes} from "../../apis/recipesApi";
import RecipesList from "../common/RecipesList";

class BrowseRecipes extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      recipes: [],
      randomNumber: 0,
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
    console.log("event target value: " + e.target.value);
   
  };

  fetchRecipes = () => {
    let randomNumber = Math.random();
      apiGetRecipes().then((allRecipes) => {
        this.setState({
          recipes : allRecipes,
          randomNumber,
        });
      })
  }

  render() {
    console.log("selectedOption: " + this.state.selectedOption);
    return (
      <>
        <div id="BrowseRecipes-jsx-component">
          <div className="form-group mt-4">
            <label htmlFor="recipesListOptions">Select</label>
            <select
              className="form-control"
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

          <RecipesList
            recipes={this.state.recipes}
            key={this.state.randomNumber}
            openInNewTab={false}
          />
        </div>
      </>
    );
  }
}

export default BrowseRecipes;
