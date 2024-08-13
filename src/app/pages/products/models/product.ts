export interface Product {
  id?: string;
  title: string;
  price: number;
  category: string;
  description: string;
  image: string[];
  brand: string;
  discountPercentage?: number;
  rating?: number;
  stock?: number;
  availabilityStatus?: string;
  minimumOrderQuantity?: number;
  returnPolicy?: string;
  warrantyInformation?: string;
  shippingInformation?: string;
  dimensions?: {
    width: number;
    height: number;
    depth: number;
  };
  weight?: number;
  tags?: string[];
  images?: string[];
  reviews?: {
    rating: number;
    comment: string;
    date: string;
  }[];
  sku?: string;
  meta?: {
    createdAt: string;
    updatedAt: string;
  };
}
