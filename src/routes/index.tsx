import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import logo from "@/assets/v2wings-logo.jpg.asset.json";

export const Route = createFileRoute("/")({
  component: Index,
});

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
  { id: "skills", label: "6IN", full: "Skills" },
  { id: "why", label: "12IN", full: "Why us" },
  { id: "programs", label: "18IN", full: "Programs" },
  { id: "trainer", label: "24IN", full: "Trainer" },
  { id: "reviews", label: "30IN", full: "Reviews" },
  { id: "visit", label: "36IN", full: "Visit" },
];

function Index() {
  return (
    <div className="relative min-h-screen bg-canvas text-ink">
      <TapeRail />
      <TopBar />
      <main className="lg:pl-24">
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
    <>
      {/* Mobile: slim top progress bar */}
      <div className="fixed top-0 left-0 right-0 z-40 h-[3px] bg-blush lg:hidden">
        <div
          className="h-full bg-rose transition-[width] duration-150"
          style={{ width: `${progress * 100}%` }}
        />
      </div>

      {/* Desktop: vertical tape rail */}
      <aside
        aria-label="Section navigation"
        className="fixed left-0 top-0 z-40 hidden h-screen w-24 flex-col items-stretch border-r border-ink/10 bg-canvas/80 backdrop-blur-sm lg:flex"
      >
        <div className="flex items-center justify-center border-b border-ink/10 py-4">
          <span className="font-mono text-[10px] tracking-widest text-charcoal">V2W · IN</span>
        </div>
        <div className="relative flex-1 overflow-hidden">
          {/* inch tick marks background */}
          <div className="absolute inset-y-0 left-6 flex w-14 flex-col justify-between py-6">
            {Array.from({ length: 40 }).map((_, i) => (
              <div key={i} className={`tape-mark ${i % 4 === 0 ? "long" : "short"}`} />
            ))}
          </div>
          {/* fill */}
          <div
            aria-hidden
            className="absolute left-0 top-0 w-full bg-rose/8"
            style={{ height: `${progress * 100}%` }}
          />
          {/* section anchors */}
          <nav className="relative flex h-full flex-col justify-between py-4">
            {SECTIONS.map((s) => {
              const isActive = active === s.id;
              return (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className="group flex items-center gap-2 pl-3 pr-2"
                >
                  <span
                    className={`h-px w-6 transition-all ${
                      isActive ? "bg-rose w-10" : "bg-ink/40 group-hover:bg-ink"
                    }`}
                  />
                  <span
                    className={`font-mono text-[10px] tracking-widest transition-colors ${
                      isActive ? "text-rose" : "text-charcoal group-hover:text-ink"
                    }`}
                  >
                    {s.label}
                  </span>
                </a>
              );
            })}
          </nav>
        </div>
      </aside>
    </>
  );
}

/* ---------- Top bar ---------- */
function TopBar() {
  return (
    <header className="relative z-30 border-b border-ink/10 lg:pl-24">
      <div className="mx-auto grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 py-4 sm:px-8">
        <a href="#hero" className="flex min-w-0 items-center gap-3">
          <img
            src={logo.url}
            alt="V2Wings Coaching logo"
            className="h-10 w-10 shrink-0 rounded-full object-cover ring-1 ring-ink/10"
          />
          <div className="min-w-0 leading-tight">
            <div className="truncate font-display text-lg text-ink">V2Wings Coaching</div>
            <div className="font-mono text-[10px] tracking-widest text-charcoal">
              MARGAO · GOA
            </div>
          </div>
        </a>
        <a
          href={wa("Hi Vandana ma'am, I'd like to know more about your dress making classes.")}
          target="_blank"
          rel="noreferrer"
          className="inline-flex shrink-0 items-center gap-2 rounded-full bg-ink px-4 py-2 text-sm font-medium text-canvas transition-colors hover:bg-rose"
        >
          WhatsApp
          <span aria-hidden className="font-mono text-[11px]">→</span>
        </a>
      </div>
    </header>
  );
}

