/**
 * created by Inspire UI @author(dang@inspireui.com)
 * @format
 */

import { isArray } from "lodash";
import { formatProduct } from "@data";

/**
 * @function getCursor
 */
export const getCursor = (data) => {
  let lastItem = "";
  const items = data.edges;
  if (isArray(items) && items.length > 0) {
    lastItem = items[items.length - 1];
  } else {
    return null;
  }

  const { cursor } = lastItem;

  return cursor;
};

/**
 * @function getHasNextPage
 */
export const getHasNextPage = (data) => {
  return data.pageInfo.hasNextPage;
};

/**
 * @function convertProductModelFromCheckout
 */
export const convertProductModelFromCheckout = (model) => {
  if (!model || (model && !model.checkout)) return null;
  const newLineItems = [];
  model.checkout.lineItems.map((o) => {
    newLineItems.push({
      ...o,
      variant: {
        ...o.variant,
        product: formatProduct(o.variant.product),
      },
    });
  });
  const newCheckout = {
    ...model.checkout,
    lineItems: newLineItems,
  };
  return newCheckout;
};

/**
 * @function formatError
 */
export const formatError = (errors) => {
  if (isArray(errors)) {
    return {
      error: errors[0] && errors[0].message,
    };
  }
  return null;
};

/**
 * @param data response api
 * @param field namespace of field
 * @returns {data, error}
 */
export const checkAndFormatData = (data, field) => {
  if (data.errors && data.errors.length > 0) {
    return formatError(data.errors);
  }

  const dataFromField = data.model[field];
  if (!dataFromField) {
    console.warn("Please check your collection id");
  }

  if (
    dataFromField &&
    dataFromField.userErrors &&
    dataFromField.userErrors.length > 0
  ) {
    return formatError(dataFromField.userErrors);
  }

  return dataFromField;
};
