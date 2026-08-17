import { type FormEvent, type ReactNode, useEffect, useRef, useState } from 'react';
import { ArrowDownRight, ArrowUpRight, BedDouble, Check, ChevronDown, ChevronRight, CircleCheck, Clock3, Home as HomeIcon, Mail, MapPin, Menu, MessageCircle, Phone, Search, Send, ShieldCheck, Sparkles, X } from 'lucide-react';
import { ErrorBoundary } from '@/components/error-boundary';
import { Route, Switch, useLocation, Router as WouterRouter } from 'wouter';

type Listing = {
  id: string;
  title: string;
  area: string;
  type: string;
  price: string;
  detail: string;
  image: string;
  tone: string;
};

const listings: Listing[] = [
  {
    id: 'kilimani-courtyard',
    title: 'The Courtyard House',
    area: 'Kilimani, Nairobi',
    type: '2 bedroom apartment',
    price: 'KES 95,000 / month',
    detail: 'A light-filled corner apartment with a leafy communal courtyard and room to breathe.',
    image: '/images/nairobi-courtyard.jpg',
    tone: 'terracotta',
  },
  {
    id: 'diani-tide-house',
    title: 'Tide House',
    area: 'Diani, South Coast',
    type: '3 bedroom coastal villa',
    price: 'KES 28,000 / night',
    detail: 'Three minutes from the shore, with a shaded veranda made for long, slow lunches.',
    image: '/images/coast-villa.jpg',
    tone: 'sea',
  },
  {
    id: 'lavington-sunroom',
    title: 'The Sunroom',
    area: 'Lavington, Nairobi',
    type: '1 bedroom garden flat',
    price: 'KES 68,000 / month',
    detail: 'A private garden flat with generous windows, quiet corners and an easy commute.',
    image: '/images/interior-lounge.jpg',
    tone: 'indigo',
  },
];

const ownerServices = [
  ['01', 'A steady pair of hands', 'Rent collection, reconciliations and the small admin that keeps ownership calm.'],
  ['02', 'Care that shows', 'Inspections, preventative maintenance and trusted local artisans who know the difference.'],
  ['03', 'A sharper return', 'Thoughtful pricing, honest updates and homes presented to attract the right tenant.'],
];

const tenantServices = [
  ['01', 'A better search', 'Well-described homes, real availability and viewings arranged around your day.'],
  ['02', 'A human welcome', 'Clear agreements, useful local context and one responsive person to ask.'],
  ['03', 'A softer landing', 'Move-in guidance and a reliable line for the everyday details of renting.'],
];

function Reveal({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        element.classList.add('in-view');
        observer.unobserve(element);
      }
    }, { threshold: 0.12 });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  return <div ref={ref} className={`reveal ${className}`} style={{ transitionDelay: `${delay}ms` }}>{children}</div>;
}

function BrandMark({ dark = false }: { dark?: boolean }) {
  return (
    <a href="#top" className={`group inline-flex items-center gap-3 ${dark ? 'text-[#f9f5eb]' : 'text-[#25283d]'}`} data-testid="link-brand">
      <span className="relative grid size-10 place-items-center rounded-full border border-current/30">
        <span className="absolute h-5 w-px -translate-x-1 bg-current/80" />
        <span className="absolute h-5 w-px translate-x-1 bg-[#efbd5c]" />
        <span className="absolute h-px w-5 -translate-y-1 bg-current/80" />
        <span className="absolute h-px w-5 translate-y-1 bg-[#efbd5c]" />
      </span>
      <span className="leading-none">
        <span className="block font-display text-[1.18rem] italic tracking-[-.025em]">Geostep</span>
        <span className={`block pt-1 font-mono text-[.54rem] uppercase tracking-[.17em] ${dark ? 'text-[#efbd5c]' : 'text-[#a66743]'}`}>Property</span>
        <span className={`block pt-1 font-mono text-[.42rem] uppercase tracking-[.1em] ${dark ? 'text-[#aaa8ad]' : 'text-[#696775]'}`}>by Geostep Engineers Ltd</span>
      </span>
    </a>
  );
}

