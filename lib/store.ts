import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartItem, Order } from "./types";
import { initialOrders } from "./data";

interface CartStore {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getTotal: () => number;
  getItemCount: () => number;
}

interface OrderStore {
  orders: Order[];
  addOrder: (order: Order) => void;
  updateOrderStatus: (orderId: string, status: Order["status"]) => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) => {
        const existingItem = get().items.find((i) => i.product.id === item.product.id);
        if (existingItem) {
          // If item exists and quantity would exceed 1, don't add
          if (existingItem.quantity >= 1) {
            return;
          }
          set({
            items: get().items.map((i) =>
              i.product.id === item.product.id ? { ...i, quantity: 1 } : i
            ),
          });
        } else {
          set({ items: [...get().items, { ...item, quantity: 1 }] });
        }
      },
      removeItem: (productId) => {
        set({ items: get().items.filter((i) => i.product.id !== productId) });
      },
      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }
        // Enforce single quantity limit per product (max 1)
        if (quantity > 1) {
          quantity = 1;
        }
        set({
          items: get().items.map((i) =>
            i.product.id === productId ? { ...i, quantity } : i
          ),
        });
      },
      clearCart: () => {
        set({ items: [] });
      },
      getTotal: () => {
        return get().items.reduce((total, item) => total + item.product.price * item.quantity, 0);
      },
      getItemCount: () => {
        return get().items.reduce((count, item) => count + item.quantity, 0);
      },
    }),
    {
      name: "cart-storage",
    }
  )
);

export const useOrderStore = create<OrderStore>()(
  persist(
    (set) => ({
      orders: initialOrders,
      addOrder: (order) => {
        set((state) => ({ orders: [order, ...state.orders] }));
      },
      updateOrderStatus: (orderId, status) => {
        set((state) => ({
          orders: state.orders.map((order) =>
            order.id === orderId ? { ...order, status } : order
          ),
        }));
      },
    }),
    {
      name: "order-storage",
    }
  )
);

