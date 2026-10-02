import { useEffect, useState } from "react";
import { ArrowRight, Check, ChevronDown, MapPin, MessageCircle, Phone, Clock, Star, Stethoscope, Award } from "lucide-react";
import heroImg from "@/assets/hero.jpg";
import doctorImg from "@/assets/doctor.jpg";
import { Btn, SectionHead } from "./ui";
import { BookingForm, SuccessState } from "./BookingForm";
import { useLead, track, scrollToId } from "@/lib/lead";
import { clinic } from "@/lib/clinic-config";
import { cn } from "@/lib/utils";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5">
        <div className="flex items-center gap-3">
          <span className="font-serif text-xl text-primary">{clinic.name}</span>
          <span className="hidden text-sm text-muted-foreground md:inline">Orthodontic Care · {clinic.area}</span>
        </div>
        <div className="flex items-center gap-2">
          <a href={clinic.phoneHref} onClick={() => track("phone_clicked")} className="flex h-11 items-center gap-2 rounded-full px-3 text-sm font-semibold text-primary hover:bg-secondary" aria-label="Call clinic">
            <Phone className="h-4 w-4" /> <span className="hidden sm:inline">{clinic.phone}</span>
          </a>
          <Btn className="hidden md:inline-flex" onClick={() => scrollToId("book")}>Book Aligner Consultation</Btn>
        </div>
      </div>
    </header>
  );
}

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-cream">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 pb-16 pt-10 md:grid-cols-[1.1fr_1fr] md:pb-24 md:pt-16">
        <div className="animate-rise">
          <p className="eyebrow text-accent">Orthodontic Care · {clinic.city}</p>
          <h1 className="mt-5 text-5xl leading-[1.02] text-primary md:text-7xl">
            Thinking about <em className="italic">straighter</em> teeth?
          </h1>
          <p className="mt-5 font-serif text-2xl text-foreground md:text-3xl">
            Explore Braces & Clear Aligners in {clinic.city}.
          </p>
          <p className="mt-4 max-w-md text-muted-foreground">
            Understand which options may suit your teeth, lifestyle and budget with an orthodontist assessment.
          </p>
          <div className="mt-8 flex flex-col items-start gap-4">
            <Btn onClick={() => { track("hero_cta_click"); scrollToId("concern"); }}>
              Explore My Options <ArrowRight className="h-4 w-4" />
            </Btn>
            <button onClick={() => scrollToId("book")} className="text-sm text-muted-foreground underline-offset-4 hover:underline">
              Already ready to speak with us? <span className="font-semibold text-primary">Book a consultation</span>
            </button>
          </div>
        </div>
        <div className="relative">
          <img src={heroImg} alt="Smiling patient at a modern orthodontic clinic" width={1200} height={1440} className="aspect-[5/6] w-full rounded-[2rem] object-cover shadow-soft" />
          <div className="absolute -bottom-6 left-4 right-4 rounded-2xl bg-card/95 p-4 shadow-soft backdrop-blur sm:left-auto sm:-left-8 sm:right-auto sm:w-64">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">What would you like to improve?</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {["Crooked teeth", "Gaps", "Crowding", "Bite concern"].map((t) => (
                <button key={t} onClick={() => scrollToId("concern")} className="rounded-full bg-aqua px-3 py-1.5 text-xs font-semibold text-primary hover:bg-aqua-strong">
                  {t}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function TrustStrip() {
  const items = [
    { icon: Stethoscope, t: "Orthodontist-led care" },
    { icon: Star, t: clinic.trust.rating },
    { icon: Award, t: clinic.trust.experience },
    { icon: MapPin, t: clinic.area },
  ];
  return (
    <div className="bg-deep text-deep-foreground">
      <ul className="mx-auto grid max-w-6xl grid-cols-2 gap-4 px-5 py-6 text-sm md:grid-cols-4">
        {items.map(({ icon: I, t }) => (
          <li key={t} className="flex items-center gap-2"><I className="h-4 w-4 text-aqua-strong" />{t}</li>
        ))}
      </ul>
    </div>
  );
}