function Nav({ open, setOpen }: { open: boolean; setOpen: (value: boolean) => void }) {
  const links = [['Homes', '#homes'], ['For owners', '#owners'], ['Our story', '#story'], ['Contact', '#contact']];
  return (
    <header className="absolute inset-x-0 top-0 z-40 border-b border-white/10 text-[#f9f5eb]">
      <div className="mx-auto flex max-w-[1240px] items-center justify-between px-5 py-5 lg:px-8">
        <BrandMark dark />
        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary navigation">
          {links.map(([label, href]) => (
            <a key={href} href={href} className="text-[.73rem] font-semibold text-[#d8d4cc] transition-colors hover:text-[#efbd5c]" data-testid={`link-nav-${label.toLowerCase().replace(' ', '-')}`}>{label}</a>
          ))}
        </nav>
        <a href="#contact" className="hidden items-center gap-2 rounded-full bg-[#efbd5c] px-5 py-3 text-[.7rem] font-extrabold uppercase tracking-[.13em] text-[#25283d] transition-transform hover:-translate-y-0.5 md:inline-flex" data-testid="link-header-enquire">
          Start a conversation <ArrowUpRight size={15} strokeWidth={2.5} />
        </a>
        <button type="button" className="grid size-11 place-items-center rounded-full border border-white/20 md:hidden" onClick={() => setOpen(!open)} aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} data-testid="button-mobile-menu">
          {open ? <X size={19} /> : <Menu size={19} />}
        </button>
      </div>
      {open && (
        <nav className="border-t border-white/10 bg-[#25283d] px-5 py-5 md:hidden" aria-label="Mobile navigation">
          {links.map(([label, href]) => (
            <a key={href} href={href} onClick={() => setOpen(false)} className="flex items-center justify-between border-b border-white/10 py-4 text-sm font-semibold text-[#f9f5eb]" data-testid={`link-mobile-${label.toLowerCase().replace(' ', '-')}`}>
              {label}<ChevronRight size={16} className="text-[#efbd5c]" />
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}

function ListingCard({ listing, onSelect }: { listing: Listing; onSelect: (listing: Listing) => void }) {
  return (
    <article className="group overflow-hidden rounded-[1.25rem] border border-[#ddd5c8] bg-[#fbf8f0] transition-all duration-500 hover:-translate-y-1 hover:border-[#a66743]/40 hover:shadow-[0_18px_45px_rgba(37,40,61,.12)]" data-testid={`card-property-${listing.id}`}>
      <button type="button" className="block w-full text-left" onClick={() => onSelect(listing)} data-testid={`button-view-${listing.id}`}>
        <div className="image-sheen relative h-60 overflow-hidden bg-[#d8c9b9]">
          <img src={listing.image} alt={`${listing.title}, ${listing.area}`} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
          <span className="absolute left-4 top-4 rounded-full bg-[#f9f5eb]/90 px-3 py-1.5 font-mono text-[.58rem] uppercase tracking-[.13em] text-[#25283d]">Example listing</span>
          <span className="absolute bottom-4 right-4 grid size-10 place-items-center rounded-full bg-[#25283d] text-[#efbd5c] transition-transform group-hover:rotate-45"><ArrowUpRight size={17} /></span>
        </div>
        <div className="p-5 sm:p-6">
          <div className="mb-4 flex items-start justify-between gap-3">
            <div>
              <h3 className="font-display text-2xl leading-tight text-[#25283d]">{listing.title}</h3>
              <p className="mt-1 flex items-center gap-1.5 text-xs text-[#696775]"><MapPin size={13} className="text-[#a66743]" />{listing.area}</p>
            </div>
            <span className="font-mono text-[.62rem] uppercase tracking-wider text-[#a66743]">{listing.tone}</span>
          </div>
          <p className="min-h-10 text-sm leading-6 text-[#696775]">{listing.detail}</p>
          <div className="mt-5 flex items-center justify-between border-t border-[#e3dbcf] pt-4">
            <span className="text-sm font-extrabold text-[#25283d]">{listing.price}</span>
            <span className="flex items-center gap-1 text-xs font-bold text-[#a66743]">View details <ChevronRight size={14} /></span>
          </div>
        </div>
      </button>
    </article>
  );
}

function ServiceList({ items, accent }: { items: string[][]; accent: 'gold' | 'clay' }) {
  return (
    <div className="divide-y divide-current/10">
      {items.map(([number, title, copy]) => (
        <div key={number} className="grid grid-cols-[2rem_1fr] gap-4 py-6 first:pt-0 last:pb-0 sm:grid-cols-[3rem_1fr] sm:gap-6">
          <span className={`font-mono text-[.66rem] ${accent === 'gold' ? 'text-[#efbd5c]' : 'text-[#d78b64]'}`}>{number}</span>
          <div>
            <h3 className="font-display text-xl">{title}</h3>
            <p className="mt-2 max-w-md text-sm leading-6 text-current/65">{copy}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeListing, setActiveListing] = useState<Listing | null>(null);
  const [formState, setFormState] = useState({ name: '', email: '', phone: '', interest: 'I own a property', message: '' });
  const [formError, setFormError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const updateForm = (field: keyof typeof formState, value: string) => setFormState((current) => ({ ...current, [field]: value }));
  const submitForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!formState.name.trim() || !formState.email.trim() || !formState.message.trim()) {
      setFormError('Please add your name, email and a short note so we know how to help.');
      setSubmitted(false);
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(formState.email)) {
      setFormError('Please check the email address and try again.');
      setSubmitted(false);
      return;
    }
    setFormError('');
    setSubmitted(true);
  };

  return (
    <div id="top" className="noise min-h-[100dvh] bg-[#f4f0e7] text-[#25283d]">
      <section className="relative overflow-hidden bg-[#25283d] text-[#f9f5eb]">
        <Nav open={menuOpen} setOpen={setMenuOpen} />
        <div className="mx-auto grid min-h-[760px] max-w-[1240px] items-end gap-12 px-5 pb-16 pt-36 lg:grid-cols-[1.05fr_.95fr] lg:px-8 lg:pb-24">
          <div className="relative z-10 max-w-2xl">
            <p className="hero-line eyebrow mb-7 text-[#efbd5c]">Family-run property care in Kenya</p>
            <h1 className="font-display text-[clamp(3.7rem,9vw,8.6rem)] leading-[.88] tracking-[-.065em]">
              <span className="hero-line block">Good homes.</span>
              <span className="hero-line block italic text-[#efbd5c]">Properly kept.</span>
              <span className="hero-line block">Thoughtfully found.</span>
            </h1>
            <p className="hero-line mt-9 max-w-md text-base leading-7 text-[#d8d4cc] sm:text-lg">Geostep Property is the family-run property management arm of Geostep Engineers Limited — looking after homes, tenants and owners with a practical eye for detail.</p>
            <div className="hero-line mt-9 flex flex-wrap items-center gap-4">
              <a href="#homes" className="inline-flex items-center gap-3 rounded-full bg-[#efbd5c] px-6 py-4 text-xs font-extrabold uppercase tracking-[.13em] text-[#25283d] transition-transform hover:-translate-y-1" data-testid="link-hero-view-homes">Explore available homes <ArrowDownRight size={16} /></a>
              <a href="#story" className="inline-flex items-center gap-2 px-2 py-3 text-xs font-bold text-[#d8d4cc] underline decoration-[#efbd5c] underline-offset-8 hover:text-[#efbd5c]" data-testid="link-hero-story">Why Geostep Property <ArrowUpRight size={14} /></a>
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-[530px] lg:mb-[-20px]">
            <div className="absolute -left-7 top-16 z-20 hidden w-36 rounded-xl border border-white/15 bg-[#31344b]/85 p-4 backdrop-blur-md sm:block">
              <p className="eyebrow text-[#efbd5c]">Family-run</p>
              <p className="mt-3 text-xs leading-5 text-[#dedad3]">Grounded in Kenya.<br />Built on care.</p>
            </div>
            <div className="image-sheen relative aspect-[.82] overflow-hidden rounded-[10rem_10rem_1rem_1rem] border border-white/15 bg-[#5b5566]">
              <img src="/images/nairobi-courtyard.jpg" alt="Sunlit courtyard at a modern Nairobi apartment" className="h-full w-full object-cover opacity-85 mix-blend-luminosity" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#25283d]/80 via-transparent to-[#25283d]/5" />
              <div className="absolute bottom-7 left-7 right-7 flex items-end justify-between">
                <div>
                  <p className="eyebrow text-[#efbd5c]">Nairobi / Kenya</p>
                  <p className="mt-2 font-display text-2xl italic">Room to live well.</p>
                </div>
                <span className="grid size-12 place-items-center rounded-full border border-[#efbd5c]/70 text-[#efbd5c]"><MapPin size={19} /></span>
              </div>
            </div>
            <div className="absolute -bottom-7 -right-3 grid size-28 place-items-center rounded-full bg-[#efbd5c] text-center text-[#25283d] shadow-xl sm:-right-8">
              <span><span className="block font-display text-3xl leading-none">02</span><span className="eyebrow mt-1 block text-[.5rem] tracking-[.09em]">cities & counting</span></span>
            </div>
          </div>
        </div>
        <div className="mx-auto flex max-w-[1240px] items-center justify-between border-t border-white/10 px-5 py-5 text-[#aaa8ad] lg:px-8">
          <span className="font-mono text-[.6rem] uppercase tracking-[.17em]">Nairobi · Mombasa · Diani</span>
          <span className="hidden items-center gap-2 text-[.68rem] sm:flex"><span className="size-1.5 rounded-full bg-[#efbd5c]" />Taking on a few new homes</span>
          <a href="#homes" className="flex items-center gap-2 text-[.68rem] font-semibold text-[#efbd5c]" data-testid="link-scroll-homes">Scroll to explore <ArrowDownRight size={14} /></a>
        </div>
      </section>

      <main>
        <section className="bg-[#e7ded0] px-5 py-8 lg:px-8">
          <div className="mx-auto grid max-w-[1240px] grid-cols-2 gap-6 text-[#25283d] sm:grid-cols-4">
            {[
              ['01', 'One clear point of contact', 'for the details that matter'],
              ['02', 'Local eyes on the ground', 'from Nairobi to the coast'],
              ['03', 'Homes, not inventory', 'every listing earns its place'],
              ['04', 'A little more considered', 'in everything we do'],
            ].map(([number, title, copy]) => (
              <div key={number} className="border-l border-[#25283d]/20 pl-4 first:border-0 first:pl-0 sm:first:border-l sm:first:pl-4">
                <p className="font-mono text-[.62rem] text-[#a66743]">{number}</p>
                <p className="mt-3 max-w-[9rem] text-xs font-extrabold leading-5">{title}</p>
                <p className="mt-1 max-w-[10rem] text-[.68rem] leading-4 text-[#25283d]/55">{copy}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="homes" className="scroll-mt-10 px-5 py-24 lg:px-8 lg:py-36">
          <div className="mx-auto max-w-[1240px]">
            <Reveal className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
              <div>
                <p className="eyebrow text-[#a66743]">The current edit / 01</p>
                <h2 className="mt-5 max-w-xl font-display text-5xl leading-[.96] tracking-[-.045em] sm:text-6xl">Places with a pulse of their own.</h2>
              </div>
              <div className="max-w-xs md:text-right">
                <p className="text-sm leading-6 text-[#696775]">A few example homes we would be proud to look after. Availability changes; our standard does not.</p>
                <button type="button" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} className="mt-4 inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[.1em] text-[#a66743] underline decoration-[#efbd5c] underline-offset-8" data-testid="button-ask-availability">Ask about availability <ArrowUpRight size={14} /></button>
              </div>
            </Reveal>
            <div className="mt-14 grid gap-5 md:grid-cols-3">
              {listings.map((listing, index) => <Reveal key={listing.id} delay={index * 90}><ListingCard listing={listing} onSelect={setActiveListing} /></Reveal>)}
            </div>
            <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-[#d9d0c2] pt-5">
              <p className="flex items-center gap-2 text-xs text-[#696775]"><Clock3 size={15} className="text-[#a66743]" />Listings shown are illustrative examples of the homes we represent.</p>
              <button type="button" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} className="flex items-center gap-2 text-xs font-bold text-[#25283d] hover:text-[#a66743]" data-testid="button-request-listings">Request the private list <ArrowUpRight size={14} /></button>
            </div>
          </div>
        </section>

        <section id="owners" className="scroll-mt-10 bg-[#25283d] px-5 py-24 text-[#f9f5eb] lg:px-8 lg:py-32">
          <div className="mx-auto max-w-[1240px]">
            <Reveal className="mb-16 grid gap-8 md:grid-cols-[.7fr_1.3fr] md:items-end">
              <p className="eyebrow text-[#efbd5c]">The Geostep difference / 02</p>
              <h2 className="max-w-3xl font-display text-5xl leading-[.95] tracking-[-.05em] sm:text-7xl">Property management, with the edges softened.</h2>
            </Reveal>
            <div className="grid gap-5 lg:grid-cols-2">
              <Reveal className="rounded-[1.35rem] bg-[#31344b] p-7 sm:p-10" delay={80}>
                <div className="mb-12 flex items-start justify-between">
                  <div><p className="eyebrow text-[#efbd5c]">For owners</p><h3 className="mt-4 font-display text-3xl">Your asset.<br /><i>Our attention.</i></h3></div>
                  <ShieldCheck size={29} strokeWidth={1.25} className="text-[#efbd5c]" />
                </div>
                <ServiceList items={ownerServices} accent="gold" />
                <a href="#contact" className="mt-10 inline-flex items-center gap-2 rounded-full border border-[#efbd5c]/50 px-5 py-3 text-xs font-bold text-[#efbd5c] transition-colors hover:bg-[#efbd5c] hover:text-[#25283d]" data-testid="link-owner-consultation">Talk about your property <ArrowUpRight size={15} /></a>
              </Reveal>
              <Reveal className="rounded-[1.35rem] bg-[#a66743] p-7 text-[#f9f5eb] sm:p-10" delay={160}>
                <div className="mb-12 flex items-start justify-between">
                  <div><p className="eyebrow text-[#f4d795]">For tenants</p><h3 className="mt-4 font-display text-3xl">Find a place<br /><i>that fits.</i></h3></div>
                  <HomeIcon size={29} strokeWidth={1.25} className="text-[#f4d795]" />
                </div>
                <ServiceList items={tenantServices} accent="clay" />
                <a href="#homes" className="mt-10 inline-flex items-center gap-2 rounded-full border border-[#f4d795]/60 px-5 py-3 text-xs font-bold text-[#f4d795] transition-colors hover:bg-[#f4d795] hover:text-[#25283d]" data-testid="link-tenant-search">See the home edit <ArrowUpRight size={15} /></a>
              </Reveal>
            </div>
          </div>
        </section>

        <section id="story" className="scroll-mt-10 px-5 py-24 lg:px-8 lg:py-36">
          <div className="mx-auto grid max-w-[1240px] gap-14 lg:grid-cols-[.85fr_1.15fr] lg:items-center">
            <Reveal className="relative mx-auto w-full max-w-[470px]">
              <div className="image-sheen aspect-[.78] overflow-hidden rounded-[1rem_8rem_1rem_8rem] bg-[#d2c0aa]">
                <img src="/images/interior-lounge.jpg" alt="Warm, considered living room interior in a Nairobi home" className="h-full w-full object-cover" />
              </div>
              <div className="absolute -bottom-7 -right-4 rounded-xl bg-[#efbd5c] p-5 text-[#25283d] shadow-lg sm:-right-8">
                <p className="font-display text-4xl leading-none">kwa moyo</p>
                <p className="eyebrow mt-2 text-[.55rem]">with heart / in Swahili spirit</p>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <p className="eyebrow text-[#a66743]">Our story / 03</p>
              <h2 className="mt-5 max-w-2xl font-display text-5xl leading-[.95] tracking-[-.05em] sm:text-7xl">Because a home is never just a line on a spreadsheet.</h2>
              <div className="mt-8 grid gap-8 sm:grid-cols-[1fr_1fr]">
                <p className="text-sm leading-7 text-[#696775]">Geostep Engineers Limited began as a family business with a practical instinct: create things that last and look after them properly. Geostep Property brings that same care to the homes and rentals we manage.</p>
                <p className="text-sm leading-7 text-[#696775]">We are starting small and staying close to the work — building a thoughtful property portfolio across Nairobi and the coast. We notice the leaking tap before it becomes a ceiling. We answer the message.</p>
              </div>
              <div className="mt-10 flex items-center gap-8 border-t border-[#d9d0c2] pt-6">
                <div><p className="font-display text-4xl">1</p><p className="eyebrow mt-1 text-[#a66743]">family business</p></div>
                <div><p className="font-display text-4xl">2</p><p className="eyebrow mt-1 text-[#a66743]">markets to start</p></div>
                <span className="ml-auto hidden size-12 place-items-center rounded-full border border-[#a66743]/40 text-[#a66743] sm:grid"><Sparkles size={18} /></span>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="overflow-hidden bg-[#e7ded0] px-5 py-24 lg:px-8 lg:py-32">
          <div className="mx-auto max-w-[1240px]">
            <Reveal className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div><p className="eyebrow text-[#a66743]">How it feels / 04</p><h2 className="mt-5 font-display text-5xl tracking-[-.045em] sm:text-6xl">From first hello<br /><i>to well looked after.</i></h2></div>
              <p className="max-w-xs text-sm leading-6 text-[#696775]">No black boxes. No disappearing acts. Just a straightforward way of working, tuned to real life in Kenya.</p>
            </Reveal>
            <div className="mt-16 grid gap-0 border-y border-[#25283d]/15 md:grid-cols-4">
              {[
                ['01', 'Say hello', 'Tell us what you own, what you need, or what you are looking for.'],
                ['02', 'Make a plan', 'We visit, listen and recommend a clear next step without the hard sell.'],
                ['03', 'Keep things moving', 'Viewings, repairs, paperwork and updates handled with care.'],
                ['04', 'Feel the difference', 'A home that runs better, and a partner you can reach.'],
              ].map(([number, title, copy], index) => (
                <div key={number} className={`border-[#25283d]/15 p-6 sm:p-8 ${index !== 3 ? 'md:border-r' : ''}`}>
                  <span className="font-mono text-xs text-[#a66743]">{number}</span>
                  <h3 className="mt-16 font-display text-2xl">{title}</h3>
                  <p className="mt-3 text-sm leading-6 text-[#696775]">{copy}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#f4f0e7] px-5 py-24 lg:px-8 lg:py-32">
          <div className="mx-auto max-w-[1240px]">
            <Reveal className="grid gap-8 lg:grid-cols-[1fr_1.7fr] lg:items-end">
              <p className="eyebrow text-[#a66743]">A few kind words / 05</p>
              <blockquote className="font-display text-4xl leading-[1.05] tracking-[-.035em] sm:text-5xl">“Geostep Property made owning a home from abroad feel surprisingly close. I knew what was happening, and why.”</blockquote>
            </Reveal>
            <Reveal className="mt-8 flex items-center justify-between border-t border-[#d9d0c2] pt-5" delay={100}>
              <div><p className="text-sm font-bold">Amina K.</p><p className="mt-1 text-xs text-[#696775]">Property owner, Kilimani</p></div>
              <div className="flex gap-2 text-[#a66743]" aria-label="Five star testimonial"><span>•</span><span>•</span><span>•</span><span>•</span><span>•</span></div>
            </Reveal>
          </div>
        </section>

        <section id="contact" className="scroll-mt-10 bg-[#25283d] px-5 py-24 text-[#f9f5eb] lg:px-8 lg:py-32">
          <div className="mx-auto grid max-w-[1240px] gap-16 lg:grid-cols-[.78fr_1.22fr]">
            <Reveal>
              <p className="eyebrow text-[#efbd5c]">Let’s make a start / 06</p>
              <h2 className="mt-5 max-w-lg font-display text-6xl leading-[.9] tracking-[-.05em] sm:text-7xl">Tell us where you are.</h2>
              <p className="mt-7 max-w-sm text-sm leading-7 text-[#d8d4cc]">Whether you have a home to hand over or a home to find, a good conversation is the right place to begin.</p>
              <div className="mt-12 space-y-5 border-t border-white/15 pt-6">
                <a href="mailto:hello@geostep.example" className="flex items-center gap-4 text-sm text-[#d8d4cc] hover:text-[#efbd5c]" data-testid="link-email"><span className="grid size-9 place-items-center rounded-full border border-white/15 text-[#efbd5c]"><Mail size={15} /></span>hello@geostep.example <span className="font-mono text-[.55rem] text-[#85848e]">(replace with your email)</span></a>
                <a href="tel:+254700000000" className="flex items-center gap-4 text-sm text-[#d8d4cc] hover:text-[#efbd5c]" data-testid="link-phone"><span className="grid size-9 place-items-center rounded-full border border-white/15 text-[#efbd5c]"><Phone size={15} /></span>+254 700 000 000 <span className="font-mono text-[.55rem] text-[#85848e]">(placeholder)</span></a>
                <a href="https://wa.me/254700000000?text=Hello%20Geostep%20Property%2C%20I%27d%20like%20to%20ask%20about%20a%20property." target="_blank" rel="noreferrer" className="flex items-center gap-4 text-sm text-[#d8d4cc] hover:text-[#efbd5c]" data-testid="link-whatsapp"><span className="grid size-9 place-items-center rounded-full border border-white/15 text-[#efbd5c]"><MessageCircle size={15} /></span>WhatsApp us <span className="font-mono text-[.55rem] text-[#85848e]">(placeholder)</span></a>
              </div>
              <p className="mt-10 flex items-center gap-2 font-mono text-[.6rem] uppercase tracking-[.13em] text-[#85848e]"><MapPin size={13} className="text-[#efbd5c]" />Nairobi · Kenya / EAT</p>
            </Reveal>
            <Reveal className="rounded-[1.25rem] bg-[#f9f5eb] p-6 text-[#25283d] sm:p-10" delay={100}>
              {submitted ? (
                <div className="flex min-h-[470px] flex-col items-start justify-center">
                  <span className="grid size-14 place-items-center rounded-full bg-[#efbd5c] text-[#25283d]"><CircleCheck size={27} /></span>
                  <p className="eyebrow mt-8 text-[#a66743]">Message received</p>
                  <h3 className="mt-4 max-w-md font-display text-5xl leading-[.95]">We’ll be in touch, {formState.name.split(' ')[0]}.</h3>
                  <p className="mt-5 max-w-sm text-sm leading-6 text-[#696775]">Thank you for reaching out. This is a demo enquiry form — replace the contact details and connect your preferred inbox before launch.</p>
                  <button type="button" onClick={() => { setSubmitted(false); setFormState({ name: '', email: '', phone: '', interest: 'I own a property', message: '' }); }} className="mt-8 inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[.1em] text-[#a66743] underline decoration-[#efbd5c] underline-offset-8" data-testid="button-send-another">Send another message <ArrowUpRight size={14} /></button>
                </div>
              ) : (
                <form onSubmit={submitForm} noValidate>
                  <div className="mb-8 flex items-start justify-between gap-6">
                    <div><p className="eyebrow text-[#a66743]">Enquiry form</p><h3 className="mt-3 font-display text-4xl leading-none">A few details,<br /><i>then we’ll talk.</i></h3></div>
                    <Send size={23} strokeWidth={1.5} className="mt-1 text-[#a66743]" />
                  </div>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <label className="block"><span className="eyebrow text-[#696775]">Your name <b className="text-[#a66743]">*</b></span><input value={formState.name} onChange={(event) => updateForm('name', event.target.value)} className="mt-2 w-full border-b border-[#cfc5b6] bg-transparent px-0 py-3 text-sm placeholder:text-[#aaa298] focus:border-[#25283d] focus:outline-none" placeholder="e.g. Wanjiku N." data-testid="input-name" /></label>
                    <label className="block"><span className="eyebrow text-[#696775]">Email <b className="text-[#a66743]">*</b></span><input type="email" value={formState.email} onChange={(event) => updateForm('email', event.target.value)} className="mt-2 w-full border-b border-[#cfc5b6] bg-transparent px-0 py-3 text-sm placeholder:text-[#aaa298] focus:border-[#25283d] focus:outline-none" placeholder="you@example.com" data-testid="input-email" /></label>
                    <label className="block"><span className="eyebrow text-[#696775]">Phone / WhatsApp</span><input type="tel" value={formState.phone} onChange={(event) => updateForm('phone', event.target.value)} className="mt-2 w-full border-b border-[#cfc5b6] bg-transparent px-0 py-3 text-sm placeholder:text-[#aaa298] focus:border-[#25283d] focus:outline-none" placeholder="+254 ..." data-testid="input-phone" /></label>
                    <label className="block relative"><span className="eyebrow text-[#696775]">I’m here to</span><select value={formState.interest} onChange={(event) => updateForm('interest', event.target.value)} className="mt-2 w-full appearance-none border-b border-[#cfc5b6] bg-transparent px-0 py-3 text-sm focus:border-[#25283d] focus:outline-none" data-testid="select-interest"><option>I own a property</option><option>I’m looking for a home</option><option>I’m interested in partnerships</option></select><ChevronDown size={15} className="pointer-events-none absolute bottom-3 right-0 text-[#a66743]" /></label>
                  </div>
                  <label className="mt-7 block"><span className="eyebrow text-[#696775]">Your note <b className="text-[#a66743]">*</b></span><textarea value={formState.message} onChange={(event) => updateForm('message', event.target.value)} rows={4} className="mt-2 w-full resize-none border-b border-[#cfc5b6] bg-transparent px-0 py-3 text-sm leading-6 placeholder:text-[#aaa298] focus:border-[#25283d] focus:outline-none" placeholder="Tell us a little about what you need..." data-testid="textarea-message" /></label>
                  {formError && <p role="alert" className="mt-5 text-xs font-semibold text-[#a66743]" data-testid="status-form-error">{formError}</p>}
                  <button type="submit" className="mt-8 inline-flex items-center gap-3 rounded-full bg-[#25283d] px-6 py-4 text-xs font-extrabold uppercase tracking-[.13em] text-[#f9f5eb] transition-transform hover:-translate-y-1" data-testid="button-submit-enquiry">Send enquiry <ArrowUpRight size={16} className="text-[#efbd5c]" /></button>
                  <p className="mt-5 text-[.65rem] leading-5 text-[#8b8790]">By sending this form, you’re starting a conversation — not signing up for anything.</p>
                </form>
              )}
            </Reveal>
          </div>
        </section>
      </main>

      <footer className="bg-[#25283d] px-5 pb-8 text-[#f9f5eb] lg:px-8">
        <div className="mx-auto max-w-[1240px] border-t border-white/15 pt-8">
          <div className="flex flex-col justify-between gap-8 sm:flex-row sm:items-end">
            <div><BrandMark dark /><p className="mt-5 max-w-xs text-xs leading-5 text-[#85848e]">A small, attentive property partner for Nairobi and the coast.</p></div>
            <div className="flex gap-6 text-xs text-[#aaa8ad]"><a href="#homes" className="hover:text-[#efbd5c]" data-testid="link-footer-homes">Homes</a><a href="#owners" className="hover:text-[#efbd5c]" data-testid="link-footer-owners">Owners</a><a href="#contact" className="hover:text-[#efbd5c]" data-testid="link-footer-contact">Contact</a></div>
          </div>
          <div className="mt-10 flex flex-col justify-between gap-3 border-t border-white/10 pt-5 font-mono text-[.58rem] uppercase tracking-[.13em] text-[#6f6e7a] sm:flex-row"><span>© 2026 Geostep Property · Geostep Engineers Limited</span><span>Made with care in Kenya</span></div>
        </div>
      </footer>

      {activeListing && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-[#25283d]/70 px-5 py-8 backdrop-blur-sm" role="dialog" aria-modal="true" aria-label={`${activeListing.title} details`}>
          <div className="relative max-h-full w-full max-w-xl overflow-auto rounded-[1.25rem] bg-[#f9f5eb] p-5 text-[#25283d] shadow-2xl sm:p-7">
            <button type="button" onClick={() => setActiveListing(null)} className="absolute right-5 top-5 z-10 grid size-10 place-items-center rounded-full bg-[#25283d] text-[#f9f5eb]" aria-label="Close property details" data-testid="button-close-property"><X size={18} /></button>
            <div className="image-sheen h-56 overflow-hidden rounded-xl bg-[#d8c9b9] sm:h-64"><img src={activeListing.image} alt={`${activeListing.title} detail`} className="h-full w-full object-cover" /></div>
            <p className="eyebrow mt-6 text-[#a66743]">{activeListing.area} / {activeListing.type}</p>
            <h3 className="mt-3 font-display text-4xl leading-none">{activeListing.title}</h3>
            <p className="mt-4 text-sm leading-6 text-[#696775]">{activeListing.detail} This is an example listing for the Geostep Property portfolio; ask us for current availability and similar homes.</p>
            <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-[#ddd5c8] pt-5"><span className="text-sm font-extrabold">{activeListing.price}</span><a href="#contact" onClick={() => setActiveListing(null)} className="inline-flex items-center gap-2 rounded-full bg-[#25283d] px-5 py-3 text-xs font-bold uppercase tracking-[.08em] text-[#f9f5eb]" data-testid={`link-enquire-${activeListing.id}`}>Enquire about this home <ArrowUpRight size={14} className="text-[#efbd5c]" /></a></div>
          </div>
        </div>
      )}
    </div>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route component={Home} />
    </Switch>
  );
}

function App() {
  const [location] = useLocation();
  return (
    <ErrorBoundary resetKey={location}>
      <Router />
    </ErrorBoundary>
  );
}

export default function AppWithRouter() {
  return (
    <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
      <App />
    </WouterRouter>
  );
}