/* ---------- Hero ---------- */
function Hero() {
  return (
    <section id="hero" className="scroll-mt-8">
      <div className="mx-auto grid gap-12 px-5 py-14 sm:px-8 md:grid-cols-2 md:gap-10 md:py-24 lg:py-28">
        <div className="flex flex-col justify-center">
          <div className="mb-6 font-mono text-[11px] uppercase tracking-[0.22em] text-charcoal">
            Margao's Fashion & Dress&nbsp;Making Institute
          </div>
          <h1 className="font-display text-[2.6rem] leading-[1.02] tracking-tight text-ink sm:text-6xl">
            Learn to stitch.
            <br />
            Practice to create.
            <br />
            <span className="italic text-rose">Grow into your own boutique.</span>
          </h1>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-charcoal">
            Small-batch classes in Pajifond, taught hands-on by Vandana ma'am — from your first
            straight seam to running your own label.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href={wa("Hi Vandana ma'am, I'd like to join a dress making class at V2Wings.")}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-rose px-6 py-3 text-sm font-medium text-canvas transition-transform hover:bg-ink"
            >
              Message us on WhatsApp
              <span aria-hidden>→</span>
            </a>
            <a
              href={`tel:${PHONE_TEL}`}
              className="text-sm text-ink underline decoration-thread-gold decoration-2 underline-offset-4 hover:text-rose"
            >
              Call <span className="font-mono">{PHONE}</span>
            </a>
          </div>
          <div className="mt-10 flex flex-wrap items-center gap-5 text-xs text-charcoal">
            <span className="inline-flex items-center gap-2">
              <span className="font-mono text-thread-gold">★ 4.9</span> on Google
            </span>
            <span aria-hidden className="h-3 w-px bg-ink/20" />
            <span>Opens 9:00 Mon–Sat</span>
            <span aria-hidden className="h-3 w-px bg-ink/20" />
            <span>Pajifond, Margao</span>
          </div>
        </div>

        {/* Editorial image slot */}
        <div className="relative">
          <div className="absolute -left-4 -top-4 hidden font-mono text-[10px] tracking-widest text-charcoal md:block">
            PLATE 01 · DRESSFORM
          </div>
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-sm bg-blush">
            <UploadPlaceholder label="UPLOAD: hero photo — dress on mannequin with measuring tape draped over" />
            <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-ink/10" />
          </div>
          <div className="absolute -bottom-4 right-2 rounded-full bg-ink px-3 py-1 font-mono text-[10px] tracking-widest text-canvas">
            HAND-STITCHED · SINCE&nbsp;DAY&nbsp;ONE
          </div>
        </div>
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
        <div className="mb-12 max-w-2xl">
          <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-charcoal">
            Why V2Wings
          </div>
          <h2 className="mt-3 font-display text-3xl leading-tight sm:text-5xl">
            A studio that teaches like an <em className="not-italic text-rose">atelier</em>, priced
            like a neighbourhood class.
          </h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {pillars.map((p) => (
            <article
              key={p.title}
              className="rounded-md border border-ink/10 bg-canvas p-7"
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
      <div className="mx-auto px-5 py-20 sm:px-8">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-xl">
            <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-charcoal">
              Programs & Pricing
            </div>
            <h2 className="mt-3 font-display text-3xl leading-tight sm:text-5xl">
              Three tags. Pick the one your hands are ready for.
            </h2>
          </div>
          <p className="max-w-sm text-sm text-charcoal">
            Every enquiry goes straight to Vandana ma'am on WhatsApp — she'll walk you through
            timing, batch size and what to bring.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {cards.map((c) => (
            <ProgramCard key={c.title} {...c} />
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
    <article className={`swatch-tag flex flex-col border p-7 pt-14 ${toneStyles}`}>
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
        <div className="relative">
          <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-blush">
            <UploadPlaceholder label="UPLOAD: portrait of Vandana ma'am at the sewing table" />
          </div>
          <div className="absolute -bottom-3 left-3 rounded-full bg-thread-gold px-3 py-1 font-mono text-[10px] tracking-widest text-ink">
            MASTER · TRAINER
          </div>
        </div>
        <div className="flex flex-col justify-center">
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
        </div>
      </div>
    </section>
  );
}

/* ---------- Reviews ---------- */
function Reviews() {
  const quotes = [
    {
      body: "A genuinely great experience — a warm atmosphere and Vandana ma'am's teaching stood out most.",
      who: "Student review · Google",
    },
    {
      body: "Learning at V2Wings felt personal. I left every class with something I had actually made myself.",
      who: "Student review · Google",
    },
  ];
  return (
    <section id="reviews" className="scroll-mt-8 bg-ink text-canvas">
      <div className="mx-auto px-5 py-20 sm:px-8">
        <div className="grid gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)]">
          <div>
            <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-blush">
              Student results
            </div>
            <div className="mt-4 flex items-baseline gap-3">
              <span className="font-mono text-6xl text-thread-gold">4.9</span>
              <span className="text-sm text-blush">/ 5 on Google</span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-blush/80">
              Based on real reviews from students across Margao and South Goa.
            </p>
            <a
              href="https://www.google.com/search?q=V2Wings+Coaching+Margao"
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-blush/40 px-4 py-2 text-xs text-canvas hover:border-thread-gold hover:text-thread-gold"
            >
              Read reviews on Google →
            </a>
          </div>
          <div className="grid gap-6">
            {quotes.map((q, i) => (
              <figure key={i} className="border-l-2 border-thread-gold pl-5">
                <blockquote className="font-display text-2xl leading-snug text-canvas sm:text-3xl">
                  "{q.body}"
                </blockquote>
                <figcaption className="mt-3 font-mono text-[11px] tracking-widest text-blush/70">
                  {q.who}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>

        <div className="mt-16">
          <div className="mb-4 font-mono text-[11px] uppercase tracking-widest text-blush">
            Student work
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="relative aspect-[3/4] overflow-hidden rounded-sm bg-blush/20">
                <UploadPlaceholder
                  dark
                  label={`UPLOAD: student gallery photo ${n}`}
                />
              </div>
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
        <div>
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
                  className="inline-flex items-center gap-2 rounded-full bg-ink px-4 py-2 text-sm text-canvas hover:bg-rose"
                >
                  Call <span className="font-mono">{PHONE}</span>
                </a>
                <a
                  href={wa("Hi Vandana ma'am, I'd like to visit V2Wings.")}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-rose px-4 py-2 text-sm text-canvas hover:bg-ink"
                >
                  WhatsApp
                </a>
                <a
                  href={IG}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-ink/20 px-4 py-2 text-sm text-ink hover:border-rose hover:text-rose"
                >
                  @v2wingscoaching_margao
                </a>
              </dd>
            </div>
          </dl>
        </div>

        <div className="relative">
          <div className="mb-2 font-mono text-[10px] tracking-widest text-charcoal">
            PLATE 02 · LOCATION
          </div>
          <div className="aspect-[4/5] w-full overflow-hidden rounded-sm border border-ink/10">
            <iframe
              title="V2Wings Coaching location on Google Maps"
              src={MAPS_EMBED}
              className="h-full w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
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
