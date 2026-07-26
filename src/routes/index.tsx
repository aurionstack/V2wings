import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, useRef, type ReactNode, type CSSProperties } from "react";

/* ---------- Professional Editorial Scroll Reveal Component ---------- */
interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "fade" | "scale";
}

function Reveal({ children, className = "", delay = 0, direction = "up" }: RevealProps) {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = domRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const getTransform = () => {
    if (isVisible) return "translate3d(0, 0, 0) scale(1)";
    if (direction === "up") return "translate3d(0, 36px, 0) scale(0.98)";
    if (direction === "down") return "translate3d(0, -36px, 0) scale(1)";
    if (direction === "left") return "translate3d(36px, 0, 0) scale(1)";
    if (direction === "right") return "translate3d(-36px, 0, 0) scale(1)";
    if (direction === "scale") return "translate3d(0, 0, 0) scale(0.93)";
    return "translate3d(0, 0, 0) scale(1)";
  };

  const style: CSSProperties = {
    opacity: isVisible ? 1 : 0,
    transform: getTransform(),
    transition: `opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
    willChange: "opacity, transform",
  };

  return (
    <div ref={domRef} style={style} className={className}>
      {children}
    </div>
  );
}

import logo from "@/assets/v2wings-logo.jpg.asset.json";
import trainer from "@/assets/master-trainer.png.asset.json";
import hero1 from "@/assets/hero/hero1.jpg.asset.json";
import hero2 from "@/assets/hero/hero2.jpg.asset.json";
import hero3 from "@/assets/hero/hero3.jpg.asset.json";
import hero4 from "@/assets/hero/hero4.jpg.asset.json";
import hero5 from "@/assets/hero/hero5.jpg.asset.json";
import studentWork1 from "@/assets/student-work/student-work1.jpg.asset.json";
import studentWork2 from "@/assets/student-work/student-work2.jpg.asset.json";
import studentWork3 from "@/assets/student-work/student-work3.jpg.asset.json";
import studentWork4 from "@/assets/student-work/student-work4.jpg.asset.json";

export const Route = createFileRoute("/")({
  component: Index,
});

const HERO_IMAGES = [hero1.url, hero2.url, hero3.url, hero4.url, hero5.url];
const STUDENT_WORK = [
  studentWork1.url,
  studentWork2.url,
  studentWork3.url,
  studentWork4.url,
];

const PHONE = "86988 69253";
const PHONE_TEL = "+918698869253";
const WA_BASE = "https://wa.me/918698869253";
const IG = "https://instagram.com/v2wingscoaching_margao";
const MAPS_EMBED =
  "https://www.google.com/maps?q=Reliance+Trade+Centre+Pajifond+Margao+Goa&output=embed";

const wa = (msg: string) => `${WA_BASE}?text=${encodeURIComponent(msg)}`;

const SKILLS = [
  "Sewing Machine",
  "Necklines",
  "Born Baby Dress",
  "Salwar Kameez",
  "A-Line Dress",
  "Umbrella Dress",
  "Six-Piece Dress",
];

const SECTIONS = [
  { id: "hero", label: "0IN", full: "Start" },
  { id: "why", label: "6IN", full: "Why us" },
  { id: "programs", label: "12IN", full: "Programs" },
  { id: "trainer", label: "18IN", full: "Trainer" },
  { id: "reviews", label: "24IN", full: "Reviews" },
  { id: "visit", label: "30IN", full: "Visit" },
];

function Index() {
  return (
    <div className="relative min-h-screen bg-canvas text-ink">
      <TapeRail />
      <TopBar />
      <main>
        <Hero />
        <StitchDivider />
        <SkillsTicker />
        <StitchDivider />
        <Why />
        <Programs />
        <StitchDivider gold />
        <Trainer />
        <Reviews />
        <StitchDivider />
        <Visit />
        <Footer />
      </main>
    </div>
  );
}

/* ---------- Tape-measure rail ---------- */
function TapeRail() {
  const [active, setActive] = useState("hero");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      setProgress(h.scrollTop / Math.max(1, h.scrollHeight - h.clientHeight));
      let cur = "hero";
      for (const s of SECTIONS) {
        const el = document.getElementById(s.id);
        if (el && el.getBoundingClientRect().top < window.innerHeight * 0.35) {
          cur = s.id;
        }
      }
      setActive(cur);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      aria-label="Section scale navigation"
      className="fixed left-0 top-1/2 -translate-y-1/2 z-40 flex flex-col items-center py-3.5 sm:py-5 w-11 sm:w-16 border-y border-r border-ink/15 bg-transparent rounded-r-xl sm:rounded-r-2xl shadow-2xs transition-all hover:w-14 sm:hover:w-20 hover:bg-canvas/20 group"
    >
      <div className="flex flex-col items-center gap-2.5 sm:gap-3 w-full">
        {SECTIONS.map((s) => {
          const isActive = active === s.id;
          return (
            <a
              key={s.id}
              href={`#${s.id}`}
              aria-label={`Scroll to ${s.full}`}
              className="flex items-center gap-1.5 sm:gap-2 py-1 sm:py-1.5 px-1.5 sm:px-2.5 transition-all w-full group/item"
            >
              <span
                className={`h-0.5 transition-all ${
                  isActive ? "bg-rose w-4 sm:w-6 shadow-[0_0_6px_rgba(214,51,108,0.6)]" : "bg-ink/30 w-2.5 sm:w-3.5 group-hover/item:bg-ink"
                }`}
              />
              <span
                className={`font-mono text-[9px] sm:text-[10px] tracking-tight sm:tracking-widest transition-colors ${
                  isActive ? "text-rose font-bold scale-105" : "text-charcoal group-hover/item:text-ink"
                }`}
              >
                {s.label.replace("IN", '"')}
              </span>
            </a>
          );
        })}
      </div>
    </nav>
  );
}

