import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";

interface FeaturedCollectionProps {
  onAddToCart: () => void;
}

export function FeaturedCollection({ onAddToCart }: FeaturedCollectionProps) {
  return (
    <section id="featured" className="section-padding bg-paper-dark">
      <div className="container-tight">
        <motion.div
          className="rounded-2xl overflow-hidden grid md:grid-cols-2 shadow-card-hover"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          {/* Left text panel */}
          <div className="bg-parchment p-10 md:p-14 flex flex-col justify-center">
            <p className="font-sans text-xs tracking-[0.22em] uppercase text-ink-deep mb-4 font-medium">
              Curated Bundle
            </p>
            <h2 className="font-serif text-[2rem] md:text-[2.5rem] font-light text-foreground leading-[1.1] mb-5">
              Seasonal Mail Kit
            </h2>
            <p className="font-sans text-sm text-muted-foreground leading-relaxed mb-4">
              Our most-loved bundle — a handpicked collection of illustrated
              postcards, a personal handwritten note, premium stickers, paper
              bookmarks, and a surprise wax seal. Thoughtfully wrapped and ready
              to delight.
            </p>
            <p className="font-sans text-sm text-muted-foreground leading-relaxed mb-8">
              Perfect for gifting or treating yourself to a moment of slow,
              intentional joy.
            </p>
            <div className="flex items-baseline gap-3 mb-8">
              <span className="font-serif text-3xl font-light text-foreground">
                ₹899
              </span>
              <span className="font-sans text-xs text-muted-foreground uppercase tracking-wider">
                / kit
              </span>
            </div>
            <button
              type="button"
              onClick={onAddToCart}
              data-ocid="featured.primary_button"
              className="btn-primary self-start flex items-center gap-2"
            >
              Add to Cart
              <ArrowRight size={14} />
            </button>
          </div>

          {/* Right image panel */}
          <div className="relative min-h-[320px] overflow-hidden">
            <img
              src="/assets/generated/featured-mail-kit.dim_600x480.jpg"
              alt="Seasonal Mail Kit - curated bundle of postcards, stickers, and handwritten notes"
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
