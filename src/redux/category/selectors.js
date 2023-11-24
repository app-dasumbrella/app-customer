/**
 * created by Inspire UI @author(dang@inspireui.com)
 * @format
 */

import { createSelector } from "reselect";

/**
 * reuse from layout and products store
 */
const getDataLayoutSelector = (state, categoryId) => {
  const data = state.layout.layout.find((o) => {
    return o.categoryId === categoryId;
  });

  if (!data) return state.products.list;

  return data;
};

const getDataCategoryIdSelector = createSelector(
  getDataLayoutSelector,
  (layout) => {
    if (layout && layout.list) {
      return layout.list;
    }
    return [];
  }
);

const getHasNextPageCategoryIdSelector = createSelector(
  getDataLayoutSelector,
  (layout) => {
    return layout ? layout.hasNextPage : false;
  }
);

const getCursorCategoryIdSelector = createSelector(
  getDataLayoutSelector,
  (layout) => {
    return layout ? layout.cursor : null;
  }
);

const getIsFetchingCategoryIdSelector = createSelector(
  getDataLayoutSelector,
  (layout) => {
    return layout ? layout.isFetching : false;
  }
);

const getErrorCategoryIdSelector = createSelector(
  getDataLayoutSelector,
  (layout) => {
    return layout ? layout.error : null;
  }
);

export {
  getDataCategoryIdSelector,
  getHasNextPageCategoryIdSelector,
  getCursorCategoryIdSelector,
  getIsFetchingCategoryIdSelector,
  getErrorCategoryIdSelector,
};
