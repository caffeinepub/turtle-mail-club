import { Heart, Mail, Star } from "lucide-react";
import { motion } from "motion/react";

const inviteCards = [
  {
    icon: Mail,
    title: "Send Your First Letter",
    description:
      "Pick a postcard, write something true, and send it. That's all it takes to start something meaningful.",
  },
  {
    icon: Heart,
    title: "Be Part of Something New",
    description:
      "Turtle Mail Club is just getting started. You won't just be a customer — you'll be one of the first.",
  },
  {
    icon: Star,
    title: "Share Your Experience",
    description:
      "Once your mail arrives, we'd love to hear from you. Your story could be the first one on this wall.",
  },
];

const starKeys = ["star-1", "star-2", "star-3", "star-4", "star-5"];

export function Testimonials() {
  return (
    <section id="testimonials" className="section-padding bg-paper">
      <div className="container-tight">
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="font-sans text-xs tracking-[0.22em] uppercase text-ink-deep mb-3 font-medium">
            A brand new beginning
          </p>
          <h2 className="font-serif text-section font-light text-foreground">
            The Wall Is Still Empty
          </h2>
          <p className="font-sans text-sm text-muted-foreground mt-4 max-w-md mx-auto leading-relaxed">
            We just opened our doors. No reviews yet, but every great story
            starts somewhere. Yours could be the first.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
          {inviteCards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: index * 0.12 }}
              className="relative bg-card rounded-xl p-8 shadow-card overflow-hidden group text-center"
            >
              <div className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-ink-deep/10 mb-5 group-hover:bg-ink-deep/15 transition-colors duration-300">
                <card.icon
                  size={18}
                  className="text-ink-deep"
                  strokeWidth={1.5}
                />
              </div>
              <h3 className="font-serif text-lg font-normal text-foreground mb-3 leading-snug">
                {card.title}
              </h3>
              <p className="font-sans text-sm text-foreground/70 leading-[1.8]">
                {card.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="border border-dashed border-ink-deep/20 rounded-xl p-10 text-center max-w-lg mx-auto"
        >
          <span
            aria-hidden="true"
            className="font-serif text-6xl text-ink-deep/10 leading-none block mb-2"
          >
            &ldquo;
          </span>
          <p className="font-sans text-sm text-muted-foreground italic leading-relaxed">
            Your review could live right here. Be the first to write to us.
          </p>
          <div className="flex justify-center gap-1 mt-4">
            {starKeys.map((key) => (
              <Star
                key={key}
                size={13}
                className="text-ink-deep/20"
                fill="currentColor"
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
