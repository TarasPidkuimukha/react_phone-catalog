import { Product, ProductDetails } from '../Types/types';
export function getProducts(): Promise<Product[]> {
  return fetch(
    `${import.meta.env.BASE_URL}/api/products.json`,
  ).then(response => {
    if (response.ok) {
      return response.json();
    }
    throw new Error('Failed to fetch products');
  });
}
export function getProductsByCategory(
  category: 'phones' | 'tablets' | 'accessories',
): Promise<ProductDetails[]> {
  return fetch(
    `${import.meta.env.BASE_URL}/api/${category}.json`,
  ).then(response => {
    if (response.ok) {
      return response.json();
    }
    throw new Error('Failed to fetch products');
  });
}
