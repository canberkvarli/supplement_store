export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: "protein" | "vitamins" | "pre-workout" | "post-workout" | "weight-management" | "health-wellness";
  bestseller: boolean;
  image: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  customerName: string;
  email: string;
  address: string;
  products: CartItem[];
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  date: string;
  total: number;
}

