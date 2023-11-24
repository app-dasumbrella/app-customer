/**
 * created by Inspire UI @author(dang@inspireui.com)
 * @format
 */

import * as actions from "./actions";

/**
 * @function getCountries get all country code
 */
export const getCountries = () => (dispatch) => {
  dispatch(actions.countryPending());
  try {
    fetch("https://restcountries.eu/rest/v1/all")
      .then((response) => response.json())
      .then((json) => {
        if (json.length !== 0) {
          const data = {};
          for (const country of json) {
            data[`${country.alpha2Code}`] = country.name;
          }
          dispatch(actions.countrySuccess(data));
        }
      });
  } catch (error) {
    dispatch(actions.countryFailure(error));
  }
};
