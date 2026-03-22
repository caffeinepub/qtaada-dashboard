import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface Product {
  id: bigint;
  name: string;
  category: string;
  price: bigint;
  stock: bigint;
  colorHex: string;
}

export interface Order {
  id: string;
  customer: string;
  email: string;
  date: string;
  amount: string;
  status: string;
}

export interface Customer {
  id: bigint;
  name: string;
  email: string;
  phone: string;
  totalOrders: bigint;
  totalSpent: string;
  joinDate: string;
}

export interface _SERVICE {
  getProducts: ActorMethod<[], Product[]>;
  addProduct: ActorMethod<[string, string, bigint, bigint, string], Product>;
  updateProduct: ActorMethod<[bigint, string, string, bigint, bigint, string], boolean>;
  deleteProduct: ActorMethod<[bigint], boolean>;

  getOrders: ActorMethod<[], Order[]>;
  addOrder: ActorMethod<[string, string, string, string, string], Order>;
  updateOrder: ActorMethod<[string, string, string, string, string, string], boolean>;
  deleteOrder: ActorMethod<[string], boolean>;

  getCustomers: ActorMethod<[], Customer[]>;
  addCustomer: ActorMethod<[string, string, string, bigint, string, string], Customer>;
  updateCustomer: ActorMethod<[bigint, string, string, string, bigint, string, string], boolean>;
  deleteCustomer: ActorMethod<[bigint], boolean>;
}

export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: ({ IDL }: { IDL: IDL }) => IDL.Type[];
