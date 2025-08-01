export interface Dish {
  id: string | number;
  name: string;
  slug?: string;
  category: string;
  description: string;
  price: {
    amount: number;
    currency: string;
  };
  restaurant_id?: number;
  restaurant_name?: string;
  restaurant_link?: string;
  thumbnailUrl: string | null;
  images: string[];
  ingredients: string[];
  created_at?: string;
  updated_at?: string;
}

export type CartItem = {
  dish: Dish;
  quantity: number;
};

export type Cart = {
  items: CartItem[];
};

export type Order = {
  id: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'confirmed' | 'delivered';
  // Ajoutez d'autres champs selon le modèle fourni par le référent
};
