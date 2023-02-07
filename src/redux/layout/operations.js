/**
 * created by Inspire UI @author(dang@inspireui.com)
 * @format
 */

import * as actions from "./actions";
const CategoryData = {}
const productData = {}
const PER_PAGE = 10;
/**
 * fetch all product based on Config Horizontal
 * horizontal mode layout
 */
export const fetchAllProductsLayout = () => (dispatch) => {
  dispatch(actions.layoutAllPending());
  let promises = [];
  [].map((layout, index) => {
    // fetch articles
    if (!layout.categoryId && layout.type === "article") {
      return promises.push(dispatch(fetchArticlessLayout({ index })));
    }
    return promises.push(
      dispatch(
        fetchProductsLayout({
          categoryId: layout.categoryId,
          tagId: layout.tag,
          index,
        })
      )
    );
  });
  Promise.all(promises).then(() => {
    dispatch(actions.layoutAllSuccess());
  });
};

export const fetchFeatured = (app) => (dispatch) => {
  console.log('HRRER')
  let products = [],
    completelist = [];
  let list = app && app.categorysettings && app.categorysettings.categories && app.categorysettings.categories.list || []

  list.map((item, index) => {
    products = [];
    item.products.map((ids) => {
      app && app.productsettings && app.productsettings.list && app.productsettings.list.map((res) => {
        if (res.id === ids) {
          products.push(res);
        }
      });
    });
    completelist.push({ list: products, name: item.name });
  });

  dispatch(actions.layoutAllfeature(completelist));
  return [];
};

/**
 * load more
 */
export const fetchProductLayoutNextPage = ({ cursor, index, categoryId }) => (
  dispatch
) => {
  dispatch(actions.loadMorePending({ index, id: categoryId }));
  return [];
};

/**
 * @function fetchArticlessLayout
 */
export const fetchArticlessLayout = ({ index, cursor }) => (dispatch) => {
  return [];
};

/**
 * @function fetchArticlessLayoutNextPage
 */
export const fetchArticlessLayoutNextPage = ({ index, cursor }) => (
  dispatch
) => {
  return [];
};
