/**
 * Format data to sync all data
 *
 * @format
 */
import { cloneDeep } from "lodash";

const formatProduct = (item) => {
  try {
    const newItem = cloneDeep(item);
    const { images, options, availableForSale } = item;
    // select default value price
    const { price, compareAtPrice } = item.variants&&item.variants[0];

    newItem.defaultImage = images&&images[0] ? images&&images[0].src : null;

    // price
    newItem.price = price;
    newItem.salePrice = price;
    newItem.onSale = compareAtPrice && compareAtPrice !== price;
    newItem.regularPrice = compareAtPrice; // default price
    newItem.inStock = availableForSale;

    newItem.averageRating = 0;
    newItem.ratingCount = 0;
    newItem.attributes = options
      ? options.map((option) => ({
          name: option.name,
          options: option.values,
        }))
      : [];

    return newItem;
  } catch (error) {
    console.warn(error);
  }
};

export default formatProduct;
