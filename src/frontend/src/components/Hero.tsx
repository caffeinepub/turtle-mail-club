import { motion } from "motion/react";

// Reusable easing for all hero elements
const ease = [0.22, 1, 0.36, 1] as const;

// Factory for staggered fade-up variants
function fadeUp(delay: number) {
  return {
    initial: { opacity: 0, y: 22 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.75, ease, delay },
  };
}

interface HeroProps {
  onShopClick: () => void;
}

export function Hero({ onShopClick }: HeroProps) {
  return (
    <section id="hero" className="pt-28 md:pt-36 pb-16 md:pb-24">
      <div className="container-tight">
        <div className="text-center max-w-2xl mx-auto">
          {/* Eyebrow label — first to appear */}
          <motion.p
            {...fadeUp(0)}
            className="font-sans text-xs tracking-[0.28em] uppercase text-ink-deep mb-6 font-medium"
          >
            Slow Living
            <span className="inline-block mx-2 opacity-40">&mdash;</span>
            Intentional Mail
          </motion.p>

          {/* H1 line 1 — "Slow Down." */}
          <div className="overflow-hidden mb-1">
            <motion.span
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease, delay: 0.12 }}
              className="block font-serif font-light text-foreground"
              style={{
                fontSize: "clamp(2.8rem, 5.5vw, 4rem)",
                lineHeight: 1.08,
              }}
            >
              Slow Down.
            </motion.span>
          </div>

          {/* H1 line 2 — italic, larger, the emotional beat */}
          <div className="overflow-hidden mb-8">
            <motion.span
              initial={{ opacity: 0, y: 44 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, ease, delay: 0.26 }}
              className="block font-serif italic text-ink-deep"
              style={{
                fontSize: "clamp(2.8rem, 5.5vw, 4rem)",
                lineHeight: 1.12,
              }}
            >
              Send Something Meaningful.
            </motion.span>
          </div>

          {/* Subtext */}
          <motion.p
            {...fadeUp(0.44)}
            className="font-sans text-sm md:text-base text-muted-foreground leading-relaxed mb-10 max-w-md mx-auto"
          >
            In a world of instant messages, we celebrate the art of handwritten
            notes, illustrated postcards, and mail that arrives like a small
            gift — made to be kept.
          </motion.p>

          {/* CTAs — last to appear, as if the invitation is being extended */}
          <motion.div
            {...fadeUp(0.58)}
            className="flex flex-col sm:flex-row items-center justify-center gap-3"
          >
            <button
              type="button"
              onClick={onShopClick}
              data-ocid="hero.primary_button"
              className="btn-primary w-full sm:w-auto"
            >
              Shop Now
            </button>
            <button
              type="button"
              onClick={() => {
                document
                  .querySelector("#about")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              data-ocid="hero.secondary_button"
              className="btn-outline w-full sm:w-auto"
            >
              Join the Club
            </button>
          </motion.div>
        </div>

        {/* Hero lifestyle image — slight scale-up on enter, feels like unfolding */}
        <motion.div
          className="mt-14 md:mt-20 rounded-2xl overflow-hidden shadow-card-hover"
          initial={{ opacity: 0, scale: 0.975, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.1, ease, delay: 0.7 }}
        >
          <img
            src="/assets/generated/hero-mail-lifestyle.dim_1200x600.jpg"
            alt="Beautiful handwritten letters and postcards arranged on cream paper"
            className="w-full object-cover h-[300px] md:h-[480px]"
          />
        </motion.div>

        {/* Divider with animated reveal */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.1 }}
          className="mt-12 flex items-center gap-4 justify-center"
        >
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.5, ease, delay: 1.15 }}
            className="h-px w-16 bg-border origin-right"
          />
          <p className="font-sans text-xs tracking-[0.22em] uppercase text-muted-foreground">
            Our collection
          </p>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.5, ease, delay: 1.15 }}
            className="h-px w-16 bg-border origin-left"
          />
        </motion.div>
      </div>
    </section>
  );
}
