/** @format */

import * as actions from "./actions";
const categoryData = {}
/**
 *  @function fetchCategories
 *
 * @param {*} { }
 */
export const fetchCategories = (app) => (dispatch) => {
  try {
    //console.log(app)
    dispatch(actions.categoryPending());
    dispatch(actions.categorySuccess(app && app.categorysettings && app.categorysettings.categories && app.categorysettings.categories.list));
  } catch (error) {
    dispatch(actions.categoryFailure(error));
  }
};
