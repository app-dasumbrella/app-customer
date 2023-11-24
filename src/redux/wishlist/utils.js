/**
 * created by Inspire UI @author(dang@inspireui.com)
 * @format
 */

export const compareWishList = (item, action) => {
  return item.product.id === action.payload.product.id;
};
