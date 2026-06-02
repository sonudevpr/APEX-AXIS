import { motion, AnimatePresence, type Variants } from "framer-motion";
import {
  Megaphone,
  HandCoins,
  Cog,
  TrendingUp,
  ArrowUpRight,
  Plus,
  Minus,
  Check,
  X,
  Menu,
} from "lucide-react";
import { Suspense, lazy, useEffect, useState, type ReactNode } from "react";
import Logo from "./components/Logo";

const AxisAudit = lazy(() => import("./components/AxisAudit"));

/* ------------------------------------------------------------------ */
/*  Motion                                                             */
/* ------------------------------------------------------------------ */

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.04 } },
};

function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Atoms                                                              */
/* ------------------------------------------------------------------ */

function SectionLabel({ index, label }: { index: string; label: string }) {
  return (
    <div className="flex items-center gap-4 font-mono text-[11px] font-medium uppercase tracking-[0.28em] text-[#aaaaaa]">
      <span className="text-[#7b2fbe]">{index}</span>
      <span className="h-px w-10 bg-[#2a2a2a]" />
      <span>{label}</span>
    </div>
  );
}

function Wordmark({ size = 22, animate = false }: { size?: number; animate?: boolean }) {
  return (
    <div className="flex items-center gap-2 sm:gap-3">
      <Logo size={size} animate={animate} />
      <span className="font-mono text-[10px] font-medium uppercase tracking-[0.22em] text-white sm:text-[11px] sm:tracking-[0.32em]">
        Apex &amp; Axis
      </span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  NAV                                                                */
/* ------------------------------------------------------------------ */

function Nav({ onOpenContact }: { onOpenContact: () => void }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const links = [
    { href: "#diagnosis", label: "Diagnosis" },
    { href: "#engines", label: "Engines" },
    { href: "#axis-audit", label: "Audit" },
    { href: "#starter-kit", label: "Starter" },
    { href: "#vault", label: "Vault" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-[#1c1c1c] bg-[#0a0a0a]/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-10">
        {/* Logo */}
        <a href="#top" className="group z-50">
          <Wordmark size={22} />
        </a>

        {/* Desktop Nav - Unique Technical Strip */}
        <nav className="hidden items-center gap-8 lg:flex">
          {links.map((link, i) => (
            <div key={link.href} className="flex items-center gap-8">
              <a
                href={link.href}
                className="font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-[#666] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:text-[#7b2fbe] hover:tracking-[0.35em]"
              >
                {link.label}
              </a>
              {i < links.length - 1 && (
                <span className="h-1 w-1 bg-[#2a2a2a]" aria-hidden="true" />
              )}
            </div>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={onOpenContact}
            aria-haspopup="dialog"
            className="group hidden sm:inline-flex shrink-0 items-center gap-2 border border-[#2a2a2a] bg-[#0f0f0f] px-4 py-2 font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-white transition-colors hover:border-[#7b2fbe] hover:bg-[#141414]"
          >
            Contact Us
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            className="lg:hidden flex h-10 w-10 items-center justify-center border border-[#2a2a2a] bg-[#0f0f0f] text-white transition-colors hover:border-[#7b2fbe]"
          >
            {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-b border-[#1c1c1c] bg-[#0a0a0a] lg:hidden"
          >
            <div className="flex flex-col p-6 pt-4">
              <button
                type="button"
                onClick={() => {
                  onOpenContact();
                  setMobileMenuOpen(false);
                }}
                className="mb-8 flex items-center justify-between border border-[#2a2a2a] bg-[#0f0f0f] px-4 py-3 font-mono text-[11px] uppercase tracking-[0.24em] text-white transition-colors hover:border-[#7b2fbe]"
              >
                Contact Us
                <ArrowUpRight className="h-4 w-4" />
              </button>

              <div className="space-y-4">
                {links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block border-l border-[#1c1c1c] py-2 pl-4 font-mono text-[12px] uppercase tracking-[0.2em] text-[#8a8a8a] transition-all duration-300 hover:border-[#7b2fbe] hover:text-white hover:pl-5"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

/* ------------------------------------------------------------------ */
/*  CONTACT MODAL                                                      */
/* ------------------------------------------------------------------ */

function ContactModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    if (!open) return;
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="contact-modal-title"
        >
          {/* Backdrop */}
          <button
            type="button"
            aria-label="Close contact"
            onClick={onClose}
            className="absolute inset-0 bg-[#0a0a0a]/85 backdrop-blur-md"
          />

          {/* Panel */}
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-lg border border-[#7b2fbe] bg-[#0f0f0f]"
          >
            <div className="flex items-start justify-between gap-4 border-b border-[#1c1c1c] p-5 sm:p-6">
              <div>
                <p className="font-mono text-[10px] font-medium uppercase tracking-[0.28em] text-[#7b2fbe]">
                  Contact Card / C-01
                </p>
                <h3
                  id="contact-modal-title"
                  className="font-display mt-2 text-2xl leading-[0.95] text-white sm:text-3xl"
                >
                  CONTACT US
                </h3>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="flex h-9 w-9 flex-none items-center justify-center border border-[#2a2a2a] text-[#aaaaaa] transition-colors hover:border-white hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Custom pricing copy */}
            <div className="border-b border-[#1c1c1c] p-5 sm:p-6">
              <p className="font-mono text-[10px] font-medium uppercase tracking-[0.28em] text-[#7b2fbe]">
                Custom Engagements
              </p>
              <p className="mt-3 text-[15px] leading-relaxed text-[#e5e5e5]">
                The Starter Kit and Apex Vault cover the standard track. For
                operators who need a{" "}
                <strong className="font-semibold text-white">
                  tailored architecture
                </strong>{" "}
                — multi-engine rebuilds, custom protocols, or pricing structured
                to your firm — the channels below open a direct line. Each
                engagement is scoped and quoted individually.
              </p>
            </div>

            <div className="space-y-3 p-5 sm:p-6">
              <a
                href="https://whop.com/joined/apex-axis/"
                target="_blank"
                rel="noreferrer"
                className="group flex items-center justify-between gap-4 border border-[#1c1c1c] bg-[#0a0a0a] p-5 transition-colors hover:border-[#7b2fbe]"
              >
                <div>
                  <p className="font-mono text-[10px] font-medium uppercase tracking-[0.28em] text-[#7b2fbe]">
                    Platform
                  </p>
                  <p className="font-display mt-2 text-lg leading-[1] text-white">
                    WHOP
                  </p>
                  <p className="mt-2 text-xs leading-relaxed text-[#aaaaaa]">
                    Starter Kit and Apex Vault — direct access.
                  </p>
                </div>
                <ArrowUpRight className="h-5 w-5 flex-none text-[#aaaaaa] transition-all group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>

              <a
                href="https://x.com/sonudevpr"
                target="_blank"
                rel="noreferrer"
                className="group flex items-center justify-between gap-4 border border-[#1c1c1c] bg-[#0a0a0a] p-5 transition-colors hover:border-[#7b2fbe]"
              >
                <div>
                  <p className="font-mono text-[10px] font-medium uppercase tracking-[0.28em] text-[#7b2fbe]">
                    Signal / Custom Inquiries
                  </p>
                  <p className="font-display mt-2 text-lg leading-[1] text-white">
                    X / @SONUDEVPR
                  </p>
                  <p className="mt-2 text-xs leading-relaxed text-[#aaaaaa]">
                    DM for custom plans and bespoke engagements.
                  </p>
                </div>
                <ArrowUpRight className="h-5 w-5 flex-none text-[#aaaaaa] transition-all group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>

            <div className="border-t border-[#1c1c1c] p-5 sm:p-6">
              <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#8a8a8a]">
                No forms. No queues. Direct channels only.
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ------------------------------------------------------------------ */
/*  CONTACT MODAL                                                      */
/* ------------------------------------------------------------------ */

function ContactSection() {
  return (
    <section id="contact" className="border-b border-[#1c1c1c]">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-10 lg:py-32">
        <Reveal>
          <SectionLabel index="06" label="Direct Channels" />
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-10 border border-[#7b2fbe] bg-[#0f0f0f]">
            {/* Header */}
            <div className="flex flex-col gap-4 border-b border-[#1c1c1c] p-6 sm:flex-row sm:items-end sm:justify-between sm:p-8 lg:p-10">
              <div>
                <p className="font-mono text-[10px] font-medium uppercase tracking-[0.28em] text-[#7b2fbe]">
                  Contact Card / C-01
                </p>
                <h2 className="font-display mt-3 text-4xl leading-[0.95] text-white sm:text-5xl lg:text-6xl">
                  CONTACT US
                </h2>
              </div>
              <p className="font-mono text-[10px] font-medium uppercase tracking-[0.28em] text-[#8a8a8a] sm:text-right">
                No forms. No queues.
                <br className="hidden sm:inline" />
                Direct channels only.
              </p>
            </div>

            {/* Body — custom pricing copy */}
            <div className="border-b border-[#1c1c1c] p-6 sm:p-8 lg:p-10">
              <p className="font-mono text-[10px] font-medium uppercase tracking-[0.28em] text-[#7b2fbe]">
                Custom Engagements
              </p>
              <p className="mt-4 max-w-3xl text-[17px] leading-relaxed text-[#e5e5e5] sm:text-lg">
                The Starter Kit and Apex Vault cover the standard architecture
                track. Operators with{" "}
                <strong className="font-semibold text-white">
                  bespoke requirements
                </strong>{" "}
                — multi-engine rebuilds, team architecture, custom protocols, or
                tailored pricing structures — should reach out directly.
              </p>
              <p className="mt-4 max-w-3xl text-[15px] leading-relaxed text-[#aaaaaa]">
                Contact us for{" "}
                <strong className="font-semibold text-white">custom plans</strong>{" "}
                and structural consulting beyond the public tiers. Pricing is
                quoted per engagement.
              </p>
            </div>

            {/* Channels */}
            <div className="grid gap-px bg-[#1c1c1c] sm:grid-cols-2">
              <a
                href="https://whop.com/joined/apex-axis/"
                target="_blank"
                rel="noreferrer"
                className="group flex items-start justify-between gap-4 bg-[#0a0a0a] p-6 transition-colors hover:bg-[#0f0f0f] sm:p-8 lg:p-10"
              >
                <div>
                  <p className="font-mono text-[10px] font-medium uppercase tracking-[0.28em] text-[#7b2fbe]">
                    Platform
                  </p>
                  <p className="font-display mt-3 text-2xl leading-[1] text-white sm:text-3xl">
                    WHOP
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-[#aaaaaa]">
                    Starter Kit and Apex Vault — direct access to the firm's
                    productized tiers.
                  </p>
                </div>
                <ArrowUpRight className="h-5 w-5 flex-none text-[#aaaaaa] transition-all group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>

              <a
                href="https://x.com/sonudevpr"
                target="_blank"
                rel="noreferrer"
                className="group flex items-start justify-between gap-4 bg-[#0a0a0a] p-6 transition-colors hover:bg-[#0f0f0f] sm:p-8 lg:p-10"
              >
                <div>
                  <p className="font-mono text-[10px] font-medium uppercase tracking-[0.28em] text-[#7b2fbe]">
                    Signal / Custom Inquiries
                  </p>
                  <p className="font-display mt-3 text-2xl leading-[1] text-white sm:text-3xl">
                    X / @SONUDEVPR
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-[#aaaaaa]">
                    Founder channel. DM for custom plans, bespoke engagements,
                    and pricing outside the standard tiers.
                  </p>
                </div>
                <ArrowUpRight className="h-5 w-5 flex-none text-[#aaaaaa] transition-all group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  HERO                                                               */
/* ------------------------------------------------------------------ */

function Hero() {
  return (
    <section id="top" className="relative overflow-hidden border-b border-[#1c1c1c]">
      {/* Layered blueprint background */}
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-60" />
      <svg
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.07]"
        width="900"
        height="900"
        viewBox="0 0 900 900"
        fill="none"
        aria-hidden="true"
      >
        <circle cx="450" cy="450" r="440" stroke="#7B2FBE" strokeWidth="1" />
        <circle cx="450" cy="450" r="300" stroke="#7B2FBE" strokeWidth="1" />
        <circle cx="450" cy="450" r="180" stroke="#7B2FBE" strokeWidth="1" />
      </svg>
      <div className="pointer-events-none absolute inset-0 vignette" />

      <CropMarks />

      <div className="relative mx-auto max-w-7xl px-4 pt-16 pb-20 sm:px-6 sm:pt-20 sm:pb-24 lg:px-10 lg:pt-28 lg:pb-32">
        {/* Animated brand mark */}
        <Reveal className="flex justify-center">
          <div className="relative">
            <Logo className="h-20 w-20 sm:h-28 sm:w-28 lg:h-32 lg:w-32" animate speed={0.58} />
          </div>
        </Reveal>

        {/* Official wordmark typography: Montserrat 800, tight tracking. */}
        <Reveal delay={0.1}>
          <h1 className="font-display mt-8 text-center text-[clamp(2.65rem,15vw,8.75rem)] leading-[0.9] text-white sm:mt-10">
            APEX &amp; AXIS
          </h1>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="mx-auto mt-5 max-w-[22rem] text-center font-mono text-[10px] font-medium uppercase leading-relaxed tracking-[0.24em] text-[#aaaaaa] sm:mt-6 sm:max-w-none sm:text-xs sm:tracking-[0.42em] lg:text-sm">
            Build at the Root. Scale Without Limit.
          </p>
        </Reveal>

        <Reveal delay={0.3}>
          <p className="mx-auto mt-10 max-w-3xl text-center text-[15px] leading-relaxed text-[#aaaaaa] sm:mt-14 sm:text-base lg:text-lg">
            A <strong className="font-semibold text-white">business architecture firm</strong>{" "}
            for solo operators. We diagnose and treat{" "}
            <strong className="font-semibold text-white">
              Founder-Dependency Syndrome
            </strong>{" "}
            — the structural failure that makes a one-person business collapse
            when the founder stops working.
          </p>
        </Reveal>

        <Reveal delay={0.36}>
          <p className="mx-auto mt-4 text-center font-mono text-[10px] uppercase tracking-[0.22em] text-[#8a8a8a] sm:text-[11px] sm:tracking-[0.28em]">
            By SONUDEV P R — Founder, Apex &amp; Axis
          </p>
        </Reveal>

        <Reveal delay={0.38}>
          <div className="mt-10 flex flex-col items-stretch justify-center gap-3 sm:mt-12 sm:flex-row sm:items-center sm:gap-4">
            <a
              href="#axis-audit"
              className="group inline-flex w-full items-center justify-between gap-5 bg-[#7b2fbe] px-5 py-4 font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-white transition-colors hover:bg-[#6a27a6] sm:w-auto sm:px-6 sm:text-[11px] sm:tracking-[0.28em]"
            >
              Run the Axis Audit
              <ArrowUpRight className="h-4 w-4" />
            </a>
            <a
              href="https://whop.com/joined/apex-axis/products/axis-starter-kit/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex w-full items-center justify-between gap-5 border border-[#2a2a2a] px-5 py-4 font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-[#e5e5e5] transition-colors hover:border-white hover:text-white sm:w-auto sm:px-6 sm:text-[11px] sm:tracking-[0.28em]"
            >
              Get Starter Kit ($0)
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </Reveal>


      </div>
    </section>
  );
}

function CropMarks() {
  return (
    <>
      <div className="absolute left-6 top-6 h-6 w-6 lg:left-10 lg:top-10">
        <div className="absolute left-0 top-0 h-px w-6 bg-[#2a2a2a]" />
        <div className="absolute left-0 top-0 h-6 w-px bg-[#2a2a2a]" />
      </div>
      <div className="absolute right-6 top-6 h-6 w-6 lg:right-10 lg:top-10">
        <div className="absolute right-0 top-0 h-px w-6 bg-[#2a2a2a]" />
        <div className="absolute right-0 top-0 h-6 w-px bg-[#2a2a2a]" />
      </div>
      <div className="absolute bottom-6 left-6 h-6 w-6 lg:bottom-10 lg:left-10">
        <div className="absolute bottom-0 left-0 h-px w-6 bg-[#2a2a2a]" />
        <div className="absolute bottom-0 left-0 h-6 w-px bg-[#2a2a2a]" />
      </div>
      <div className="absolute bottom-6 right-6 h-6 w-6 lg:bottom-10 lg:right-10">
        <div className="absolute bottom-0 right-0 h-px w-6 bg-[#2a2a2a]" />
        <div className="absolute bottom-0 right-0 h-6 w-px bg-[#2a2a2a]" />
      </div>
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  DIAGNOSIS                                                          */
/* ------------------------------------------------------------------ */

function Diagnosis() {
  const symptoms = [
    "Demand generation halts when the founder stops publishing.",
    "Sales conversion depends on the founder being in the room.",
    "Delivery and decision-making route through one inbox.",
    "Growth adds complexity instead of capacity.",
  ];

  return (
    <section id="diagnosis" className="border-b border-[#1c1c1c]">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-10 lg:py-32">
        <div className="grid gap-16 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <SectionLabel index="01" label="Clinical Definition" />
            <h2 className="font-display mt-8 text-5xl leading-[0.95] text-white lg:text-6xl">
              FOUNDER-
              <br />
              DEPENDENCY
              <br />
              <span className="text-[#7b2fbe]">SYNDROME</span>
            </h2>
            <p className="mt-8 font-mono text-[11px] font-medium uppercase tracking-[0.28em] text-[#8a8a8a]">
              FDS / Condition / Structural
            </p>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-7">
            <div className="space-y-6 text-lg leading-relaxed text-[#aaaaaa]">
              <p>
                In an FDS operation,{" "}
                <strong className="font-semibold text-white">demand generation</strong>,{" "}
                <strong className="font-semibold text-white">sales conversion</strong>,{" "}
                <strong className="font-semibold text-white">delivery</strong>,{" "}
                <strong className="font-semibold text-white">decision-making</strong>,
                and{" "}
                <strong className="font-semibold text-white">growth</strong> all
                remain locked inside the founder's calendar and memory.
              </p>
              <p>
                The firm rebuilds solo operations through four engine systems: Marketing, Sales, Operations, and Growth. Operators can begin with the free Axis Starter Kit, which includes the Axis Audit, Content Multiplier, Axis Protocol, and Architect's Stack. The Apex Vault contains the complete operating framework for the four engines plus the Operator's Guide for sequenced execution.
              </p>
              <p>
                It is not a mindset condition. It is an architecture condition —
                the business was built on effort, not on system.
              </p>
            </div>

            <div className="mt-12 border-l-2 border-[#7b2fbe] pl-6">
              <p className="font-mono text-[11px] font-medium uppercase tracking-[0.28em] text-[#8a8a8a]">
                Observed Symptoms
              </p>
              <ul className="mt-5 space-y-3">
                {symptoms.map((s) => (
                  <li
                    key={s}
                    className="flex items-start gap-3 text-[15px] leading-relaxed text-[#e5e5e5]"
                  >
                    <Minus className="mt-1.5 h-3 w-3 flex-none text-[#7b2fbe]" />
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  ENGINES                                                            */
/* ------------------------------------------------------------------ */

type Engine = {
  index: string;
  name: string;
  governs: string;
  outputs: string;
  Icon: typeof Megaphone;
};

const ENGINES: Engine[] = [
  {
    index: "E-01",
    name: "Marketing Engine",
    governs: "Governs demand and authority.",
    outputs: "Positioning, content pipelines, distribution loops.",
    Icon: Megaphone,
  },
  {
    index: "E-02",
    name: "Sales Engine",
    governs: "Governs qualification, conversion, and settlement.",
    outputs: "Offers, intake flows, pricing logic, close sequences.",
    Icon: HandCoins,
  },
  {
    index: "E-03",
    name: "Operations Engine",
    governs: "Governs documented workflows, delegation, and tool integration.",
    outputs: "SOPs, handoffs, role primitives, review cycles.",
    Icon: Cog,
  },
  {
    index: "E-04",
    name: "Growth Engine",
    governs:
      "Governs constraints, capacity, ascension paths, and expansion beyond founder-led delivery.",
    outputs: "Unit economics, retention loops, leverage points.",
    Icon: TrendingUp,
  },
];

function Engines() {
  return (
    <section id="engines" className="border-b border-[#1c1c1c]">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-10 lg:py-32">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <Reveal>
            <SectionLabel index="02" label="Operating Architecture" />
            <h2 className="font-display mt-8 max-w-2xl text-5xl leading-[0.95] text-white lg:text-6xl">
              FOUR ENGINES.
              <br />
              <span className="text-[#aaaaaa]">ONE OPERATOR.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="max-w-md text-[15px] leading-relaxed text-[#aaaaaa]">
              The firm rebuilds solo operations through four engine systems.
              The difference between a job and a firm is which one you have.
            </p>
          </Reveal>
        </div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-16 grid gap-px bg-[#1c1c1c] md:grid-cols-2"
        >
          {ENGINES.map((e) => (
            <EngineCard key={e.index} engine={e} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function EngineCard({ engine }: { engine: Engine }) {
  const { Icon } = engine;
  return (
    <motion.article
      variants={fadeUp}
      className="responsive-surface group relative flex flex-col gap-8 bg-[#0a0a0a] p-8 transition-colors hover:bg-[#0f0f0f] lg:p-12"
    >
      <div className="flex items-start justify-between">
        <div className="flex h-12 w-12 items-center justify-center border border-[#2a2a2a] bg-[#0f0f0f]">
          <Icon className="h-5 w-5 text-[#7b2fbe]" strokeWidth={1.75} />
        </div>
        <span className="font-mono text-[11px] font-medium uppercase tracking-[0.28em] text-[#8a8a8a]">
          {engine.index}
        </span>
      </div>

      <div className="flex-1">
        <h3 className="font-display text-3xl leading-[0.95] text-white">
          {engine.name.toUpperCase()}
        </h3>
        <p className="mt-4 text-[15px] leading-relaxed text-[#aaaaaa]">
          {engine.governs}
        </p>
      </div>

      <div className="border-t border-[#1c1c1c] pt-5">
        <p className="font-mono text-[10px] font-medium uppercase tracking-[0.28em] text-[#8a8a8a]">
          Outputs
        </p>
        <p className="mt-2 text-sm text-[#e5e5e5]">{engine.outputs}</p>
      </div>
    </motion.article>
  );
}

/* ------------------------------------------------------------------ */
/*  AXIS AUDIT                                                         */
/* ------------------------------------------------------------------ */

function AuditSection() {
  return (
    <section id="axis-audit" className="border-b border-[#1c1c1c]">
      <div className="mx-auto max-w-5xl px-4 py-20 sm:px-6 sm:py-24 lg:px-10 lg:py-32">
        <Reveal>
          <SectionLabel index="03" label="Embedded Diagnostic" />
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="font-display mt-8 max-w-3xl text-5xl leading-[0.95] text-white lg:text-6xl">
            THE AXIS AUDIT.
            <br />
            <span className="text-[#aaaaaa]">20 QUESTIONS. FOUR ENGINES.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="mt-6 max-w-2xl text-[15px] leading-relaxed text-[#aaaaaa]">
            Full diagnostic across Marketing, Sales, Operations, and Growth.
            Answer 20 binary questions to receive an overall zone verdict and
            a single weakest-engine diagnosis. Scoring runs entirely client-side.
          </p>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="mt-12">
            <Suspense
              fallback={
                <div className="border border-[#1c1c1c] bg-[#0f0f0f] p-6 sm:p-8">
                  <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#7b2fbe]">
                    Loading Audit
                  </p>
                  <p className="mt-4 text-sm leading-relaxed text-[#aaaaaa]">
                    The full 20-question diagnostic is loading.
                  </p>
                </div>
              }
            >
              <AxisAudit />
            </Suspense>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  STARTER KIT                                                        */
/* ------------------------------------------------------------------ */

function StarterKit() {
  const components = [
    {
      code: "K-01",
      name: "Axis Audit",
      desc: "Full diagnostic across Marketing, Sales, Operations, and Growth.",
    },
    {
      code: "K-02",
      name: "Content Multiplier",
      desc: "A pipeline that converts one signal into a release cadence.",
    },
    {
      code: "K-03",
      name: "Axis Protocol",
      desc: "Sequenced execution rules for the first 30 days of rebuild.",
    },
    {
      code: "K-04",
      name: "Architect's Stack",
      desc: "The minimum tool set required to operate the four engines.",
    },
  ];

  return (
    <section id="starter-kit" className="border-b border-[#1c1c1c]">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-10 lg:py-32">
        <div className="grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <SectionLabel index="04" label="Free Tier" />
            <h2 className="font-display mt-8 text-5xl leading-[0.95] text-white lg:text-6xl">
              AXIS STARTER KIT.
            </h2>
            <div className="mt-6 flex items-baseline gap-3">
              <span className="font-display text-6xl text-white">$0</span>
              <span className="font-mono text-[11px] font-medium uppercase tracking-[0.28em] text-[#8a8a8a]">
                / one-time access
              </span>
            </div>
            <p className="mt-8 max-w-md text-[15px] leading-relaxed text-[#aaaaaa]">
              The entry diagnostic for operators presenting with FDS. Four
              components. Self-administered. No call required.
            </p>
            <a
              href="https://whop.com/joined/apex-axis/products/axis-starter-kit/"
              target="_blank"
              rel="noreferrer"
              className="group mt-10 inline-flex items-center justify-between gap-6 border border-[#2a2a2a] bg-[#0f0f0f] px-6 py-4 font-mono text-[11px] font-medium uppercase tracking-[0.28em] text-white transition-colors hover:border-white"
            >
              Access the Starter Kit
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-7">
            <div className="grid gap-px bg-[#1c1c1c] sm:grid-cols-2">
              {components.map((c) => (
                <div key={c.code} className="responsive-surface bg-[#0a0a0a] p-6 lg:p-8">
                  <p className="font-mono text-[10px] font-medium uppercase tracking-[0.28em] text-[#7b2fbe]">
                    {c.code}
                  </p>
                  <h3 className="font-display mt-3 text-xl leading-[0.95] text-white">
                    {c.name.toUpperCase()}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#aaaaaa]">
                    {c.desc}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  VAULT                                                              */
/* ------------------------------------------------------------------ */

function Vault() {
  const inclusions = [
    "Everything in the Axis Starter Kit",
    "Complete operating framework for the Marketing Engine",
    "Complete operating framework for the Sales Engine",
    "Complete operating framework for the Operations Engine",
    "Complete operating framework for the Growth Engine",
    "The Operator's Guide — sequenced execution across all four engines",
  ];

  return (
    <section id="vault" className="border-b border-[#1c1c1c]">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-10 lg:py-32">
        <div className="grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <SectionLabel index="05" label="Paid Tier" />
            <h2 className="font-display mt-8 text-5xl leading-[0.95] text-white lg:text-6xl">
              THE APEX VAULT.
            </h2>
            <div className="mt-6 flex items-baseline gap-3">
              <span className="font-display text-5xl text-white sm:text-6xl">$9.99</span>
              <span className="font-mono text-[11px] font-medium uppercase tracking-[0.28em] text-[#8a8a8a]">
                / lifetime access
              </span>
            </div>
            <p className="mt-8 max-w-md text-[15px] leading-relaxed text-[#aaaaaa]">
              One-time payment. Lifetime access. The complete operating framework
              for the four engines, plus the Operator's Guide for sequenced
              execution. Released and maintained inside the firm's working vault.
            </p>
            <a
              href="https://whop.com/joined/apex-axis/products/apex-vault-blueprint/"
              target="_blank"
              rel="noreferrer"
              className="group mt-10 inline-flex items-center justify-between gap-6 bg-[#7b2fbe] px-6 py-4 font-mono text-[11px] font-medium uppercase tracking-[0.28em] text-white transition-colors hover:bg-[#6a27a6]"
            >
              Enter the Apex Vault
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-7">
            <div className="border border-[#7b2fbe] bg-[#0f0f0f]">
              <div className="flex items-center justify-between border-b border-[#1c1c1c] px-6 py-4 lg:px-8">
                <p className="font-mono text-[10px] font-medium uppercase tracking-[0.28em] text-[#7b2fbe]">
                  Vault Manifest / T-02
                </p>
                <p className="font-mono text-[10px] font-medium uppercase tracking-[0.28em] text-[#8a8a8a]">
                  Rolling release
                </p>
              </div>
              <ul className="divide-y divide-[#1c1c1c]">
                {inclusions.map((i, idx) => (
                  <li
                    key={i}
                    className="flex items-start gap-4 px-6 py-5 lg:px-8"
                  >
                    <span className="mt-0.5 font-mono text-[10px] font-medium uppercase tracking-[0.24em] text-[#8a8a8a]">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <Check
                      className="mt-0.5 h-4 w-4 flex-none text-[#7b2fbe]"
                      strokeWidth={2.25}
                    />
                    <span className="text-sm leading-relaxed text-[#e5e5e5]">
                      {i}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  CLOSING                                                            */
/* ------------------------------------------------------------------ */

function Closing() {
  return (
    <section className="border-b border-[#1c1c1c]">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-10 lg:py-32">
        <Reveal>
          <SectionLabel index="07" label="Position" />
        </Reveal>
        <Reveal delay={0.1}>
          <p className="font-display mt-10 max-w-5xl text-4xl leading-[1.05] text-white lg:text-6xl">
            A BUSINESS IS NOT WHAT THE FOUNDER DOES.
            <span className="text-[#aaaaaa]">
              {" "}
              IT IS THE ARCHITECTURE THAT RUNS WITHOUT THEM.
            </span>
          </p>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="mt-12 flex flex-col gap-4 sm:flex-row">
            <a
              href="https://whop.com/joined/apex-axis/products/apex-vault-blueprint/"
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center justify-between gap-6 bg-[#7b2fbe] px-6 py-4 font-mono text-[11px] font-medium uppercase tracking-[0.28em] text-white transition-colors hover:bg-[#6a27a6]"
            >
              Begin the Build
              <ArrowUpRight className="h-4 w-4" />
            </a>
            <a
              href="#axis-audit"
              className="inline-flex items-center justify-between gap-6 border border-[#2a2a2a] px-6 py-4 font-mono text-[11px] font-medium uppercase tracking-[0.28em] text-[#e5e5e5] transition-colors hover:border-white hover:text-white"
            >
              Run the Audit Again
              <Plus className="h-4 w-4" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  FOOTER                                                             */
/* ------------------------------------------------------------------ */

function Footer() {
  return (
    <footer className="bg-[#0a0a0a]">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-10">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-6">
            <Wordmark size={22} />
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-[#aaaaaa]">
              Business architecture for the solo operator. Build at the root.
              Scale without limit.
            </p>
            <p className="mt-6 font-mono text-[10px] font-medium uppercase tracking-[0.28em] text-[#8a8a8a]">
              apexandaxis.org
            </p>
          </div>

          <div className="md:col-span-3">
            <p className="font-mono text-[10px] font-medium uppercase tracking-[0.28em] text-[#8a8a8a]">
              Sections
            </p>
            <ul className="mt-5 space-y-3 text-sm text-[#e5e5e5]">
              <li>
                <a href="#diagnosis" className="transition-colors hover:text-white">
                  Diagnosis
                </a>
              </li>
              <li>
                <a href="#engines" className="transition-colors hover:text-white">
                  Four Engines
                </a>
              </li>
              <li>
                <a href="#axis-audit" className="transition-colors hover:text-white">
                  Axis Audit
                </a>
              </li>
              <li>
                <a href="#starter-kit" className="transition-colors hover:text-white">
                  Starter Kit
                </a>
              </li>
              <li>
                <a href="#vault" className="transition-colors hover:text-white">
                  Apex Vault
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <p className="font-mono text-[10px] font-medium uppercase tracking-[0.28em] text-[#8a8a8a]">
              External
            </p>
            <ul className="mt-5 space-y-3 text-sm text-[#e5e5e5]">
              <li>
                <a
                  href="https://whop.com/joined/apex-axis/products/apex-vault-blueprint/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 transition-colors hover:text-white"
                >
                  Whop <ArrowUpRight className="h-3 w-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://x.com/sonudevpr"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 transition-colors hover:text-white"
                >
                  X / @sonudevpr <ArrowUpRight className="h-3 w-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://youtube.com/@sonudevpr"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 transition-colors hover:text-white"
                >
                  YouTube <ArrowUpRight className="h-3 w-3" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 h-px w-full bg-[#1c1c1c]" />

        <div className="mt-8 flex flex-col items-start justify-between gap-4 font-mono text-[10px] font-medium uppercase tracking-[0.28em] text-[#8a8a8a] md:flex-row md:items-center">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-6">
            <span>© 2026 Apex &amp; Axis — All systems reserved.</span>
            <span>By SONUDEV P R — Founder, Apex &amp; Axis</span>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-6">
            <span>Published: 2026-05-24</span>
            <span>Build at the Root. Scale Without Limit.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ------------------------------------------------------------------ */
/*  APP                                                                */
/* ------------------------------------------------------------------ */

export default function App() {
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white antialiased">
      <Nav onOpenContact={() => setContactOpen(true)} />
      <main id="main-content">
        <Hero />
        <Diagnosis />
        <Engines />
        <AuditSection />
        <StarterKit />
        <Vault />
        <ContactSection />
        <Closing />
      </main>
      <Footer />
      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />
    </div>
  );
}
