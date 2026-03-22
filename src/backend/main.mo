import Array "mo:base/Array";
import Nat "mo:base/Nat";

actor {

  public type Product = {
    id : Nat;
    name : Text;
    category : Text;
    price : Nat;
    stock : Nat;
    colorHex : Text;
  };

  public type Order = {
    id : Text;
    customer : Text;
    email : Text;
    date : Text;
    amount : Text;
    status : Text;
  };

  public type Customer = {
    id : Nat;
    name : Text;
    email : Text;
    phone : Text;
    totalOrders : Nat;
    totalSpent : Text;
    joinDate : Text;
  };

  var products : [Product] = [
    { id = 1; name = "Beras Premium 5kg"; category = "Sembako"; price = 75000; stock = 120; colorHex = "#3b82f6" },
    { id = 2; name = "Minyak Goreng 2L"; category = "Sembako"; price = 32000; stock = 85; colorHex = "#22c55e" },
    { id = 3; name = "Gula Pasir 1kg"; category = "Sembako"; price = 15000; stock = 200; colorHex = "#a855f7" },
    { id = 4; name = "Tepung Terigu 1kg"; category = "Bahan Kue"; price = 12000; stock = 150; colorHex = "#f59e0b" },
    { id = 5; name = "Kopi Robusta 250g"; category = "Minuman"; price = 28000; stock = 60; colorHex = "#ef4444" },
  ];

  var orders : [Order] = [
    { id = "#ORD-1"; customer = "Budi Santoso"; email = "budi@gmail.com"; date = "20 Mar 2026"; amount = "Rp 150.000"; status = "Selesai" },
    { id = "#ORD-2"; customer = "Siti Rahayu"; email = "siti@gmail.com"; date = "19 Mar 2026"; amount = "Rp 85.000"; status = "Diproses" },
    { id = "#ORD-3"; customer = "Agus Wijaya"; email = "agus@gmail.com"; date = "18 Mar 2026"; amount = "Rp 210.000"; status = "Selesai" },
    { id = "#ORD-4"; customer = "Dewi Lestari"; email = "dewi@gmail.com"; date = "18 Mar 2026"; amount = "Rp 45.000"; status = "Tertunda" },
    { id = "#ORD-5"; customer = "Rudi Hartono"; email = "rudi@gmail.com"; date = "17 Mar 2026"; amount = "Rp 320.000"; status = "Selesai" },
    { id = "#ORD-6"; customer = "Ani Susanti"; email = "ani@gmail.com"; date = "17 Mar 2026"; amount = "Rp 95.000"; status = "Dibatalkan" },
    { id = "#ORD-7"; customer = "Hendra Gunawan"; email = "hendra@gmail.com"; date = "16 Mar 2026"; amount = "Rp 175.000"; status = "Selesai" },
    { id = "#ORD-8"; customer = "Maya Indah"; email = "maya@gmail.com"; date = "15 Mar 2026"; amount = "Rp 60.000"; status = "Diproses" },
  ];

  var customers : [Customer] = [
    { id = 1; name = "Budi Santoso"; email = "budi@gmail.com"; phone = "081234567890"; totalOrders = 5; totalSpent = "Rp 750.000"; joinDate = "10 Jan 2025" },
    { id = 2; name = "Siti Rahayu"; email = "siti@gmail.com"; phone = "082345678901"; totalOrders = 3; totalSpent = "Rp 320.000"; joinDate = "15 Feb 2025" },
    { id = 3; name = "Agus Wijaya"; email = "agus@gmail.com"; phone = "083456789012"; totalOrders = 8; totalSpent = "Rp 1.450.000"; joinDate = "5 Jan 2025" },
    { id = 4; name = "Dewi Lestari"; email = "dewi@gmail.com"; phone = "084567890123"; totalOrders = 2; totalSpent = "Rp 130.000"; joinDate = "20 Mar 2025" },
    { id = 5; name = "Rudi Hartono"; email = "rudi@gmail.com"; phone = "085678901234"; totalOrders = 12; totalSpent = "Rp 2.100.000"; joinDate = "3 Des 2024" },
  ];

  var nextProductId : Nat = 6;
  var nextCustomerId : Nat = 6;
  var nextOrderSeq : Nat = 9;

  // Products

  public query func getProducts() : async [Product] {
    products
  };

  public func addProduct(name : Text, category : Text, price : Nat, stock : Nat, colorHex : Text) : async Product {
    let p : Product = { id = nextProductId; name; category; price; stock; colorHex };
    products := Array.append(products, [p]);
    nextProductId += 1;
    p
  };

  public func updateProduct(id : Nat, name : Text, category : Text, price : Nat, stock : Nat, colorHex : Text) : async Bool {
    let found = Array.find(products, func(p : Product) : Bool { p.id == id });
    switch (found) {
      case null { false };
      case (?_) {
        products := Array.map(products, func(p : Product) : Product {
          if (p.id == id) { { id; name; category; price; stock; colorHex } } else { p }
        });
        true
      };
    }
  };

  public func deleteProduct(id : Nat) : async Bool {
    let before = products.size();
    products := Array.filter(products, func(p : Product) : Bool { p.id != id });
    products.size() < before
  };

  // Orders

  public query func getOrders() : async [Order] {
    orders
  };

  public func addOrder(customer : Text, email : Text, date : Text, amount : Text, status : Text) : async Order {
    let id = "#ORD-" # Nat.toText(nextOrderSeq);
    let o : Order = { id; customer; email; date; amount; status };
    orders := Array.append([o], orders);
    nextOrderSeq += 1;
    o
  };

  public func updateOrder(id : Text, customer : Text, email : Text, date : Text, amount : Text, status : Text) : async Bool {
    let found = Array.find(orders, func(o : Order) : Bool { o.id == id });
    switch (found) {
      case null { false };
      case (?_) {
        orders := Array.map(orders, func(o : Order) : Order {
          if (o.id == id) { { id; customer; email; date; amount; status } } else { o }
        });
        true
      };
    }
  };

  public func deleteOrder(id : Text) : async Bool {
    let before = orders.size();
    orders := Array.filter(orders, func(o : Order) : Bool { o.id != id });
    orders.size() < before
  };

  // Customers

  public query func getCustomers() : async [Customer] {
    customers
  };

  public func addCustomer(name : Text, email : Text, phone : Text, totalOrders : Nat, totalSpent : Text, joinDate : Text) : async Customer {
    let c : Customer = { id = nextCustomerId; name; email; phone; totalOrders; totalSpent; joinDate };
    customers := Array.append(customers, [c]);
    nextCustomerId += 1;
    c
  };

  public func updateCustomer(id : Nat, name : Text, email : Text, phone : Text, totalOrders : Nat, totalSpent : Text, joinDate : Text) : async Bool {
    let found = Array.find(customers, func(c : Customer) : Bool { c.id == id });
    switch (found) {
      case null { false };
      case (?_) {
        customers := Array.map(customers, func(c : Customer) : Customer {
          if (c.id == id) { { id; name; email; phone; totalOrders; totalSpent; joinDate } } else { c }
        });
        true
      };
    }
  };

  public func deleteCustomer(id : Nat) : async Bool {
    let before = customers.size();
    customers := Array.filter(customers, func(c : Customer) : Bool { c.id != id });
    customers.size() < before
  };

};
