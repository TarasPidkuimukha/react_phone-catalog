export interface Product {
  id: number;
  category: 'phones' | 'tablets' | 'accessories';
  itemId: string;
  name: string;
  fullPrice: number;
  price: number;
  capacity: string;
  color: string;
  ram: string;
  year: number;
  image: string;
}

export interface Description {
  title: string;
  text: string[];
}

export interface ProductDetails {
  id: string;
  category: string;
  namespaceId: string;
  name: string;
  capacityAvailable: string[];
  capacity: string;
  priceRegular: number;
  priceDiscount: number;
  colorsAvailable: string[];
  color: string;
  images: string[];
  description: string[];
  screen: string;
  resolution: string;
  processor: string;
  ram: string;
  camera: string;
  zoom: string;
  cell: string[];
}