export function Offer() {
  const { submitted } = useLead();
  useEffect(() => {
    const el = document.getElementById("book");
    if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { track("consultation_form_viewed"); io.disconnect(); } });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <section id="book" className="bg-background px-5 py-20 md:py-28">
      <SectionHead eyebrow="Clear offer" title="Know exactly what you're booking" />
      <div className="mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-2">
        <div className="rounded-3xl bg-aqua p-7 md:p-9">
          <h3 className="text-2xl">Orthodontic Consultation</h3>
          <p className="mt-2 text-lg">Consultation Fee: <strong className="font-serif text-2xl text-primary">{clinic.consultationFee}</strong></p>
          <p className="mt-6 text-sm font-semibold">What's included</p>
          <ul className="mt-3 space-y-2.5 text-sm">
            {["Orthodontic assessment", "Discussion of your main concern", "Braces and aligner options explained", "Treatment suitability discussion", "Estimated treatment duration explained where appropriate", "Treatment cost factors explained", "Scan information explained"].map((i) => (
              <li key={i} className="flex gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />{i}</li>
            ))}
          </ul>
          {clinic.scanOfferActive && (
            <blockquote className="mt-6 rounded-2xl bg-card p-4 text-sm font-semibold text-primary">
              Complimentary 3D smile scan when you start aligner treatment.
            </blockquote>
          )}
          <p className="mt-3 text-xs text-muted-foreground">3D scanning charges outside this offer: {clinic.scanFee}</p>
        </div>
        <div className="rounded-3xl border border-border bg-card p-7 shadow-soft md:p-9">
          {submitted ? <SuccessState /> : (<><h3 className="mb-5 text-2xl">Request your consultation</h3><BookingForm cta="Request My Consultation" /></>)}
        </div>
      </div>
    </section>
  );
}

const compareRows = [
  ["Visibility", "Visible brackets and wires depending on type.", "Designed to be less noticeable when worn."],
  ["Removability", "Fixed during treatment.", "Removable as instructed."],
  ["Daily commitment", "Requires oral-hygiene and food-care adjustments.", "Requires consistent daily wear and aligner care."],
  ["Eating routine", "Some food restrictions/care may be advised.", "Typically removed for eating, according to professional instructions."],
];

export function Compare() {
  const [tab, setTab] = useState<0 | 1>(1);
  const { checkDone } = useLead();
  return (
    <section id="compare" className="bg-cream px-5 py-20 md:py-28">
      <SectionHead eyebrow="Compare" title="Braces or clear aligners?" sub="There isn't one option that suits everyone. Your orthodontist can assess your teeth and explain the appropriate options." />
      <div className="mx-auto mt-10 max-w-3xl">
        <div role="tablist" className="mx-auto flex w-full max-w-sm rounded-full bg-card p-1 shadow-soft">
          {["Braces", "Clear Aligners"].map((t, i) => (
            <button key={t} role="tab" aria-selected={tab === i} onClick={() => setTab(i as 0 | 1)} className={cn("eyebrow flex-1 rounded-full py-3 transition", tab === i ? "bg-primary text-primary-foreground" : "text-muted-foreground")}>
              {t}
            </button>
          ))}
        </div>
        <div key={tab} className="animate-rise mt-8 grid gap-3">
          {compareRows.map(([k, b, a]) => (
            <div key={k} className="rounded-2xl bg-card p-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{k}</p>
              <p className="mt-1.5 font-serif text-lg text-primary">{tab === 0 ? b : a}</p>
            </div>
          ))}
          <div className="rounded-2xl border-2 border-dashed border-aqua-strong bg-aqua p-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Suitability — both</p>
            <p className="mt-1.5 font-serif text-lg text-primary">Depends on your teeth, bite, treatment needs and orthodontic assessment.</p>
          </div>
        </div>
        <div className="mt-8 text-center">
          <Btn onClick={() => scrollToId(checkDone ? "book" : "smile-check")}>Find Out What Suits Me</Btn>
        </div>
      </div>
    </section>
  );
}

