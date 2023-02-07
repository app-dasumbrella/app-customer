/**
 * created by Inspire UI @author(dang@inspireui.com)
 * @format
 */

import { findIndex } from "lodash";

/**
 * @function getIndex
 */
export const getIndex = (list, meta) => {
  if (meta && meta.index) return meta.index;

  const index = findIndex(list, (o) => {
    return o.categoryId === meta.id;
  });

  return index;
};
