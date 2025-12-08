export type Shopper = {
  user_id: number;
  user_name: string;
  user_email: string;
  role: string;
  user_address?: string | null;
  user_phone?: string | null;
};

export type StoredCartItem = {
  product_id: number;
  name: string;
  price: number;
  quantity: number;
  stock_quantity: number;
  image_url?: string | null;
};

export type CartSummary = {
  cart_id: number;
  user_id: number;
  cartItems?: Array<{
    cart_item_id: number;
    product_id: number;
    quantity: number;
  }>;
};
