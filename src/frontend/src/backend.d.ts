import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Cart {
    products: Array<CartItem>;
}
export interface CartItem {
    productId: bigint;
    quantity: bigint;
}
export interface Product {
    id: bigint;
    name: string;
    description: string;
    category: string;
    price: bigint;
}
export interface backendInterface {
    addNewsletter(email: string): Promise<void>;
    addProduct(name: string, description: string, price: bigint, category: string): Promise<bigint>;
    addToCart(productId: bigint, quantity: bigint): Promise<void>;
    clearCart(): Promise<void>;
    getAllProducts(): Promise<Array<Product>>;
    getMyCart(): Promise<Cart | null>;
    getProduct(productId: bigint): Promise<Product>;
    getProductsByCategory(category: string): Promise<Array<Product>>;
    placeOrder(): Promise<bigint>;
    removeFromCart(productId: bigint): Promise<void>;
}
