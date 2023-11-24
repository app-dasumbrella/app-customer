/**
 * created by Inspire UI @author(dang@inspireui.com)
 * @format
 */

export const getTotalQuantity = (carts) => {
  return carts.reduce((accumulator, item) => accumulator + item.quantity, 0);
};

export const getCartItemsWithProduct = (carts, product) => {
  return {
    cartItems: carts,
    product,
  };
};

export const isExistedItem = (cartItem, item) => {
  if (cartItem && item) return cartItem.variant.id === item.id;
};

/**
 * @function getCartItems and check isExisted
 */
export const getCartItems = (cartItems, item) => {
  const isExisted = cartItems.some((cartItem) => isExistedItem(cartItem, item));

  if (isExisted) {
    return cartItems.map((o) => {
      return {
        ...o,
        quantity: o.quantity + 1,
      };
    });
  }

  return [...cartItems, item];
};
