import Nat "mo:core/Nat";
import Text "mo:core/Text";
import List "mo:core/List";
import Iter "mo:core/Iter";
import Order "mo:core/Order";
import Map "mo:core/Map";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";

actor {
  type Product = {
    id : Nat;
    name : Text;
    description : Text;
    price : Nat;
    category : Text;
  };

  module Product {
    public func compareById(product1 : Product, product2 : Product) : Order.Order {
      Nat.compare(product1.id, product2.id);
    };

    public func compare(product1 : Product, product2 : Product) : Order.Order {
      Text.compare(product1.name, product2.name);
    };
  };

  type CartItem = {
    productId : Nat;
    quantity : Nat;
  };

  module CartItem {
    public func compare(item1 : CartItem, item2 : CartItem) : Order.Order {
      Nat.compare(item1.productId, item2.productId);
    };
  };

  type Cart = {
    products : [CartItem];
  };

  type Order = {
    id : Nat;
    cart : Cart;
    totalAmount : Nat;
  };

  let products = Map.empty<Nat, Product>();
  var nextProductId = 0;
  let carts = Map.empty<Principal, Cart>();
  let orders = Map.empty<Nat, Order>();
  var nextOrderId = 1;
  let newsletters = List.empty<Text>();

  func getProductInternal(productId : Nat) : Product {
    switch (products.get(productId)) {
      case (null) { Runtime.trap("Product does not exist") };
      case (?product) { product };
    };
  };

  public shared ({ caller }) func addProduct(name : Text, description : Text, price : Nat, category : Text) : async Nat {
    let productId = nextProductId;
    nextProductId += 1;
    let product : Product = {
      id = productId;
      name;
      description;
      price;
      category;
    };
    products.add(productId, product);
    productId;
  };

  public query ({ caller }) func getProduct(productId : Nat) : async Product {
    getProductInternal(productId);
  };

  public query ({ caller }) func getAllProducts() : async [Product] {
    products.values().toArray().sort();
  };

  public query ({ caller }) func getProductsByCategory(category : Text) : async [Product] {
    products.values().toArray().filter(
      func(product) {
        product.category == category;
      }
    ).sort(Product.compareById);
  };

  public shared ({ caller }) func addToCart(productId : Nat, quantity : Nat) : async () {
    if (quantity == 0) {
      Runtime.trap("Quantity must be at least 1");
    };
    ignore getProductInternal(productId);

    let newItem : CartItem = {
      productId;
      quantity;
    };

    carts.add(
      caller,
      {
        products = [newItem];
      },
    );
  };

  public shared ({ caller }) func removeFromCart(productId : Nat) : async () {
    switch (carts.get(caller)) {
      case (null) { Runtime.trap("Cart does not exist") };
      case (?cart) {
        let updatedProducts = cart.products.values().toArray().filter(
          func(item) { item.productId != productId }
        );
        carts.add(
          caller,
          {
            products = updatedProducts.sort();
          },
        );
      };
    };
  };

  public shared ({ caller }) func clearCart() : async () {
    carts.remove(caller);
  };

  public shared ({ caller }) func placeOrder() : async Nat {
    switch (carts.get(caller)) {
      case (null) { Runtime.trap("Cart does not exist") };
      case (?cart) {
        var totalAmount = 0;
        for (item in cart.products.values()) {
          let product = getProductInternal(item.productId);
          totalAmount += product.price * item.quantity;
        };
        let orderId = nextOrderId;
        nextOrderId += 1;
        let order : Order = {
          id = orderId;
          cart;
          totalAmount;
        };
        orders.add(orderId, order);
        carts.remove(caller);
        orderId;
      };
    };
  };

  public shared ({ caller }) func addNewsletter(email : Text) : async () {
    let existingEmails = newsletters.toArray();
    switch (existingEmails.find(func(e) { e == email })) {
      case (null) { newsletters.add(email) };
      case (_) {};
    };
  };

  public query ({ caller }) func getMyCart() : async ?Cart {
    carts.get(caller);
  };
};
