import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useAddToCart, useRemoveFromCart } from "../hooks/useQueries";
import type { LocalCartItem } from "../types/cart";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: LocalCartItem[];
  onUpdateQty: (productId: bigint, delta: number) => void;
  onRemove: (productId: bigint) => void;
}

export function CartDrawer({
  isOpen,
  onClose,
  items,
  onUpdateQty,
  onRemove,
}: CartDrawerProps) {
  const addToCart = useAddToCart();
  const removeFromCart = useRemoveFromCart();

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const handleUpdateQty = (item: LocalCartItem, delta: number) => {
    const newQty = item.quantity + delta;
    if (newQty <= 0) {
      onRemove(item.productId);
      removeFromCart.mutate(item.productId);
    } else {
      onUpdateQty(item.productId, delta);
      if (delta > 0) {
        addToCart.mutate({ productId: item.productId, quantity: 1n });
      }
    }
  };

  const handleRemove = (item: LocalCartItem) => {
    onRemove(item.productId);
    removeFromCart.mutate(item.productId);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-foreground/20 backdrop-blur-[2px] z-40"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Drawer */}
          <motion.div
            key="drawer"
            data-ocid="cart.sheet"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 260 }}
            className="fixed top-0 right-0 h-full w-full max-w-sm bg-paper shadow-drawer z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-border">
              <div className="flex items-center gap-2.5">
                <ShoppingBag size={18} className="text-ink-deep" />
                <h2 className="font-serif text-lg font-light text-foreground">
                  Your Cart
                </h2>
                {items.length > 0 && (
                  <span className="font-sans text-xs text-muted-foreground">
                    ({items.length} items)
                  </span>
                )}
              </div>
              <button
                type="button"
                onClick={onClose}
                data-ocid="cart.close_button"
                className="p-2 text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-parchment-light"
                aria-label="Close cart"
              >
                <X size={18} />
              </button>
            </div>

            {/* Content */}
            {items.length === 0 ? (
              <div
                data-ocid="cart.empty_state"
                className="flex-1 flex flex-col items-center justify-center gap-4 px-6 text-center"
              >
                <div className="w-16 h-16 rounded-full bg-parchment-light flex items-center justify-center">
                  <ShoppingBag size={24} className="text-ink-deep/50" />
                </div>
                <p className="font-serif text-lg font-light text-foreground">
                  Your cart is empty
                </p>
                <p className="font-sans text-sm text-muted-foreground leading-relaxed">
                  Find something beautiful to send.
                </p>
                <button
                  type="button"
                  onClick={onClose}
                  className="btn-primary mt-2"
                >
                  Browse the Shop
                </button>
              </div>
            ) : (
              <>
                <ScrollArea className="flex-1 px-6 py-4">
                  <ul className="space-y-5">
                    {items.map((item, index) => (
                      <li
                        key={item.productId.toString()}
                        data-ocid={`cart.item.${index + 1}`}
                        className="flex gap-3"
                      >
                        <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-sans text-sm font-medium text-foreground truncate">
                            {item.name}
                          </p>
                          <p className="font-sans text-sm text-muted-foreground mt-0.5">
                            ₹{item.price.toLocaleString("en-IN")}
                          </p>
                          <div className="flex items-center gap-2 mt-2">
                            <button
                              type="button"
                              onClick={() => handleUpdateQty(item, -1)}
                              data-ocid={`cart.item.${index + 1}.button`}
                              className="w-6 h-6 rounded border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary transition-colors"
                              aria-label="Decrease quantity"
                            >
                              <Minus size={10} />
                            </button>
                            <span className="font-sans text-sm w-5 text-center">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => handleUpdateQty(item, 1)}
                              className="w-6 h-6 rounded border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary transition-colors"
                              aria-label="Increase quantity"
                            >
                              <Plus size={10} />
                            </button>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleRemove(item)}
                          data-ocid={`cart.item.${index + 1}.delete_button`}
                          className="p-1 text-muted-foreground hover:text-destructive transition-colors self-start"
                          aria-label={`Remove ${item.name}`}
                        >
                          <Trash2 size={14} />
                        </button>
                      </li>
                    ))}
                  </ul>
                </ScrollArea>

                <div className="px-6 py-5 border-t border-border space-y-4">
                  <Separator />
                  <div className="flex items-center justify-between">
                    <span className="font-sans text-sm text-muted-foreground">
                      Subtotal
                    </span>
                    <span className="font-serif text-xl font-light text-foreground">
                      ₹{subtotal.toLocaleString("en-IN")}
                    </span>
                  </div>
                  <p className="font-sans text-xs text-muted-foreground">
                    Shipping calculated at checkout
                  </p>
                  <button
                    type="button"
                    data-ocid="cart.primary_button"
                    className="w-full btn-primary justify-center"
                  >
                    Proceed to Checkout
                  </button>
                </div>
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
