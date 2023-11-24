/** @format */

/**
 * Format data to sync all data
 */
export default class Category {
  constructor(item) {
    try {
      const { id, title, description, image, products } = item;

      this.id = id;
      this.title = title;
      this.description = description;
      this.image = image;
    } catch (error) {
      console.warn(error, item);
    }
  }
}
