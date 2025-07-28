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
