export interface Dish {
  id: string;
  name: string;
  category: string;
  description: string;
  price: {
    amount: number;
    currency: string;
  };
  thumbnailUrl: string;
  images: string[];
  ingredients: string[];
}
