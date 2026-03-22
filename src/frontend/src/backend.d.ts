import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface backendInterface {
    _initializeAccessControlWithSecret(token: string): Promise<void>;
    getProducts(): Promise<any[]>;
    addProduct(name: string, category: string, price: bigint, stock: bigint, colorHex: string, imageUrl: string): Promise<any>;
    updateProduct(id: bigint, name: string, category: string, price: bigint, stock: bigint, colorHex: string, imageUrl: string): Promise<boolean>;
    deleteProduct(id: bigint): Promise<boolean>;
    getOrders(): Promise<any[]>;
    addOrder(customer: string, email: string, date: string, amount: string, status: string): Promise<any>;
    updateOrder(id: string, customer: string, email: string, date: string, amount: string, status: string): Promise<boolean>;
    deleteOrder(id: string): Promise<boolean>;
    getCustomers(): Promise<any[]>;
    addCustomer(name: string, email: string, phone: string, totalOrders: bigint, totalSpent: string, joinDate: string): Promise<any>;
    updateCustomer(id: bigint, name: string, email: string, phone: string, totalOrders: bigint, totalSpent: string, joinDate: string): Promise<boolean>;
    deleteCustomer(id: bigint): Promise<boolean>;
}
