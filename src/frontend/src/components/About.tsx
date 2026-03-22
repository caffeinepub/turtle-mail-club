import { motion } from "motion/react";
import { TurtleLogo } from "./TurtleLogo";

export function About() {
  return (
    <section id="about" className="section-padding bg-paper">
      <div className="container-tight">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex justify-center mb-6">
              <div className="w-14 h-14 rounded-full bg-parchment flex items-center justify-center">
                <TurtleLogo size={28} className="text-ink-deep" />
              </div>
            </div>
            <p className="font-sans text-xs tracking-[0.22em] uppercase text-ink-deep mb-4 font-medium">
              Our Story
            </p>
            <h2 className="font-serif text-section font-light text-foreground mb-8">
              Why We Write Letters
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="space-y-5"
          >
            <p className="font-sans text-sm md:text-base text-muted-foreground leading-relaxed">
              Turtle Mail Club was born from a simple longing — to slow down in
              a fast world. We believe that taking the time to write a real
              letter, to choose a beautiful postcard, to seal an envelope with
              intention — these small acts carry meaning that no notification
              ever can.
            </p>
            <p className="font-sans text-sm md:text-base text-muted-foreground leading-relaxed">
              Named for the turtle's gentle pace, we celebrate the beauty of
              taking your time. Every item in our shop is crafted to inspire
              connection — with the people you love, and with yourself.
            </p>
            <p className="font-sans text-sm md:text-base text-muted-foreground leading-relaxed">
              We handpick every postcard, every sticker sheet, every mail kit
              with care. Because meaningful things deserve to be made that way.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
