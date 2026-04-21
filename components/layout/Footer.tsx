import Link from "next/link";
import { Mail, Heart } from "lucide-react";

function InstagramIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer
      className="relative overflow-hidden"
      style={{ background: "var(--color-charcoal)" }}
    >
      {/* Decorative top border */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, oklch(55% 0.12 38), transparent)",
        }}
      />

      <div className="container-wide py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
          {/* Brand */}
          <div className="md:col-span-5">
            <h3
              className="text-4xl mb-4"
              style={{
                fontFamily: "var(--font-display)",
                color: "var(--color-sand)",
              }}
            >
              Come As You Are
            </h3>
            <p
              className="text-sm leading-relaxed max-w-xs mb-6"
              style={{
                color: "oklch(88% 0.04 75 / 0.6)",
                fontFamily: "var(--font-body)",
              }}
            >
              A peer-led mental wellness community. This is not therapy — this
              is belonging. Come as you are, stay as long as you need.
            </p>
            <div className="flex gap-4">
              {[
                { icon: InstagramIcon, label: "Instagram", href: "#" },
                {
                  icon: Mail,
                  label: "Email",
                  href: "mailto:hello@comeasyouare.co",
                },
              ].map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                  style={{
                    background: "oklch(88% 0.04 75 / 0.1)",
                    color: "var(--color-sand)",
                    border: "1px solid oklch(88% 0.04 75 / 0.2)",
                  }}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Nav columns */}
          <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {[
              {
                title: "Explore",
                links: [
                  { href: "/about", label: "About Us" },
                  { href: "/programs", label: "Programs" },
                  { href: "/the-space", label: "The Space" },
                  { href: "/events", label: "Events" },
                ],
              },
              {
                title: "Community",
                links: [
                  { href: "/support", label: "Support the Space" },
                  { href: "/support#sponsor", label: "Sponsorships" },
                  { href: "/support#donate", label: "Donate" },
                  { href: "/support#partners", label: "Partners" },
                ],
              },
              {
                title: "Connect",
                links: [
                  { href: "/book", label: "Book a Session" },
                  { href: "#newsletter", label: "Newsletter" },
                  { href: "mailto:hello@comeasyouare.co", label: "Contact" },
                  { href: "#crisis", label: "Crisis Resources" },
                ],
              },
            ].map((col) => (
              <div key={col.title}>
                <p
                  className="text-xs uppercase tracking-[0.15em] mb-4 font-medium"
                  style={{
                    color: "oklch(88% 0.04 75 / 0.4)",
                    fontFamily: "var(--font-body)",
                  }}
                >
                  {col.title}
                </p>
                <ul className="flex flex-col gap-2.5">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-sm transition-colors duration-200 hover:text-clay-light"
                        style={{
                          color: "oklch(88% 0.04 75 / 0.6)",
                          fontFamily: "var(--font-body)",
                        }}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Crisis Banner */}
        <div
          id="crisis"
          className="rounded-2xl p-6 mb-12 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between"
          style={{
            background: "oklch(55% 0.12 38 / 0.15)",
            border: "1px solid oklch(55% 0.12 38 / 0.3)",
          }}
        >
          <div>
            <p
              className="text-sm font-medium mb-1"
              style={{
                color: "var(--color-clay-light)",
                fontFamily: "var(--font-body)",
              }}
            >
              Need immediate support?
            </p>
            <p
              className="text-xs"
              style={{
                color: "oklch(88% 0.04 75 / 0.5)",
                fontFamily: "var(--font-body)",
              }}
            >
              We are not a crisis service. If you are in distress, please reach
              out to a professional.
            </p>
          </div>
          <a
            href="tel:988"
            className="shrink-0 px-5 py-2 rounded-full text-sm font-medium transition-all duration-300"
            style={{
              background: "var(--color-clay)",
              color: "var(--color-warm-white)",
              fontFamily: "var(--font-body)",
            }}
          >
            Call 988 (Crisis Line)
          </a>
        </div>

        {/* Bottom bar */}
        <div
          className="pt-8 flex flex-col sm:flex-row gap-4 items-center justify-between"
          style={{ borderTop: "1px solid oklch(88% 0.04 75 / 0.1)" }}
        >
          <p
            className="text-xs flex items-center gap-1.5"
            style={{
              color: "oklch(88% 0.04 75 / 0.35)",
              fontFamily: "var(--font-body)",
            }}
          >
            © 2025 Come As You Are. Made with{" "}
            <Heart size={11} style={{ color: "var(--color-clay-light)" }} /> for
            the community.
          </p>
          <div className="flex gap-6">
            {["Privacy", "Accessibility", "Terms"].map((item) => (
              <Link
                key={item}
                href="#"
                className="text-xs transition-colors duration-200 hover:text-clay-light"
                style={{
                  color: "oklch(88% 0.04 75 / 0.35)",
                  fontFamily: "var(--font-body)",
                }}
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
