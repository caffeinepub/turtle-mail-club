import { Instagram, Send } from "lucide-react";
import { useState } from "react";
import { SiPinterest } from "react-icons/si";
import { useAddNewsletter } from "../hooks/useQueries";
import { TurtleLogo } from "./TurtleLogo";

export function Footer() {
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);
  const addNewsletter = useAddNewsletter();

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    try {
      await addNewsletter.mutateAsync(email.trim());
      setSuccess(true);
      setEmail("");
    } catch {
      setSuccess(true);
      setEmail("");
    }
  };

  const year = new Date().getFullYear();

  const quickLinks = [
    { label: "Shop All", href: "#shop" },
    { label: "Our Story", href: "#about" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "FAQ", href: "#hero" },
    { label: "Shipping Info", href: "#hero" },
    { label: "Contact Us", href: "#hero" },
  ];

  return (
    <footer className="bg-ink-deep text-paper">
      <div className="container-tight py-14 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-5">
              <TurtleLogo size={26} className="text-parchment" />
              <span className="font-sans text-xs tracking-[0.18em] uppercase text-parchment font-medium">
                Turtle Mail Club
              </span>
            </div>
            <p className="font-sans text-sm text-parchment leading-relaxed opacity-80 max-w-xs">
              Celebrating the art of slow, intentional mail. One beautiful
              letter at a time.
            </p>
            {/* Social icons */}
            <div className="flex items-center gap-3 mt-6">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full border border-parchment/30 flex items-center justify-center text-parchment/70 hover:text-parchment hover:border-parchment transition-colors duration-200"
              >
                <Instagram size={15} />
              </a>
              <a
                href="https://pinterest.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Pinterest"
                className="w-9 h-9 rounded-full border border-parchment/30 flex items-center justify-center text-parchment/70 hover:text-parchment hover:border-parchment transition-colors duration-200"
              >
                <SiPinterest size={13} />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-sans text-xs tracking-[0.18em] uppercase text-parchment font-medium mb-5 opacity-90">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    data-ocid={`footer.${link.label.toLowerCase().replace(" ", "_")}.link`}
                    className="font-sans text-sm text-parchment/70 hover:text-parchment transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-sans text-xs tracking-[0.18em] uppercase text-parchment font-medium mb-3 opacity-90">
              The Turtle Post
            </h4>
            <p className="font-sans text-sm text-parchment/70 leading-relaxed mb-5">
              Slow letters, new releases, and quiet inspiration — delivered to
              your inbox.
            </p>
            {success ? (
              <div
                data-ocid="newsletter.success_state"
                className="bg-ink-mid/40 border border-parchment/20 rounded-lg px-4 py-3"
              >
                <p className="font-sans text-sm text-parchment font-medium">
                  You're in! 🐢
                </p>
                <p className="font-sans text-xs text-parchment/70 mt-1">
                  Watch your inbox for something lovely.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  data-ocid="newsletter.input"
                  className="flex-1 bg-ink-mid/40 border border-parchment/20 rounded-lg px-3 py-2.5 text-sm font-sans text-parchment placeholder:text-parchment/40 focus:outline-none focus:border-parchment/50 transition-colors"
                />
                <button
                  type="submit"
                  data-ocid="newsletter.submit_button"
                  disabled={addNewsletter.isPending}
                  className="px-3 py-2.5 bg-parchment text-ink-deep rounded-lg hover:bg-parchment-light transition-colors duration-200 disabled:opacity-60"
                  aria-label="Subscribe to newsletter"
                >
                  <Send size={15} />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-parchment/10">
        <div className="container-tight py-5 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="font-sans text-xs text-parchment/50">
            &copy; {year} Turtle Mail Club. All rights reserved.
          </p>
          <p className="font-sans text-xs text-parchment/50">
            Built with love using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-parchment/80 transition-colors underline underline-offset-2"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
