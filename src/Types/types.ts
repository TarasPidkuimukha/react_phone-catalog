export interface Product {
  id: number;
  category: 'phones' | 'tablets' | 'accessories';
  namespaceId: string;
  name: string;
  capacityAvailable: string[];
  capacity: string;
  price: number;
  priceDiscount: number;
  colorsAvailable: string[];
  year: number;
  color: string;
  images: string[];
  description: DescriptionItem[];
  screen: string;
  resolution: string;
  processor: string;
  ram: string;
  cell: string[];
  camera?: string;
  zoom?: string;
}

export interface DescriptionItem {
  title: string;
  text: string[];
}
