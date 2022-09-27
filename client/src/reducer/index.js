const initialState = {
  recipes: [],
  allRecipes: [],
  diets: [],
  detail: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case 'GET_RECIPES':
      return {
        ...state,
        recipes: action.payload,
        allRecipes: action.payload,
      };
    case 'GET_NAME_RECIPES':
      return {
        ...state,
        recipes: action.payload,
      };
    case 'GET_DIETS':
      return {
        ...state,
        diets: action.payload,
      };
    case 'GET_DETAILS':
      return {
        ...state,
        detail: action.payload,
      };
    case 'POST_RECIPE':
      return {
        ...state,
      };
    case 'FILTER_DIETS':
      const filterRecipes = state.allRecipes;
      const filterDiets = filterRecipes.filter((e) => {
        return e.diets?.includes(action.payload);
      });
      return {
        ...state,
        recipes: action.payload === 'All diets' ? filterRecipes : filterDiets,
      };
    case 'ORDER_BY_NAME':
      let sortedArr =
        action.payload === 'A-Z'
          ? state.recipes.sort(function (a, b) {
              if (a.name > b.name) {
                return 1;
              }
              if (b.name > a.name) {
                return -1;
              }
              return 0;
            })
          : state.recipes.sort(function (a, b) {
              if (a.name > b.name) {
                return -1;
              }
              if (b.name > a.name) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        recipes: sortedArr,
      };
    case 'GET_HEALTHSCORE':
      let sortArr =
        action.payload === 'L-H'
          ? state.recipes.sort(function (a, b) {
              if (a.healthScore > b.healthScore) {
                return 1;
              }
              if (b.healthScore > a.healthScore) {
                return -1;
              }
              return 0;
            })
          : state.recipes.sort(function (a, b) {
              if (a.healthScore > b.healthScore) {
                return -1;
              }
              if (b.healthScore > a.healthScore) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        recipes: sortArr,
      };
    case 'PAGE_DETAIL':
      return {
        ...state,
        detail: action.payload,
      };

    default:
      return state;
  }
}

export default rootReducer;
