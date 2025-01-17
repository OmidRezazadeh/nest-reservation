
export const RedisKeys = {
  PRODUCTS_LIST: 'products:list',
  PRODUCT_BY_ID: (id: number | string) => `products:${id}`,
};