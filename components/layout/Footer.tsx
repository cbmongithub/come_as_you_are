import Link from "next/link";
import { Mail, Heart } from "lucide-react";
import { Logo } from "@/components/ui/Logo";

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
    <footer className="relative overflow-hidden bg-caya-charcoal">
      {/* Decorative top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-caya-footer-rule" />

      <div className="container-wide py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
          {/* Brand */}
          <div className="md:col-span-5">
            <Link href="/" className="mb-5 inline-block">
              <Logo
                className="h-12 w-auto"
                wordmark="var(--color-caya-sand)"
                background="var(--color-caya-clay)"
                foreground="var(--color-caya-sand)"
              />
            </Link>
            <p className="mb-6 max-w-xs text-sm leading-relaxed font-body text-caya-sand-60">
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
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-caya-sand-20 bg-caya-sand-10 text-caya-sand transition-all duration-300 hover:scale-110"
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
                <p className="mb-4 text-xs font-medium uppercase tracking-caya-label font-body text-caya-sand-40">
                  {col.title}
                </p>
                <ul className="flex flex-col gap-2.5">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-sm font-body text-caya-sand-60 transition-colors duration-200 hover:text-caya-clay-light"
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
          className="mb-12 flex flex-col items-start justify-between gap-4 rounded-2xl border border-caya-clay-30 bg-caya-clay-15 p-6 sm:flex-row sm:items-center"
        >
          <div>
            <p className="mb-1 text-sm font-medium font-body text-caya-clay-light">
              Need immediate support?
            </p>
            <p className="text-xs font-body text-caya-sand-50">
              We are not a crisis service. If you are in distress, please reach
              out to a professional.
            </p>
          </div>
          <a
            href="tel:988"
            className="shrink-0 rounded-full bg-caya-clay px-5 py-2 text-sm font-medium font-body text-caya-warm-white transition-all duration-300"
          >
            Call 988 (Crisis Line)
          </a>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-caya-sand-10 pt-8 sm:flex-row">
          <p className="flex items-center gap-1.5 text-xs font-body text-caya-sand-35">
            © 2025 Come As You Are. Made with{" "}
            <Heart size={11} className="text-caya-clay-light" /> for the
            community.
          </p>
          <div className="flex gap-6">
            {["Privacy", "Accessibility", "Terms"].map((item) => (
              <Link
                key={item}
                href="#"
                className="text-xs font-body text-caya-sand-35 transition-colors duration-200 hover:text-caya-clay-light"
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
