export interface ISize {
  _id: string;
  size: 'S' | 'M' | 'L' | 'XL' | 'XXL';
  price: number;
  inStock: boolean;
  discountPrice: number;
  discountPercentage?: number;
  quantity: number;
  colors: string[];
}

export interface IProductImage {
  _id: string;
  imageUrl: string;
  file: Record<string, any>;
}

// Interface for the Product
export interface IProduct {
  _id: string;
  productName: string;
  slug: string;
  productDescription: string;
  productImages: IProductImage[];
  sizes: ISize[];
  category: string;
  avgReview: number;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}