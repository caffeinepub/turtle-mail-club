import { Toaster } from "@/components/ui/sonner";
import { useCallback, useState } from "react";
import { toast } from "sonner";
import { About } from "./components/About";
import { CartDrawer } from "./components/CartDrawer";
import { FeaturedCollection } from "./components/FeaturedCollection";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { HowItWorks } from "./components/HowItWorks";
import { Shop } from "./components/Shop";
import { Testimonials } from "./components/Testimonials";
import type { ProductData } from "./data/products";
import { PRODUCTS } from "./data/products";
import { useAddToCart } from "./hooks/useQueries";
import type { LocalCartItem } from "./types/cart";

export default function App() {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<LocalCartItem[]>([]);
  const addToCartMutation = useAddToCart();

  const totalCartCount = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0,
  );

  const handleAddToCart = useCallback(
    (product: ProductData) => {
      setCartItems((prev) => {
        const existing = prev.find((item) => item.productId === product.id);
        if (existing) {
          return prev.map((item) =>
            item.productId === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          );
        }
        return [
          ...prev,
          {
            productId: product.id,
            name: product.name,
            price: product.price,
            quantity: 1,
            image: product.image,
          },
        ];
      });
      // Sync to backend (fire-and-forget)
      addToCartMutation.mutate({ productId: product.id, quantity: 1n });
      toast.success(`${product.name} added to cart`, {
        description: "Your cart has been updated.",
      });
      setCartOpen(true);
    },
    [addToCartMutation],
  );

  const handleAddFeaturedKit = useCallback(() => {
    const kit = PRODUCTS.find((p) => p.id === 5n);
    if (kit) handleAddToCart(kit);
  }, [handleAddToCart]);

  const handleUpdateQty = useCallback((productId: bigint, delta: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.productId === productId
          ? { ...item, quantity: item.quantity + delta }
          : item,
      ),
    );
  }, []);

  const handleRemove = useCallback((productId: bigint) => {
    setCartItems((prev) => prev.filter((item) => item.productId !== productId));
  }, []);

  const handleShopClick = () => {
    document.querySelector("#shop")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background">
      <Toaster position="bottom-right" />

      <Header cartCount={totalCartCount} onCartOpen={() => setCartOpen(true)} />

      <main>
        <Hero onShopClick={handleShopClick} />
        <Shop onAddToCart={handleAddToCart} />
        <FeaturedCollection onAddToCart={handleAddFeaturedKit} />
        <About />
        <HowItWorks />
        <Testimonials />
      </main>

      <Footer />

      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cartItems}
        onUpdateQty={handleUpdateQty}
        onRemove={handleRemove}
      />
    </div>
  );
}
