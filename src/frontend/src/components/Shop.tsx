import { Badge } from "@/components/ui/badge";
import { ShoppingCart } from "lucide-react";
import { motion } from "motion/react";
import { PRODUCTS, type ProductData } from "../data/products";

interface ShopProps {
  onAddToCart: (product: ProductData) => void;
}

export function Shop({ onAddToCart }: ShopProps) {
  return (
    <section id="shop" className="section-padding bg-paper">
      <div className="container-tight">
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="font-sans text-xs tracking-[0.22em] uppercase text-ink-deep mb-3 font-medium">
            Handcrafted with care
          </p>
          <h2 className="font-serif text-section font-light text-foreground">
            Shop Our Collection
          </h2>
        </motion.div>

        <div
          data-ocid="shop.list"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
        >
          {PRODUCTS.map((product, index) => (
            <motion.div
              key={product.id.toString()}
              data-ocid={`shop.item.${index + 1}`}
              className="product-card group hover:shadow-card-hover hover:-translate-y-1.5"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
            >
              <div className="relative overflow-hidden aspect-[4/3] cursor-pointer">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-ink-deep/0 group-hover:bg-ink-deep/60 transition-colors duration-350 flex items-center justify-center">
                  <button
                    type="button"
                    onClick={() => onAddToCart(product)}
                    data-ocid={`shop.item.${index + 1}.button`}
                    aria-label={`Add ${product.name} to cart`}
                    className="
                      flex items-center gap-2
                      px-5 py-2.5
                      bg-paper text-ink-deep
                      font-sans text-xs font-medium tracking-widest uppercase
                      rounded-lg shadow-card
                      opacity-0 translate-y-3 scale-95
                      group-hover:opacity-100 group-hover:translate-y-0 group-hover:scale-100
                      transition-all duration-300 delay-75
                    "
                  >
                    <ShoppingCart size={13} />
                    Add to Cart
                  </button>
                </div>

                {product.tag && (
                  <Badge className="absolute top-3 left-3 bg-ink-deep/90 text-paper text-[10px] tracking-wider uppercase font-sans font-medium hover:bg-ink-deep border-0 z-10">
                    {product.tag}
                  </Badge>
                )}
              </div>

              {/* Product info */}
              <div className="p-4 pb-5">
                <p className="font-sans text-[10px] tracking-[0.22em] uppercase text-ink-light mb-1.5">
                  {product.category}
                </p>
                <div className="flex items-baseline justify-between gap-2">
                  <h3 className="font-serif text-[1.05rem] font-normal text-foreground leading-snug">
                    {product.name}
                  </h3>
                  <span className="font-sans text-sm font-medium text-foreground whitespace-nowrap">
                    ₹{product.price.toLocaleString("en-IN")}
                  </span>
                </div>
                <p className="font-sans text-xs text-muted-foreground mt-1.5 line-clamp-2 leading-relaxed">
                  {product.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