/* ---------- Top bar ---------- */
function TopBar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 border-b border-ink/10 bg-canvas/95 backdrop-blur-md transition-all">
      <div className="mx-auto flex items-center justify-between gap-4 px-5 py-3.5 sm:px-8">
        <a href="#hero" className="flex min-w-0 items-center gap-3 group">
          <img
            src={logo.url}
            alt="V2Wings Coaching logo"
            className="h-10 w-10 shrink-0 rounded-full object-cover ring-1 ring-ink/15 transition-transform duration-300 group-hover:scale-105"
          />
          <div className="min-w-0 leading-tight">
            <div className="truncate font-display text-lg text-ink tracking-tight group-hover:text-rose transition-colors">V2Wings Coaching</div>
            <div className="font-mono text-[10px] tracking-widest text-charcoal">
              MARGAO · GOA
            </div>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav aria-label="Main Navigation" className="hidden lg:flex items-center gap-6 font-mono text-xs tracking-widest text-charcoal uppercase">
          <a href="#why" className="hover:text-rose transition-colors py-1">Why Us</a>
          <a href="#programs" className="hover:text-rose transition-colors py-1">Programs</a>
          <a href="#trainer" className="hover:text-rose transition-colors py-1">Trainer</a>
          <a href="#reviews" className="hover:text-rose transition-colors py-1">Reviews</a>
          <a href="#visit" className="font-semibold text-ink hover:text-rose transition-colors py-1">Visit Studio</a>
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          <a
            href={wa("Hi Vandana ma'am, I'd like to know more about your dress making classes.")}
            target="_blank"
            rel="noreferrer"
            className="hidden md:inline-flex shrink-0 items-center gap-2 rounded-full bg-ink px-4.5 py-2 text-xs sm:text-sm font-medium text-canvas transition-colors hover:bg-rose shadow-2xs hover:shadow-sm"
          >
            <span>WhatsApp Us</span>
            <span aria-hidden className="font-mono text-[11px]">→</span>
          </a>

          {/* Mobile menu toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="inline-flex items-center justify-center rounded-full border border-ink/20 p-2 text-ink transition-colors hover:bg-ink/5 lg:hidden"
          >
            {mobileMenuOpen ? (
              <span aria-hidden className="font-mono text-sm leading-none px-1.5">×</span>
            ) : (
              <span aria-hidden className="font-mono text-xs leading-none px-1.5">☰</span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      {mobileMenuOpen && (
        <nav aria-label="Mobile Navigation" className="border-t border-ink/10 bg-canvas px-5 py-4 sm:px-8 lg:hidden shadow-lg animate-in slide-in-from-top duration-200">
          <ul className="flex flex-col gap-3 font-mono text-xs tracking-widest uppercase">
            <li><a href="#why" onClick={() => setMobileMenuOpen(false)} className="block py-1.5 text-charcoal hover:text-rose transition-colors">Why Us</a></li>
            <li><a href="#programs" onClick={() => setMobileMenuOpen(false)} className="block py-1.5 text-charcoal hover:text-rose transition-colors">Programs</a></li>
            <li><a href="#trainer" onClick={() => setMobileMenuOpen(false)} className="block py-1.5 text-charcoal hover:text-rose transition-colors">Trainer</a></li>
            <li><a href="#reviews" onClick={() => setMobileMenuOpen(false)} className="block py-1.5 text-charcoal hover:text-rose transition-colors">Reviews</a></li>
            <li><a href="#visit" onClick={() => setMobileMenuOpen(false)} className="block py-1.5 font-semibold text-ink hover:text-rose transition-colors">📍 Visit Studio & Contact</a></li>
          </ul>
        </nav>
      )}
    </header>
  );
}

/* ---------- Hero ---------- */
function Hero() {
  return (
    <section id="hero" className="relative scroll-mt-8 overflow-hidden bg-ink">
      {/* Background carousel */}
      <div aria-hidden className="absolute inset-0">
        {HERO_IMAGES.map((url, i) => (
          <div
            key={url}
            className="hero-bg-slide"
            style={{
              backgroundImage: `url(${url})`,
              animationDelay: `${i * 6}s`,
            }}
          />
        ))}
        {/* Subtle ambient overlay over photography (90% transparent across all viewports) */}
        <div className="absolute inset-0 bg-canvas/10 pointer-events-none" />
      </div>

      <div className="relative mx-auto grid gap-6 px-5 py-8 sm:px-8 md:min-h-[580px] md:grid-cols-2 md:gap-10 md:py-16">
        {/* Editorial typography scrim card for guaranteed AA+ legibility over full-bleed imagery */}
        <div className="flex flex-col justify-center rounded-2xl bg-canvas/90 backdrop-blur-md p-6 sm:p-7 md:p-8 border border-ink/10 shadow-lg my-auto">
          <div className="mb-4 font-mono text-[11px] uppercase tracking-[0.22em] text-charcoal">
            Fashion & Dress&nbsp;Making · Margao
          </div>
          <h1 className="font-display text-[2.3rem] leading-[1.05] tracking-tight text-ink sm:text-5xl lg:text-6xl">
            Learn to stitch.
            <br />
            Practice to create.
            <br />
            <span className="italic text-rose">Grow your own boutique.</span>
          </h1>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-charcoal sm:text-base">
            Small-batch classes in Pajifond, taught hands-on by Vandana ma'am.
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-4">
            <a
              href={wa("Hi Vandana ma'am, I'd like to join a dress making class at V2Wings.")}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-rose px-6 py-3.5 text-sm font-medium text-canvas transition-all hover:bg-ink shadow-sm hover:shadow-md"
            >
              <span>WhatsApp Us</span>
              <span aria-hidden>→</span>
            </a>
            <a
              href={`tel:${PHONE_TEL}`}
              className="text-sm font-medium text-ink underline decoration-thread-gold decoration-2 underline-offset-4 hover:text-rose transition-colors"
            >
              Call <span className="font-mono">{PHONE}</span>
            </a>
          </div>
          <div className="mt-8 pt-6 border-t border-ink/10 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-charcoal">
            <span className="inline-flex items-center gap-1.5 font-medium">
              <span className="font-mono text-thread-gold font-bold">★ 4.9</span> Google Rating
            </span>
            <span aria-hidden className="h-3 w-px bg-ink/20" />
            <span>Mon–Sat · 9:00 AM</span>
            <span aria-hidden className="h-3 w-px bg-ink/20" />
            <span>Pajifond, Margao</span>
          </div>
        </div>
        {/* Right column empty to let fashion photography stand out full-bleed */}
        <div aria-hidden className="hidden md:block" />
      </div>
    </section>
  );
}

/* ---------- Skills ticker ---------- */
function SkillsTicker() {
  const items = [...SKILLS, ...SKILLS];
  return (
    <section aria-label="Skills you'll learn" className="ticker-wrap overflow-hidden bg-canvas py-6">
      <div className="mx-auto mb-3 px-5 font-mono text-[10px] uppercase tracking-widest text-charcoal sm:px-8">
        What you'll actually stitch
      </div>
      <div className="ticker-track whitespace-nowrap">
        {items.map((s, i) => (
          <span key={i} className="inline-flex items-center gap-12">
            <span className="font-display text-3xl text-ink sm:text-5xl">{s}</span>
            <span aria-hidden className="font-mono text-xl text-rose">- - -</span>
          </span>
        ))}
      </div>
    </section>
  );
}

/* ---------- Why ---------- */
function Why() {
  const pillars = [
    {
      mark: "6IN",
      title: "Beginner Friendly",
      body: "No prior sewing experience needed. We start with holding fabric right and end with garments you'll actually wear.",
    },
    {
      mark: "18IN",
      title: "Practical Training",
      body: "Machine time, not slideshows. Every class ends with something you've cut, pinned and stitched yourself.",
    },
    {
      mark: "36IN",
      title: "Expert Guidance",
      body: "Vandana ma'am works alongside you at the table — corrections happen at your machine, not on a whiteboard.",
    },
  ];
  return (
    <section id="why" className="scroll-mt-8 bg-blush/60">
      <div className="mx-auto px-5 py-20 sm:px-8">
        <Reveal direction="up" className="mb-12 max-w-2xl">
          <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-charcoal">
            Why V2Wings
          </div>
          <h2 className="mt-3 font-display text-3xl leading-tight sm:text-5xl">
            A studio that teaches like an <em className="not-italic text-rose">atelier</em>, priced
            like a neighbourhood class.
          </h2>
        </Reveal>
        <div className="grid gap-6 md:grid-cols-3">
          {pillars.map((p, i) => (
            <Reveal key={p.title} direction="up" delay={i * 150} className="h-full">
              <article
                className="h-full rounded-md border border-ink/10 bg-canvas p-7 transition-all duration-300 hover:shadow-lg hover:-translate-y-1.5"
              >
                <div className="mb-6 flex items-center justify-between">
                  <span className="font-mono text-[11px] tracking-widest text-rose">{p.mark}</span>
                  <span className="font-mono text-[10px] tracking-widest text-charcoal">
                    V2W · PILLAR
                  </span>
                </div>
                <h3 className="font-display text-2xl leading-snug">{p.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-charcoal">{p.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Programs ---------- */
function Programs() {
  const cards = [
    {
      tone: "rose" as const,
      eyebrow: "CHOTTA PACK",
      title: "Beginner Sewing Course",
      price: "₹5,000",
      note: "Starter · one-time",
      includes: [
        "Sewing machine handling",
        "Threading, tension & seams",
        "Foundation stitches",
        "Your first finished piece",
      ],
      cta: "Ask about the Chotta Pack",
      msg: "Hi, I'd like to know more about the Chotta Pack (Beginner Sewing Course).",
    },
    {
      tone: "ink" as const,
      eyebrow: "MOST POPULAR",
      title: "Monthly Dress-Making Package",
      price: "Monthly",
      note: "Beginner → Advanced",
      includes: [
        "Sewing Machine basics",
        "Necklines",
        "Born Baby Dress",
        "Salwar Kameez",
        "A-Line, Umbrella & Six-Piece",
      ],
      cta: "Ask about the Monthly Package",
      msg: "Hi, I'd like to know more about the Monthly Dress-Making Package.",
    },
    {
      tone: "gold" as const,
      eyebrow: "FLAGSHIP",
      title: "6-Month Diploma in Dress Making & Boutique Management",
      price: "6 Months",
      note: "Diploma programme",
      includes: [
        "Pattern making",
        "Garment construction",
        "Fabric & fit workshops",
        "Running your own boutique",
      ],
      cta: "Ask about the Diploma",
      msg: "Hi, I'd like to know more about the 6-Month Diploma in Dress Making & Boutique Management.",
    },
  ];

  return (
    <section id="programs" className="scroll-mt-8">
      <div className="mx-auto px-5 py-16 sm:px-8 sm:py-20">
        <Reveal direction="up" className="mb-8 flex flex-wrap items-end justify-between gap-4 sm:mb-12 sm:gap-6">
          <div className="max-w-xl">
            <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-charcoal">
              Programs & Pricing
            </div>
            <h2 className="mt-3 font-display text-3xl leading-tight sm:text-5xl">
              Three tags. Pick your fit.
            </h2>
          </div>
          <p className="hidden max-w-sm text-sm text-charcoal sm:block">
            Every enquiry goes straight to Vandana ma'am on WhatsApp — she'll walk you through
            timing, batch size and what to bring.
          </p>
          <p className="text-xs text-charcoal sm:hidden">
            Swipe →&nbsp; Every enquiry goes to Vandana ma'am on WhatsApp.
          </p>
        </Reveal>

        {/* Mobile: horizontal snap carousel; md+: grid */}
        <div className="snap-x-scroll -mx-5 flex gap-4 overflow-x-auto px-5 pb-4 sm:mx-0 sm:grid sm:grid-cols-1 sm:gap-6 sm:overflow-visible sm:px-0 md:grid-cols-3">
          {cards.map((c, i) => (
            <Reveal key={c.title} direction="up" delay={i * 150} className="w-[85%] shrink-0 sm:w-auto sm:shrink h-full">
              <ProgramCard {...c} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProgramCard({
  tone,
  eyebrow,
  title,
  price,
  note,
  includes,
  cta,
  msg,
}: {
  tone: "rose" | "ink" | "gold";
  eyebrow: string;
  title: string;
  price: string;
  note: string;
  includes: string[];
  cta: string;
  msg: string;
}) {
  const toneStyles = {
    rose: "bg-canvas border-rose/30",
    ink: "bg-ink text-canvas border-ink",
    gold: "bg-canvas border-thread-gold/60 ring-1 ring-thread-gold/30",
  }[tone];
  const priceColor = {
    rose: "text-rose",
    ink: "text-blush",
    gold: "text-thread-gold",
  }[tone];
  const btn =
    tone === "ink"
      ? "bg-canvas text-ink hover:bg-rose hover:text-canvas"
      : tone === "gold"
        ? "bg-thread-gold text-ink hover:bg-ink hover:text-canvas"
        : "bg-rose text-canvas hover:bg-ink";

  return (
    <article className={`swatch-tag flex flex-col border p-7 pt-14 h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-1.5 ${toneStyles}`}>
      <div className="mb-5">
        <div className={`font-mono text-[10px] tracking-widest ${tone === "ink" ? "text-blush" : "text-charcoal"}`}>
          {eyebrow}
        </div>
        <h3 className="mt-2 font-display text-2xl leading-tight">{title}</h3>
      </div>
      <div className="mb-6 flex items-baseline gap-3">
        <span className={`font-mono text-3xl ${priceColor}`}>{price}</span>
        <span className={`text-xs ${tone === "ink" ? "text-blush/80" : "text-charcoal"}`}>
          {note}
        </span>
      </div>
      <ul className={`mb-8 space-y-2 text-sm ${tone === "ink" ? "text-canvas/90" : "text-ink"}`}>
        {includes.map((i) => (
          <li key={i} className="flex gap-3">
            <span aria-hidden className={`mt-2 h-px w-4 shrink-0 ${tone === "ink" ? "bg-blush" : "bg-rose"}`} />
            <span>{i}</span>
          </li>
        ))}
      </ul>
      <a
        href={wa(msg)}
        target="_blank"
        rel="noreferrer"
        className={`mt-auto inline-flex items-center justify-between gap-2 rounded-full px-5 py-3 text-sm font-medium transition-colors ${btn}`}
      >
        {cta}
        <span aria-hidden>→</span>
      </a>
    </article>
  );
}

/* ---------- Trainer ---------- */
function Trainer() {
  return (
    <section id="trainer" className="scroll-mt-8">
      <div className="mx-auto grid gap-10 px-5 py-20 sm:px-8 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
        <Reveal direction="scale" className="relative">
          <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-ink">
            <img
              src={trainer.url}
              alt="Vandana ma'am, master trainer at V2Wings Coaching"
              className="h-full w-full object-cover object-top transition-transform duration-700 hover:scale-105"
              loading="lazy"
            />
          </div>
          <div className="absolute -bottom-3 left-3 rounded-full bg-thread-gold px-3 py-1 font-mono text-[10px] tracking-widest text-ink shadow-md">
            MASTER · TRAINER
          </div>
        </Reveal>
        <Reveal direction="up" delay={200} className="flex flex-col justify-center">
          <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-charcoal">
            Meet your trainer
          </div>
          <h2 className="mt-3 font-display text-4xl leading-tight sm:text-5xl">
            Vandana ma'am
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-ink">
            "The atmosphere here is warm — students say they feel at home from day one. My job is
            simply to make sure every stitch you take is one you can repeat on your own."
          </p>
          <p className="mt-4 text-sm text-charcoal">
            Paraphrased from student sentiment on Google reviews.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- Reviews ---------- */
function Reviews() {
  const quotes = [
    {
      body: "A genuinely great experience — a warm atmosphere and Vandana ma'am's teaching stood out most.",
      who: "Student · Google",
    },
    {
      body: "Learning at V2Wings felt personal. I left every class with something I had actually made myself.",
      who: "Student · Google",
    },
    {
      body: "Vandana ma'am corrects you right at the machine. You leave knowing exactly what you did.",
      who: "Student · Google",
    },
    {
      body: "Small batches, calm studio, real garments. Best decision I made this year.",
      who: "Student · Google",
    },
  ];
  const marqueeItems = [...quotes, ...quotes];
  return (
    <section id="reviews" className="scroll-mt-8 bg-ink text-canvas">
      <div className="mx-auto px-5 py-16 sm:px-8 sm:py-20">
        <div className="grid gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] md:gap-10">
          <Reveal direction="up">
            <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-blush">
              Student results
            </div>
            <div className="mt-3 flex items-baseline gap-3">
              <span className="font-mono text-5xl text-thread-gold sm:text-6xl">4.9</span>
              <span className="text-sm text-blush">/ 5 on Google</span>
            </div>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-blush/80">
              Real reviews from students across Margao and South Goa.
            </p>
            <a
              href="https://www.google.com/search?q=V2Wings+Coaching+Margao"
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-flex items-center gap-2 rounded-full border border-blush/40 px-4 py-2 text-xs text-canvas hover:border-thread-gold hover:text-thread-gold transition-all"
            >
              Read on Google →
            </a>
          </Reveal>

          {/* Desktop: stacked quotes */}
          <div className="hidden gap-6 md:grid">
            {quotes.slice(0, 2).map((q, i) => (
              <Reveal key={i} direction="left" delay={i * 200}>
                <figure className="border-l-2 border-thread-gold pl-5 transition-transform duration-300 hover:translate-x-1">
                  <blockquote className="font-display text-2xl leading-snug text-canvas sm:text-3xl">
                    "{q.body}"
                  </blockquote>
                  <figcaption className="mt-3 font-mono text-[11px] tracking-widest text-blush/70">
                    {q.who}
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Mobile: sideways marquee */}
        <div className="reviews-marquee-wrap mt-8 -mx-5 overflow-hidden md:hidden">
          <div className="reviews-marquee">
            {marqueeItems.map((q, i) => (
              <figure
                key={i}
                className="w-[78vw] shrink-0 border-l-2 border-thread-gold pl-4"
              >
                <blockquote className="font-display text-lg leading-snug text-canvas">
                  "{q.body}"
                </blockquote>
                <figcaption className="mt-3 font-mono text-[10px] tracking-widest text-blush/70">
                  {q.who}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>

        <div className="mt-14 sm:mt-16">
          <Reveal direction="up" className="mb-4 font-mono text-[11px] uppercase tracking-widest text-blush">
            Student work
          </Reveal>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {STUDENT_WORK.map((src, i) => (
              <Reveal key={i} direction="scale" delay={i * 120}>
                <div
                  className="relative aspect-[3/4] overflow-hidden rounded-sm bg-blush/20 transition-transform duration-500 hover:scale-[1.04] hover:shadow-2xl cursor-pointer"
                >
                  <img
                    src={src}
                    alt={`Student garment work ${i + 1}: neckline and bodice detail`}
                    loading="lazy"
                    width={1024}
                    height={1024}
                    className="h-full w-full object-cover"
                  />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Visit ---------- */
function Visit() {
  return (
    <section id="visit" className="scroll-mt-8">
      <div className="mx-auto grid gap-10 px-5 py-20 sm:px-8 md:grid-cols-2">
        <Reveal direction="up">
          <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-charcoal">
            Visit the studio
          </div>
          <h2 className="mt-3 font-display text-4xl leading-tight sm:text-5xl">
            Drop in, or send a message first — either works.
          </h2>

          <dl className="mt-10 space-y-6 text-sm">
            <div>
              <dt className="font-mono text-[10px] tracking-widest text-charcoal">ADDRESS</dt>
              <dd className="mt-1 text-base leading-relaxed text-ink">
                Shop No. 13, Block B, Reliance Trade Centre,
                <br />
                Near Sunny Stationery, Pajifond,
                <br />
                Margao, Goa 403601
              </dd>
            </div>
            <div>
              <dt className="font-mono text-[10px] tracking-widest text-charcoal">HOURS</dt>
              <dd className="mt-1 text-base text-ink">
                Mon – Sat · Opens <span className="font-mono">9:00 AM</span>
                <br />
                <span className="text-charcoal">Closed Sundays</span>
              </dd>
            </div>
            <div>
              <dt className="font-mono text-[10px] tracking-widest text-charcoal">CONTACT</dt>
              <dd className="mt-2 flex flex-wrap gap-3">
                <a
                  href={`tel:${PHONE_TEL}`}
                  className="inline-flex items-center gap-2 rounded-full bg-ink px-4 py-2 text-sm text-canvas hover:bg-rose shadow-2xs hover:shadow-md transition-all"
                >
                  Call <span className="font-mono">{PHONE}</span>
                </a>
                <a
                  href={wa("Hi Vandana ma'am, I'd like to visit V2Wings.")}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-rose px-4 py-2 text-sm text-canvas hover:bg-ink shadow-2xs hover:shadow-md transition-all"
                >
                  WhatsApp
                </a>
                <a
                  href={IG}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-ink/20 px-4 py-2 text-sm text-ink hover:border-rose hover:text-rose transition-colors"
                >
                  @v2wingscoaching_margao
                </a>
              </dd>
            </div>
          </dl>
        </Reveal>

        <Reveal direction="scale" delay={200} className="relative">
          <div className="mb-2 font-mono text-[10px] tracking-widest text-charcoal">
            PLATE 02 · LOCATION
          </div>
          <div className="aspect-[4/5] w-full overflow-hidden rounded-sm border border-ink/10 shadow-lg hover:shadow-2xl transition-shadow duration-500">
            <iframe
              title="V2Wings Coaching location on Google Maps"
              src={MAPS_EMBED}
              className="h-full w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- Footer ---------- */
function Footer() {
  return (
    <footer className="border-t border-ink/10 bg-canvas">
      <div className="mx-auto grid gap-10 px-5 py-14 sm:px-8 md:grid-cols-[minmax(0,1fr)_auto]">
        <div className="flex items-start gap-4">
          <img
            src={logo.url}
            alt=""
            className="h-14 w-14 shrink-0 rounded-full object-cover ring-1 ring-ink/10"
          />
          <div>
            <div className="font-display text-xl">V2Wings Coaching</div>
            <p className="mt-1 text-sm text-charcoal">
              Shop No. 13, Block B, Reliance Trade Centre, Pajifond, Margao, Goa 403601
            </p>
            <p className="mt-2 font-mono text-xs text-ink">{PHONE}</p>
            <a
              href={IG}
              target="_blank"
              rel="noreferrer"
              className="mt-1 inline-block text-xs text-rose hover:text-ink"
            >
              @v2wingscoaching_margao
            </a>
          </div>
        </div>
        <div className="flex flex-col justify-between gap-6 md:items-end md:text-right">
          <div className="font-display text-2xl italic text-ink">
            Learn <span className="text-rose">·</span> Stitch{" "}
            <span className="text-rose">·</span> Create{" "}
            <span className="text-rose">·</span> Grow
          </div>
          <div className="font-mono text-[10px] tracking-widest text-charcoal">
            © {new Date().getFullYear()} V2WINGS COACHING · MARGAO
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ---------- shared bits ---------- */
function StitchDivider({ gold = false }: { gold?: boolean }) {
  return (
    <div className="mx-auto px-5 sm:px-8">
      <div className={`stitch-divider ${gold ? "gold" : ""}`} />
    </div>
  );
}

function UploadPlaceholder({ label, dark = false }: { label: string; dark?: boolean }) {
  return (
    <div
      className={`flex h-full w-full items-center justify-center p-6 text-center ${
        dark ? "bg-ink/40" : "bg-blush"
      }`}
    >
      <div>
        <div
          className={`font-mono text-[10px] tracking-widest ${
            dark ? "text-blush" : "text-rose"
          }`}
        >
          [ IMAGE PLACEHOLDER ]
        </div>
        <div
          className={`mt-2 max-w-[24ch] font-mono text-[11px] leading-relaxed ${
            dark ? "text-canvas/80" : "text-charcoal"
          }`}
        >
          {label}
        </div>
      </div>
    </div>
  );
}
