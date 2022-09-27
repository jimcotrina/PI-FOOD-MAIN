import axios from 'axios';

export function getRecipes() {
  return async function (dispatch) {
    let json = await axios.get('http://localhost:3050/recipes', {});
    return dispatch({
      type: 'GET_RECIPES',
      payload: json.data,
    });
  };
}

export function getNameRecipes(name) {
  return async function (dispatch) {
    try {
      let json = await axios.get('http://localhost:3050/recipes?name=' + name);
      return dispatch({
        type: 'GET_NAME_RECIPES',
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getDiets() {
  return async function (dispatch) {
    let info = await axios.get('http://localhost:3050/diets', {});
    return dispatch({ type: 'GET_DIETS', payload: info.data });
  };
}

export function postRecipe(payload) {
  return async function (dispatch) {
    const response = await axios.post('http://localhost:3050/recipes', payload);
    return response;
  };
}

export function orderByName(payload) {
  return {
    type: 'ORDER_BY_NAME',
    payload,
  };
}

export function getHealthScore(payload) {
  return {
    type: 'GET_HEALTHSCORE',
    payload,
  };
}

export function filterDiets(payload) {
  return {
    type: 'FILTER_DIETS',
    payload,
  };
}

export function getDetail(id) {
  return async function (dispatch) {
    try {
      let res = await axios.get('http://localhost:3050/recipes/' + id);
      return dispatch({
        type: 'GET_DETAILS',
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function pageDetail(data = {}) {
  return {
    type: 'PAGE_DETAIL',
    payload: data
  };
}
