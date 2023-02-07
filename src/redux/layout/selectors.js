/**
 * created by Inspire UI @author(dang@inspireui.com)
 * @format
 */

import { createSelector } from "reselect";

const getLayoutSelector = (state, index) => state.layout.featuredlist[index];

const getlayoutIndexSelector = createSelector(getLayoutSelector, (layout) => {
  if (layout && layout.list) {
    return layout.list;
  }
  return [];
});

const getHasNextPageIndexSelector = createSelector(
  getLayoutSelector,
  (layout) => {
    return layout.hasNextPage;
  }
);

const getCursorIndexSelector = createSelector(getLayoutSelector, (layout) => {
  return layout.cursor;
});

const getIsFetchingIndexSelector = createSelector(
  getLayoutSelector,
  (layout) => {
    return layout.isFetching;
  }
);

const getCategoryIdIndexSelector = createSelector(
  getLayoutSelector,
  (layout) => {
    return layout.categoryId;
  }
);

export {
  getlayoutIndexSelector,
  getHasNextPageIndexSelector,
  getCursorIndexSelector,
  getIsFetchingIndexSelector,
  getCategoryIdIndexSelector,
};
