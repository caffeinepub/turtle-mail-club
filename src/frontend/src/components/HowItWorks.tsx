import { motion } from "motion/react";

const steps = [
  {
    number: "01",
    title: "Choose Your Items",
    description:
      "Browse our curated collection of postcards, letters, stickers, bookmarks, and mail kits. Each piece is designed to bring joy to the recipient.",
  },
  {
    number: "02",
    title: "We Craft & Send",
    description:
      "We carefully package your order with tissue paper and a personal touch. Your mail arrives as a small event — something to look forward to opening.",
  },
  {
    number: "03",
    title: "Share the Experience",
    description:
      "Pass on the joy. Use your postcards to write to someone you've been meaning to reach, or keep your kit as a quiet ritual of slow living.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="section-padding bg-parchment-light">
      <div className="container-tight">
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="font-sans text-xs tracking-[0.22em] uppercase text-ink-deep mb-3 font-medium">
            Simple as sending a letter
          </p>
          <h2 className="font-serif text-section font-light text-foreground">
            How It Works
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              data-ocid={`how.item.${index + 1}`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.12 }}
              className="text-center"
            >
              <div className="w-12 h-12 rounded-full bg-parchment border border-ink-deep/20 flex items-center justify-center mx-auto mb-5">
                <span className="font-serif text-base font-light text-ink-deep">
                  {step.number}
                </span>
              </div>
              <h3 className="font-serif text-xl font-normal text-foreground mb-3">
                {step.title}
              </h3>
              <p className="font-sans text-sm text-muted-foreground leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
