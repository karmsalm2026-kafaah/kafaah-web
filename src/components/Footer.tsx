import Link from "next/link";
import Image from "next/image";
import { services } from "@/data/services";
import { technologies } from "@/data/technologies";

export function Footer() {
  return (
    <footer className="relative bg-navy overflow-hidden border-t border-white/[0.04]">
      {/* Top accent line */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

      <div className="relative container mx-auto px-6 sm:px-8 lg:px-16 pt-24 pb-12">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 lg:gap-20 mb-16 pb-16 border-b border-white/[0.04]">
          {/* Brand */}
          <div className="lg:pr-8">
            <Link href="/" className="inline-block mb-8 group">
              <Image
                src="/logo.webp"
                alt="Kafaah Industrial Solutions"
                width={160}
                height={68}
                className="h-[42px] w-auto object-contain brightness-110 group-hover:brightness-125 transition-all duration-300"
              />
            </Link>
            <p className="text-[14px] font-light text-silver/80 leading-[1.8] max-w-[320px]">
              Independent specialists in inorganic chemical and fertilizer plant
              commissioning, startup, troubleshooting, and performance
              optimization.
            </p>
          </div>

          {/* Technologies */}
          <div>
            <h4 className="font-[family-name:var(--font-ui)] text-[11px] font-bold tracking-[0.3em] uppercase text-gold mb-8 flex items-center gap-4">
              <span className="w-6 h-px bg-gold/50" />
              Technologies
            </h4>
            <ul className="space-y-4">
              {technologies.map((t) => (
                <li key={t.slug}>
                  <Link
                    href={`/technologies/${t.slug}/`}
                    className="group flex items-center gap-3 text-[14px] font-light text-silver/90 hover:text-white transition-colors duration-300"
                  >
                    <span className="font-[family-name:var(--font-ui)] text-gold/70 text-[11px] font-bold min-w-[36px] group-hover:text-gold transition-colors tracking-widest">
                      {t.formula}
                    </span>
                    <span className="border-l border-white/[0.1] pl-4 group-hover:border-gold/40 transition-colors">
                      {t.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-[family-name:var(--font-ui)] text-[11px] font-bold tracking-[0.3em] uppercase text-gold mb-8 flex items-center gap-4">
              <span className="w-6 h-px bg-gold/50" />
              Services
            </h4>
            <ul className="space-y-4">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/services/${s.slug}/`}
                    className="group text-[14px] font-light text-silver/90 hover:text-white transition-colors duration-300 flex items-center gap-3"
                  >
                    <span className="w-1 h-1 rounded-full bg-white/20 group-hover:bg-gold transition-colors" />
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-[family-name:var(--font-ui)] text-[11px] font-bold tracking-[0.3em] uppercase text-gold mb-8 flex items-center gap-4">
              <span className="w-6 h-px bg-gold/50" />
              Company
            </h4>
            <ul className="space-y-4">
              {[
                { href: "/who-we-are/", label: "Who We Are" },
                { href: "/experience/", label: "Experience" },
                { href: "/insights/", label: "Insights" },
                { href: "/contact/", label: "Get in Touch" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group text-[14px] font-light text-silver/90 hover:text-white transition-colors duration-300 flex items-center gap-3"
                  >
                    <span className="w-1 h-1 rounded-full bg-white/20 group-hover:bg-gold transition-colors" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* <div className="mt-10 pt-8 border-t border-white/[0.04]">
              <div className="font-[family-name:var(--font-ui)] text-[9px] font-bold tracking-[0.3em] uppercase text-silver/30 mb-3">
                Also Available
              </div>
              <span className="text-[13px] text-silver/50 hover:text-gold transition-colors cursor-pointer">
                عربي
              </span>
            </div> */}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6 text-center sm:text-left mt-8">
          <div className="font-[family-name:var(--font-ui)] text-[10px] font-medium tracking-[0.15em] text-silver/50 uppercase">
            © 2026 Kafaah Industrial Solutions
          </div>
          <div className="flex items-center justify-center gap-4">
            <span className="font-[family-name:var(--font-ui)] text-[10px] font-medium tracking-[0.2em] text-silver/50 uppercase">
              Independent
            </span>
            <div className="w-1 h-1 rounded-full bg-gold/50" />
            <span className="font-[family-name:var(--font-ui)] text-[10px] font-medium tracking-[0.2em] text-silver/50 uppercase">
              Technical
            </span>
            <div className="w-1 h-1 rounded-full bg-gold/50" />
            <span className="font-[family-name:var(--font-ui)] text-[10px] font-medium tracking-[0.2em] text-silver/50 uppercase">
              Operational
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
