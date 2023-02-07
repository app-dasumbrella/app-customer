/**
 * get product information based on shopid
 *
 * @format
 */

export default class SpotAPI {
  static getProductShopifyInfo = (id) => {
    return fetch(`https://spotui.com/api/v1/products/shopify/${id}`)
      .then((resp) => {
        return resp.json();
      })
      .then((data) => {
      ///  //console.log(data);
        return data;
      })
      .catch((error) => {
        console.warn(error);
        return {
          error: true,
          message: error,
        };
      });
  };
}