export function Doctor() {
  const d = clinic.doctor;
  return (
    <section className="bg-deep px-5 py-20 text-deep-foreground md:py-28">
      <div className="mx-auto grid max-w-5xl items-center gap-10 md:grid-cols-2">
        <img src={doctorImg} alt={`${d.name}, orthodontist (placeholder photo)`} loading="lazy" width={1024} height={1280} className="aspect-[4/5] w-full rounded-[2rem] object-cover" />
        <div>
          <p className="eyebrow text-aqua-strong">Your orthodontist</p>
          <h2 className="mt-4 text-4xl md:text-5xl">Meet {d.name}</h2>
          <dl className="mt-8 divide-y divide-deep-line border-y border-deep-line">
            {[["Qualification", d.qualification], ["Specialty", d.specialty], ["Experience", d.experience], ["Association", d.association], ["Registration", d.registration]].map(([k, v]) => (
              <div key={k} className="flex justify-between gap-4 py-3 text-sm">
                <dt className="text-deep-muted">{k}</dt><dd className="text-right">{v}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-6 text-deep-muted">Your orthodontist will assess your teeth and bite, discuss your goals and explain which treatment options may be appropriate for you.</p>
          <Btn className="mt-8" onClick={() => scrollToId("book")}>Book With Our Orthodontist</Btn>
        </div>
      </div>
    </section>
  );
}

const steps = [
  ["Request", "Submit your consultation request."],
  ["Confirmation", "The clinic contacts you to confirm availability."],
  ["Orthodontic Assessment", "The orthodontist discusses your concern and examines your teeth/bite."],
  ["Scan / Records", "Where clinically appropriate, scans or other records may be recommended."],
  ["Options Explained", "Suitable treatment options, estimated duration and expected costs are discussed."],
  ["You Decide", "You can consider the information before deciding whether to proceed."],
];

export function NextSteps() {
  const [open, setOpen] = useState(0);
  return (
    <section className="bg-aqua px-5 py-20 md:py-28">
      <SectionHead eyebrow="The process" title="What happens when you book?" />
      <ol className="mx-auto mt-12 max-w-2xl">
        {steps.map(([t, d], i) => (
          <li key={t} className="relative pl-14">
            {i < steps.length - 1 && <span className={cn("absolute left-[1.15rem] top-10 h-full w-0.5", i < open ? "bg-accent" : "bg-aqua-strong")} aria-hidden />}
            <button onClick={() => setOpen(i)} aria-expanded={open === i} className="w-full pb-6 text-left">
              <span className={cn("absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold transition", i <= open ? "bg-accent text-accent-foreground" : "bg-card text-primary")}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="block pt-2 font-serif text-xl text-primary">{t}</span>
              <span className={cn("grid transition-all", open === i ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0")}>
                <span className="overflow-hidden text-muted-foreground"><span className="block pt-2">{d}</span></span>
              </span>
            </button>
          </li>
        ))}
      </ol>
      <div className="mx-auto mt-6 max-w-2xl rounded-2xl bg-card p-6 text-center">
        <p className="font-serif text-xl text-primary">Requesting a consultation does not commit you to starting treatment.</p>
        <p className="mt-3 text-sm text-muted-foreground">3D scanning fee: {clinic.scanFee}{clinic.scanOfferActive && " · Complimentary when you start qualifying aligner treatment."}</p>
        <Btn className="mt-6" onClick={() => scrollToId("final")}>Request My Appointment</Btn>
      </div>
    </section>
  );
}

export function Proof() {
  return (
    <section className="bg-background px-5 py-20 md:py-28">
      <SectionHead eyebrow="Patient stories" title="Real orthodontic experiences" sub="Genuine, consented patient reviews and stories from the clinic will appear here." />
      <div className="mx-auto mt-12 grid max-w-5xl gap-4 md:grid-cols-3">
        {[1, 2, 3].map((n) => (
          <div key={n} className="flex min-h-48 flex-col justify-between rounded-3xl border-2 border-dashed border-border p-6 text-muted-foreground">
            <p className="font-serif text-lg italic">“[Genuine patient review #{n} — supplied by clinic]”</p>
            <p className="mt-4 text-sm">[Patient first name, with consent] · [Treatment type]</p>
          </div>
        ))}
      </div>
    </section>
  );
}

const journey = [
  ["Concern", "You notice something about your smile you'd like to understand better."],
  ["Smile Check", "A few quick questions give the clinic context before you speak."],
  ["Orthodontic Assessment", "The orthodontist examines your teeth and bite in person."],
  ["Treatment Options", "Appropriate options, timeframes and costs are explained."],
  ["Treatment Journey", "If you choose to proceed, your treatment is planned and started."],
  ["Follow-up", "Regular reviews keep your progress on track."],
];

export function Journey() {
  const [i, setI] = useState(0);
  return (
    <section className="bg-cream px-5 py-20 md:py-24">
      <SectionHead eyebrow="Overview" title="Explore the orthodontic journey" />
      <div className="mx-auto mt-10 max-w-5xl">
        <div className="flex gap-2 overflow-x-auto pb-2" role="tablist">
          {journey.map(([t], n) => (
            <button key={t} role="tab" aria-selected={i === n} onClick={() => setI(n)} className={cn("shrink-0 rounded-full border px-4 py-2.5 text-sm font-semibold transition", i === n ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card text-muted-foreground")}>
              {n + 1}. {t}
            </button>
          ))}
        </div>
        <p key={i} className="animate-rise mt-6 rounded-2xl bg-card p-6 font-serif text-xl text-primary">{journey[i][1]}</p>
      </div>
    </section>
  );
}

const faqs = [
  ["What does the consultation include?", `An orthodontic assessment, discussion of your main concern, an explanation of braces and aligner options, and an overview of duration and cost factors. Consultation fee: ${clinic.consultationFee}.`],
  ["How is treatment cost decided?", "Cost can vary depending on treatment type, complexity, duration and your individual treatment plan. The clinic will explain applicable costs after your assessment."],
  ["How long might treatment take?", "Treatment duration varies according to your individual orthodontic needs and the chosen treatment plan. Your orthodontist will discuss an estimate after assessment."],
  ["When is the 3D scan complimentary?", clinic.scanOfferActive ? `The 3D smile scan is complimentary when you start aligner treatment under the stated clinic offer. Otherwise applicable scan charges (${clinic.scanFee}) should be confirmed with the clinic.` : `3D scan charges: ${clinic.scanFee}. Please confirm with the clinic.`],
];

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="bg-background px-5 py-20 md:py-28">
      <SectionHead eyebrow="FAQ" title="Questions before your consultation?" />
      <div className="mx-auto mt-10 max-w-2xl divide-y divide-border border-y border-border">
        {faqs.map(([q, a], i) => (
          <div key={q}>
            <button onClick={() => setOpen(open === i ? null : i)} aria-expanded={open === i} className="flex w-full items-center justify-between gap-4 py-5 text-left font-serif text-xl text-primary">
              {q}<ChevronDown className={cn("h-5 w-5 shrink-0 transition", open === i && "rotate-180")} />
            </button>
            <div className={cn("grid transition-all", open === i ? "grid-rows-[1fr] pb-5" : "grid-rows-[0fr]")}>
              <p className="overflow-hidden text-muted-foreground">{a}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function Location() {
  return (
    <section className="bg-aqua px-5 py-20 md:py-24">
      <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-2">
        <div>
          <p className="eyebrow text-accent">Visit us</p>
          <h2 className="mt-4 text-4xl">Orthodontic care near you</h2>
          <p className="mt-6 font-serif text-2xl text-primary">{clinic.name}</p>
          <p className="mt-2 text-muted-foreground">{clinic.address}<br />{clinic.area}</p>
          <p className="mt-3 flex items-center gap-2 text-sm"><Clock className="h-4 w-4 text-accent" />Opening Hours: {clinic.hours}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href={clinic.directionsHref} target="_blank" rel="noreferrer" onClick={() => track("directions_clicked")} className="inline-flex min-h-12 items-center gap-2 rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground"><MapPin className="h-4 w-4" />Get Directions</a>
            <a href={clinic.phoneHref} onClick={() => track("phone_clicked")} className="inline-flex min-h-12 items-center gap-2 rounded-full border border-primary/25 px-6 text-sm font-semibold text-primary"><Phone className="h-4 w-4" />Call Clinic</a>
          </div>
        </div>
        <div className="flex min-h-64 items-center justify-center rounded-3xl border-2 border-dashed border-aqua-strong bg-card text-muted-foreground">
          <span className="flex items-center gap-2"><MapPin className="h-5 w-5" />[Map embed — add clinic location]</span>
        </div>
      </div>
    </section>
  );
}

export function FinalBooking() {
  const { submitted } = useLead();
  return (
    <section id="final" className="bg-deep px-5 py-20 text-deep-foreground md:py-28">
      <div className="mx-auto grid max-w-5xl items-start gap-10 md:grid-cols-2">
        <div>
          <h2 className="text-4xl leading-tight md:text-5xl">Ready to explore your smile options?</h2>
          <p className="mt-5 text-deep-muted">Request an orthodontic consultation and discuss braces, clear aligners and the options that may suit your individual needs.</p>
          <p className="mt-8 font-serif text-2xl">Orthodontic Consultation — {clinic.consultationFee}</p>
          <ul className="mt-4 space-y-2 text-sm">
            {["Orthodontic assessment", "Treatment-option discussion", "Estimated duration/cost discussion where appropriate", "3D scan conditions clearly explained"].map((t) => (
              <li key={t} className="flex gap-2"><Check className="h-4 w-4 text-aqua-strong" />{t}</li>
            ))}
          </ul>
        </div>
        <div className="rounded-3xl bg-card p-7 shadow-soft md:p-9">
          {submitted ? <SuccessState /> : <BookingForm full cta="Book My Aligner Consultation" />}
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="bg-deep px-5 pb-28 pt-8 text-xs text-deep-muted md:pb-8">
      <div className="mx-auto max-w-5xl border-t border-deep-line pt-6">
        © {clinic.name}. Information on this page is general and not a diagnosis. Suitability for any treatment is determined after clinical assessment.
      </div>
    </footer>
  );
}

export function MobileBar() {
  const [hidden, setHidden] = useState(false);
  useEffect(() => {
    const on = (e: FocusEvent) => setHidden((e.target as HTMLElement)?.matches?.("input, textarea, select") ?? false);
    const off = () => setHidden(false);
    document.addEventListener("focusin", on);
    document.addEventListener("focusout", off);
    return () => { document.removeEventListener("focusin", on); document.removeEventListener("focusout", off); };
  }, []);
  return (
    <div className={cn("fixed inset-x-0 bottom-0 z-40 flex gap-2 border-t border-border bg-background/95 p-3 backdrop-blur transition-transform md:hidden", hidden && "translate-y-full")}>
      <Btn className="flex-1" onClick={() => scrollToId("book")}>Book Consultation</Btn>
      <a href={clinic.whatsappHref} target="_blank" rel="noreferrer" onClick={() => track("whatsapp_clicked")} aria-label="WhatsApp us" className="flex h-12 w-12 items-center justify-center rounded-full border border-primary/25 text-primary">
        <MessageCircle className="h-5 w-5" />
      </a>
    </div>
  );
}
