import { useEffect, useState } from 'react'
import { trackLead } from './analytics.js'

const PHONE = '(803) 935-2280'
const PHONE_HREF = 'tel:+18039352280'
const WEBSITE = 'GroundedPowerElectric.com'
const EMAIL = 'derrickgpelectric@gmail.com'
const HOURS = 'Monday–Friday, 8:00 AM–5:00 PM'
const SERVICE_TOWN = 'Irmo, SC 29063'
const GOOGLE_REVIEWS = 'https://www.google.com/maps/place/Grounded+Power+Electric+LLC/@33.9609697,-81.4134854,10z/data=!3m1!4b1!4m6!3m5!1s0xa35e7c6c1e27368d:0x6331efae935c8f2f!8m2!3d33.9608395!4d-81.0838459!16s%2Fg%2F11z2vx7dzc?entry=ttu'

const REVIEWS = [
  { text: 'Derrick was timely, professional, and his electrical work was well-priced. I had several outlets and fixtures that weren\u2019t working and he managed to trouble shoot and fix them all. I felt at ease having Derrick in my home while I was working remotely and highly recommend him should you need an electrician.', name: 'Kristen Puckett', meta: 'Google review • Local Guide' },
  { text: 'Derrick arrived exactly when he said he would, very professional. Went right to work after explanation and review of charges, cleaned up area nicely when he left. Very efficient, personable, quickly replaced my kitchen light fixture. Will definitely use him again and tell others to as well.', name: 'julie ballance', meta: 'Google review • Local Guide' },
  { text: 'Derrick has updated several light fixtures in my home and added sconces above the fireplace where there was previously no lighting. It makes a world of difference! He even suggested a dimmer switch for the sconces, anticipating a need\u2026', name: 'Cher Keller', meta: 'Google review' },
  { text: 'Derrick is very knowledgable and quick! He was very kind and willing to answer any questions about the process. He was done with project in no time and we haven\u2019t had any problems since! Will definitely use him for any of my electrical needs!', name: 'Imani Vincent', meta: 'Google review' },
]

const SERVICES = [
  {
    icon: '🔌',
    title: 'Panels, Meters & Service',
    text: 'Panel replacements, panel upgrades, meter & meter base replacements, service upgrades, disconnect installation, grounding & bonding upgrades, and whole-home surge protection.',
    items: ['Panel Replacements', 'Panel Upgrades', 'Meter & Meter Base', 'Service Upgrades', 'Disconnects', 'Grounding & Bonding', 'Surge Protection'],
  },
  {
    icon: '🔧',
    title: 'Troubleshooting, Repairs & Safety',
    text: 'Electrical troubleshooting and repairs, code corrections, inspection repairs, safety upgrades, and protective devices for a safer home or business.',
    items: ['Troubleshooting & Repairs', 'Code Corrections', 'Inspection Repairs', 'Safety Upgrades', 'GFCI & AFCI Protection', 'Smoke & CO Detectors'],
  },
  {
    icon: '🏠',
    title: 'Rewiring, Remodel & New Construction',
    text: 'From older homes needing partial or whole-home rewiring to remodels, additions, and new construction wiring done clean and to code.',
    items: ['Whole-Home Rewiring', 'Partial Rewiring', 'Remodel Wiring', 'New Construction', 'Home Additions'],
  },
  {
    icon: '⚡',
    title: 'Circuits, EV & Generator Power',
    text: 'Dedicated circuits for appliances, workshops, and equipment — plus residential EV charging and portable generator connections.',
    items: ['Dedicated & 120V/240V Circuits', 'Garage & Workshop Power', 'Appliance & HVAC Circuits', 'Receptacles, Switches & Outdoor Power', 'EV Charger Installation', 'Generator Inlets (30A / 50A)', 'Generator Interlock'],
  },
  {
    icon: '💡',
    title: 'Lighting, Fans & Fixtures',
    text: 'Interior and exterior lighting, fans, and fixtures — including recessed lighting, decorative fixtures, and security lighting.',
    items: ['Lighting Installation', 'Recessed Lighting', 'Ceiling Fans', 'Chandeliers & Fixtures', 'Outdoor & Security Lighting'],
  },
  {
    icon: '🏢',
    title: 'Rental, Commercial & Contractor Work',
    text: 'Electrical services for rental properties, property managers, general contractors, builders, remodelers, and commercial businesses.',
    items: ['Rental Property Services', 'Property Manager Repairs', 'Commercial Lighting & LED Upgrades', 'Emergency & Exit Lighting', 'Equipment & Motor Circuits'],
  },
]

const FAQS = [
  { q: 'Do you provide residential electrical services?', a: 'Yes. Residential electrical work is one of our primary services, including repairs, troubleshooting, panel replacements, rewiring, lighting, EV chargers, generator connections, dedicated circuits, and more.', open: true },
  { q: 'Do you provide commercial electrical services?', a: 'Yes. We provide light commercial electrical services including troubleshooting, lighting, dedicated circuits, equipment power, panel work, emergency lighting, and electrical upgrades.' },
  { q: 'Do you install EV chargers?', a: 'Yes. We install dedicated electrical circuits and charging equipment for residential EV charging systems.' },
  { q: 'Do you install generator connections?', a: 'Yes. We install 30-amp and 50-amp generator inlet connections, interlock equipment, and associated electrical components where applicable.' },
  { q: 'Can you replace an electrical panel or meter?', a: 'Yes. We perform electrical panel replacements, upgrades, meter equipment replacements, grounding upgrades, and related service work.' },
  { q: 'Do you work on older homes?', a: 'Yes. We troubleshoot and repair existing electrical systems and can perform partial or complete rewiring and electrical upgrades.' },
  { q: 'Do you work with landlords and property managers?', a: 'Yes. We provide electrical troubleshooting, repairs, safety corrections, upgrades, and other electrical services for rental properties and property managers.' },
  { q: 'Do you provide estimates?', a: 'Contact Grounded Power Electric to discuss your project and schedule an estimate. We strive to respond to customer inquiries as quickly as possible during normal business hours.' },
]

function QuickForm() {
  const [sent, setSent] = useState(false)
  const [error, setError] = useState(false)
  const [sending, setSending] = useState(false)
  const onSubmit = async (e) => {
    e.preventDefault()
    if (sending || sent) return
    setError(false)
    setSending(true)
    const form = e.currentTarget
    try {
      const data = new FormData(form)
      data.append('form-name', 'quick-estimate')
      const res = await fetch('/', { method: 'POST', body: data })
      if (!res.ok) throw new Error('submit failed')
      form.reset()
      setSent(true)
      trackLead('quick-estimate')
    } catch {
      setError(true)
    } finally {
      setSending(false)
    }
  }
  return (
    <div className="bg-cream text-ink rounded-2xl p-4 sm:p-5 shadow-[0_20px_60px_rgba(0,0,0,.35)] border-t-[6px] border-leafdark w-full min-w-0">
      <h3 className="font-slab text-xl text-bark m-0">Request an estimate</h3>
      <p className="text-sm text-[#6b5d45] mt-1 mb-3">We strive to respond to inquiries as quickly as possible during normal business hours ({HOURS}).</p>
      <form name="quick-estimate" className="grid gap-2.5" onSubmit={onSubmit}>
        <p className="hidden"><label>Don’t fill this out if you’re human: <input name="bot-field" tabIndex={-1} autoComplete="off" /></label></p>
        <select name="service" required defaultValue="" className="w-full px-3 py-3.5 min-h-[48px] text-base border border-[#d9cbae] rounded-[10px] bg-white">
          <option value="" disabled>What do you need?</option>
          <option>Panel / meter / service upgrade</option>
          <option>Troubleshooting / repair</option>
          <option>Rewiring / remodel / new construction</option>
          <option>EV charger install</option>
          <option>Generator inlet / interlock</option>
          <option>Circuits / outlets / switches</option>
          <option>Lighting / ceiling fan / fixtures</option>
          <option>Rental / commercial work</option>
        </select>
        <input name="zip" placeholder="ZIP code (ex. 29063)" inputMode="numeric" pattern="[0-9]{5}" required className="w-full px-3 py-3.5 min-h-[48px] text-base border border-[#d9cbae] rounded-[10px] bg-white" />
        <input name="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="Phone number" required className="w-full px-3 py-3.5 min-h-[48px] text-base border border-[#d9cbae] rounded-[10px] bg-white" />
        <button className="bg-amberbrand text-bark font-bold border-2 border-bark rounded-[10px] px-5 py-4 min-h-[52px] text-base hover:bg-bulb transition w-full disabled:opacity-70" type="submit" disabled={sending}>
          {sending ? 'Sending…' : sent ? 'Sent ✓' : 'Schedule Service'}
        </button>
        <small className="text-[#6b5d45] leading-snug">✓ A real local electrician will get back to you. For fastest scheduling, call <a href={PHONE_HREF} className="font-bold whitespace-nowrap">{PHONE}</a>.</small>
      </form>
      {sent && <div className="bg-[#eef7e6] border border-[#9cc184] text-[#234d12] p-3 rounded-[10px] mt-2">✓ Got it! We&apos;ll be in touch during business hours. Need to talk sooner? Call <a href={PHONE_HREF}>{PHONE}</a>.</div>}
      {error && <div className="bg-[#fdeceb] border border-[#e8a09a] text-[#7a241d] p-3 rounded-[10px] mt-2">Something went wrong sending that — please try again or call <a href={PHONE_HREF} className="font-bold">{PHONE}</a>.</div>}
    </div>
  )
}

function MainForm() {
  const [sent, setSent] = useState(false)
  const [error, setError] = useState(false)
  const [sending, setSending] = useState(false)
  const onSubmit = async (e) => {
    e.preventDefault()
    if (sending || sent) return
    setError(false)
    setSending(true)
    const form = e.currentTarget
    try {
      const data = new FormData(form)
      data.append('form-name', 'quote-request')
      const res = await fetch('/', { method: 'POST', body: data })
      if (!res.ok) throw new Error('submit failed')
      form.reset()
      setSent(true)
      trackLead('quote-request')
    } catch {
      setError(true)
    } finally {
      setSending(false)
    }
  }
  return (
    <form name="quote-request" id="mainForm" className="bg-[#fffdf6] border-2 border-bark rounded-2xl p-4 sm:p-5 grid gap-3 shadow-[0_12px_40px_rgba(59,35,20,.15)] w-full min-w-0" onSubmit={onSubmit}>
      <p className="hidden"><label>Don’t fill this out if you’re human: <input name="bot-field" tabIndex={-1} autoComplete="off" /></label></p>
      <div className="grid sm:grid-cols-2 gap-3">
        <input name="name" autoComplete="name" placeholder="Full name *" required className="px-3 py-3.5 min-h-[48px] text-base border border-[#d9cbae] rounded-[10px] bg-white w-full" />
        <input name="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="Phone *" required className="px-3 py-3.5 min-h-[48px] text-base border border-[#d9cbae] rounded-[10px] bg-white w-full" />
      </div>
      <div className="grid sm:grid-cols-2 gap-3">
        <input name="email" type="email" inputMode="email" autoComplete="email" placeholder="Email" className="px-3 py-3.5 min-h-[48px] text-base border border-[#d9cbae] rounded-[10px] bg-white w-full" />
        <input name="zip" placeholder="ZIP *" inputMode="numeric" pattern="[0-9]{5}" required className="px-3 py-3.5 min-h-[48px] text-base border border-[#d9cbae] rounded-[10px] bg-white w-full" />
      </div>
      <select name="service" required defaultValue="" className="px-3 py-3.5 min-h-[48px] text-base border border-[#d9cbae] rounded-[10px] bg-white w-full">
        <option value="" disabled>Service needed *</option>
        <option>Residential electrical service</option>
        <option>Commercial electrical service</option>
        <option>Rental property electrical service</option>
        <option>Troubleshooting / repair</option>
        <option>Panel / meter / service upgrade</option>
        <option>Rewiring / remodel / addition / new construction</option>
        <option>EV charger install</option>
        <option>Generator inlet / interlock</option>
        <option>Lighting / fan / fixtures / detectors</option>
        <option>Other</option>
      </select>
      <select name="timing" defaultValue="Preferred timing — Flexible" className="px-3 py-3.5 min-h-[48px] text-base border border-[#d9cbae] rounded-[10px] bg-white w-full">
        <option>Preferred timing — Flexible</option>
        <option>Weekday morning</option>
        <option>Weekday afternoon</option>
        <option>Just getting project information</option>
      </select>
      <textarea name="message" rows={4} placeholder="Describe the project... ex. 'Need panel replacement in Irmo, home built 1985' or 'EV charger in garage in Lexington'" className="px-3 py-3.5 min-h-[96px] text-base border border-[#d9cbae] rounded-[10px] bg-white w-full" />
      <label className="border border-dashed border-[#b9a888] rounded-[10px] p-3 text-sm text-[#5c4f3d]">📷 Add photo (optional, helps us understand the job)<input name="photo" type="file" accept="image/*" className="block mt-2 w-full min-h-[44px]" /></label>
      <button className="bg-amberbrand text-bark font-bold border-2 border-bark rounded-[10px] px-5 py-4 min-h-[56px] text-base sm:text-lg hover:bg-bulb transition w-full disabled:opacity-70" type="submit" disabled={sending}>{sending ? 'Sending…' : sent ? 'Sent ✓' : 'Send Request →'}</button>
      <small className="text-[#8a7d68]">We’ll get back to you during business hours. No spam, ever.</small>
      {sent && <div className="bg-[#eef7e6] border border-[#9cc184] text-[#234d12] p-3 rounded-[10px]">✓ Request received! We&apos;ll be in touch during normal business hours. Prefer to talk? Call <a href={PHONE_HREF}>{PHONE}</a>.</div>}
      {error && <div className="bg-[#fdeceb] border border-[#e8a09a] text-[#7a241d] p-3 rounded-[10px]">Something went wrong sending that — please try again or call <a href={PHONE_HREF} className="font-bold">{PHONE}</a>.</div>}
    </form>
  )
}

function PrivacyPage() {
  return (
    <div className="max-w-[760px] mx-auto px-4 sm:px-5 py-12">
      <p className="text-leafdark font-extrabold uppercase tracking-[.12em] text-xs mb-2">Privacy Policy</p>
      <h1 className="font-slab font-bold text-[clamp(1.8rem,5vw,2.6rem)] text-bark m-0">Privacy Policy</h1>
      <p className="text-[#5c4f3d] text-sm mt-2">Last updated: September 2026</p>
      <div className="mt-6 space-y-5 text-[#3d3428]">
        <section>
          <h2 className="font-slab text-xl text-bark">Information we collect</h2>
          <p>When you request an estimate through our forms, we collect your name, phone number, email address (optional), ZIP code, and project details — including any photos you choose to upload. Our analytics tool (Google Analytics 4, when enabled) collects anonymous usage data such as pages visited and device type.</p>
        </section>
        <section>
          <h2 className="font-slab text-xl text-bark">How we use it</h2>
          <p>We use your information only to respond to your request, schedule and perform electrical work, and improve this website. We do not sell, rent, or share your personal information with third parties for marketing.</p>
        </section>
        <section>
          <h2 className="font-slab text-xl text-bark">Service providers</h2>
          <p>This site is hosted by Netlify and form submissions are processed by Netlify Forms. Analytics, when enabled, is provided by Google. These providers handle data under their own privacy policies.</p>
        </section>
        <section>
          <h2 className="font-slab text-xl text-bark">Your choices</h2>
          <p>You can ask us to correct or delete your information at any time by contacting us below. You can disable cookies in your browser settings; the site will still work.</p>
        </section>
        <section>
          <h2 className="font-slab text-xl text-bark">Contact us</h2>
          <p>Grounded Power Electric, LLC<br />Based in {SERVICE_TOWN}<br /><a href={`mailto:${EMAIL}`} className="text-leafdark font-bold break-all">{EMAIL}</a><br /><a href={PHONE_HREF} className="text-leafdark font-bold">{PHONE}</a></p>
        </section>
      </div>
      <p className="mt-8"><a href="#top" className="text-leafdark font-bold">← Back to homepage</a></p>
    </div>
  )
}

export default function App() {
  const [navOpen, setNavOpen] = useState(false)
  const [route, setRoute] = useState(() => window.location.hash)
  useEffect(() => {
    const onHash = () => { setRoute(window.location.hash); window.scrollTo(0, 0) }
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])
  const isPrivacy = route === '#/privacy'
  return (
    <div id="top">
      <div className="bg-bark text-white text-center text-xs sm:text-sm font-semibold px-3 py-2 leading-snug">
        <span className="block sm:inline">Rooted in Quality Service — Serving Irmo, Columbia, Lexington &amp; the Midlands</span>{' '}
        <a href={PHONE_HREF} className="text-bulb font-extrabold underline underline-offset-2 whitespace-nowrap">Call {PHONE}</a>
      </div>

      <header className="sticky top-0 z-50 bg-cream/95 backdrop-blur border-b-2 border-bark">
        <div className="max-w-[1120px] mx-auto px-4 sm:px-5 py-2 flex items-center justify-between gap-2 sm:gap-3 relative">
          <a href="#top" className="flex items-center gap-2 text-bark no-underline min-w-0">
            <img src="/logo-tree.png" alt="Grounded Power Electric logo" className="w-11 h-11 sm:w-14 sm:h-14 md:w-[76px] md:h-[76px] object-cover rounded-xl md:rounded-2xl shrink-0" />
            <span className="font-slab font-bold leading-none text-[.85rem] sm:text-[1.05rem] whitespace-nowrap">GROUNDED POWER<small className="block text-[.55rem] sm:text-[.65rem] tracking-[.22em] sm:tracking-[.28em] text-amberdeep">ELECTRIC LLC</small></span>
          </a>
          <nav aria-label="Primary" className={`${navOpen ? 'flex' : 'hidden'} md:flex flex-col md:flex-row gap-1 md:gap-4 absolute md:static top-full left-0 right-0 md:left-auto md:right-auto bg-cream md:bg-transparent p-2 md:p-0 px-4 md:px-0 border-b-2 md:border-0 border-bark shadow-[0_18px_30px_rgba(0,0,0,.18)] md:shadow-none z-50`}>
            {['Services|#services','Why Us|#why','Work|#work','Reviews|#reviews','Areas|#areas','FAQ|#faq'].map((l) => {
              const [label, href] = l.split('|')
              return <a key={href} href={href} onClick={() => setNavOpen(false)} className="text-[#4a3a24] font-semibold text-base md:text-[.95rem] hover:text-bark px-2 py-3 md:py-1 min-h-[44px] flex items-center rounded-lg hover:bg-cream2 md:hover:bg-transparent">{label}</a>
            })}
          </nav>
          <div className="flex items-center gap-2 shrink-0">
            <a className="font-extrabold text-bark no-underline hidden lg:inline whitespace-nowrap" href={PHONE_HREF}>{PHONE}</a>
            <a className="bg-amberbrand text-bark font-bold border-2 border-bark rounded-[10px] px-3 py-2.5 sm:px-5 sm:py-3 text-sm sm:text-base hover:bg-bulb transition min-h-[44px] inline-flex items-center justify-center whitespace-nowrap" href="#quote"><span className="sm:hidden">Estimate</span><span className="hidden sm:inline">Request an Estimate</span></a>
            <button className="md:hidden bg-transparent border border-[#cbbb9c] rounded-lg w-11 h-11 grid place-items-center text-xl shrink-0" onClick={() => setNavOpen(!navOpen)} aria-label="Menu" aria-expanded={navOpen}>☰</button>
          </div>
        </div>
      </header>

      {isPrivacy ? (<main><PrivacyPage /></main>) : (
      <main>
        <section className="text-cream py-10 md:py-8 border-b-[6px] border-leafdark" style={{ background: 'radial-gradient(520px 300px at 18% 30%,rgba(255,201,60,.22),transparent 70%),radial-gradient(640px 240px at 88% 8%,rgba(255,233,168,.28),transparent 70%),linear-gradient(180deg,#140d05,#3B2314)' }}>
          <div className="max-w-[1120px] mx-auto px-4 sm:px-5 grid md:grid-cols-[1.15fr_.85fr] gap-6 md:gap-4 items-start">
            <div className="min-w-0">
              <div className="inline-flex items-center gap-2 bg-bulb text-bark px-3 py-1.5 rounded-full text-xs sm:text-sm font-bold mb-3.5 max-w-full">
                <img src="/logo-tree.png" alt="" className="w-[30px] h-[30px] rounded-full shrink-0" /> <span className="leading-tight">Locally Owned &amp; Operated — Columbia, SC Area</span>
              </div>
              <h1 className="font-slab font-bold text-[clamp(1.9rem,8vw,4rem)] leading-[1.05] text-balance m-0 [text-shadow:0_2px_14px_rgba(0,0,0,.8)]">Quality Electrical Work You Can Depend On.</h1>
              <p className="text-[#FFE9A8] font-bold mt-3 mb-0 text-base sm:text-lg">Grounded in Quality. Powered by Service.</p>
              <p className="text-[#e8dcc3] text-base sm:text-lg mt-2">Residential &amp; Commercial Electrical Services Serving Irmo, Columbia, Lexington and the Surrounding Midlands.</p>
              <p className="text-[#d8cbaa] text-[.95rem] sm:text-base">Locally owned electrical contractor specializing primarily in residential work, with commercial services for businesses, landlords, property managers, and contractors.</p>
              <div className="flex flex-row gap-2.5 sm:gap-3 my-5">
                <a href={PHONE_HREF} className="bg-bulb text-bark font-bold rounded-[10px] px-3 sm:px-6 py-4 text-sm min-[400px]:text-base sm:text-lg hover:bg-white transition min-h-[52px] inline-flex items-center justify-center text-center flex-1">📞 Call {PHONE}</a>
                <a href="#quote" className="border border-[#8a7d68] text-cream rounded-[10px] px-3 sm:px-6 py-4 text-sm min-[400px]:text-base sm:text-lg hover:border-cream transition min-h-[52px] inline-flex items-center justify-center text-center flex-1">Request an Estimate →</a>
              </div>
            </div>
            <QuickForm />
          </div>
          <div className="max-w-[1120px] mx-auto px-4 sm:px-5 grid md:grid-cols-[1.15fr_.85fr] gap-3 md:gap-4 items-stretch mt-5 md:mt-4">
            <a href="#why" className="flex items-center gap-3 bg-[rgba(250,245,235,.08)] border border-[rgba(255,201,60,.3)] rounded-xl p-2.5 px-3 no-underline hover:border-bulb transition min-h-[44px]">
              <img src="/derrick-thumb.jpg" srcSet="/derrick-thumb-256.jpg 256w, /derrick-thumb.jpg 512w" sizes="80px" width="96" height="96" alt="Derrick — Owner of Grounded Power Electric" className="bulb-glow w-14 h-14 sm:w-20 sm:h-20 object-cover object-center rounded-xl shrink-0" />
              <div className="min-w-0"><strong className="text-cream">Meet Derrick, Owner</strong><br /><small className="text-[#cbbd9f] leading-snug block">Grounded Power Electric, LLC • “Rooted in Quality Service”</small></div>
            </a>
            <div className="grid gap-2.5 content-between">
              {[['Licensed Contractor','Bonded & Insured'],['BBB Accredited','Locally Owned & Operated'],['Residential & Commercial','Rental Properties Welcome']].map(([a,b]) => (
                <div key={a} className="bg-white/5 border border-white/10 rounded-[10px] px-4 py-2.5 text-sm sm:text-base"><strong className="text-bulb">{a}</strong> <span className="text-[#d8cbaa] text-sm">• {b}</span></div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-leafdark text-white font-extrabold">
          <div className="max-w-[1120px] mx-auto px-4 sm:px-5 py-2.5 grid grid-cols-2 sm:flex sm:flex-wrap gap-x-4 gap-y-1.5 justify-start sm:justify-between text-[.8rem] sm:text-sm leading-snug">
            <span>✓ Licensed Electrical Contractor</span><span>✓ Bonded &amp; Insured</span><span>✓ BBB Accredited Business</span><span>✓ Locally Owned &amp; Operated</span><span className="hidden md:inline">✓ Residential &amp; Commercial</span>
          </div>
        </section>
        <div className="bg-cream leading-none pt-1.5" aria-hidden="true">
          <svg viewBox="0 0 1200 28" preserveAspectRatio="none" className="w-full h-7 block"><path d="M0 14 Q 60 2 120 14 T 240 14 T 360 14 T 480 14 T 600 14 T 720 14 T 840 14 T 960 14 T 1080 14 T 1200 14" fill="none" stroke="#3B2314" strokeWidth="3" strokeLinecap="round" /><circle cx="150" cy="14" r="4" fill="#4E9B2F" /><circle cx="600" cy="14" r="4" fill="#E9A600" /><circle cx="1050" cy="14" r="4" fill="#4E9B2F" /></svg>
        </div>

        <section className="py-10 md:py-12" id="services">
          <div className="max-w-[1120px] mx-auto px-4 sm:px-5">
            <p className="text-leafdark font-extrabold uppercase tracking-[.12em] text-xs mb-2">What we do</p>
            <h2 className="font-slab font-bold text-[clamp(1.5rem,6vw,2.3rem)] leading-tight text-balance text-bark m-0">Residential &amp; commercial electrical services.</h2>
            <p className="text-[#5c4f3d] text-base sm:text-lg mt-2">Contact us to schedule electrical service or request an estimate. We treat every customer&apos;s home or business with care.</p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-4">
              {SERVICES.map((s) => (
                <div key={s.title} className="bg-[#fffdf6] border border-[#e2d5b8] rounded-[14px] p-4 sm:p-5 shadow-[0_4px_18px_rgba(59,35,20,.08)] flex flex-col min-w-0">
                  <div className="text-3xl">{s.icon}</div>
                  <h3 className="font-slab text-bark text-lg my-2 leading-snug">{s.title}</h3>
                  <p className="text-[#5c4f3d] text-[.95rem] sm:text-base mt-0">{s.text}</p>
                  <ul className="text-sm text-[#5c4f3d] mt-2 mb-3 space-y-1.5">
                    {s.items.map((i) => (
                      <li key={i}>• {i}</li>
                    ))}
                  </ul>
                  <a href="#quote" className="text-leafdark font-bold no-underline mt-auto inline-flex items-center min-h-[44px] py-1">Request an estimate →</a>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-10 md:py-12 bg-night text-cream" id="why">
          <div className="max-w-[1120px] mx-auto px-4 sm:px-5 grid md:grid-cols-[1.2fr_.8fr] gap-6 md:gap-4 items-start">
            <div className="min-w-0">
              <p className="text-bulb font-extrabold uppercase tracking-[.12em] text-xs mb-2">About us</p>
              <h2 className="font-slab font-bold text-[clamp(1.5rem,6vw,2.3rem)] leading-tight text-balance m-0">A locally owned contractor you can depend on.</h2>
              <p className="text-[#d8cbaa] text-[.95rem] sm:text-base">Grounded Power Electric is a locally owned electrical contractor serving homeowners, businesses, property owners, landlords, and contractors throughout the Columbia, South Carolina area. We specialize primarily in residential electrical work while also providing commercial electrical services.</p>
              <p className="text-[#d8cbaa] text-[.95rem] sm:text-base">Our goal is to provide quality electrical work, straightforward communication, and dependable service while treating every customer&apos;s home or business with care.</p>
              <ul className="my-4 space-y-2.5 text-[.95rem] sm:text-base">
                {['Quality workmanship — every job treated with care', 'Straightforward communication — plain explanations', 'Dependable service — during normal business hours', 'Customers we serve — homeowners, landlords, property managers, GCs, builders, remodelers & businesses'].map((t) => (
                  <li key={t} className="pl-7 relative leading-snug"><span className="absolute left-0 text-leaf font-black">✓</span><span dangerouslySetInnerHTML={{ __html: t.replace(/^([^—]+)/, '<strong>$1</strong>') }} /></li>
                ))}
              </ul>
              <div className="grid grid-cols-3 gap-2 sm:gap-6 mt-4 text-center sm:text-left">
                <div><strong className="text-xl sm:text-2xl block text-bulb">Licensed</strong><span className="text-[#b9a888] text-sm">Electrical Contractor</span></div>
                <div><strong className="text-xl sm:text-2xl block text-bulb">BBB</strong><span className="text-[#b9a888] text-sm">Accredited Business</span></div>
                <div><strong className="text-xl sm:text-2xl block text-bulb">Local</strong><span className="text-[#b9a888] text-sm">Owned &amp; Operated</span></div>
              </div>
            </div>
            <div className="bg-cream text-ink rounded-2xl p-4 sm:p-5 text-center border-2 border-bark w-full min-w-0">
              <img src="/derrick-large.jpg" srcSet="/derrick-small.jpg 384w, /derrick-large.jpg 768w" sizes="(max-width: 768px) 100vw, 320px" width="768" height="912" alt="Derrick — Owner, Grounded Power Electric, LLC" className="w-full max-w-[320px] h-[300px] sm:h-[380px] object-cover object-top rounded-2xl border-2 border-bark mx-auto" />
              <h3 className="font-slab text-bark mt-3 mb-1">Derrick</h3>
              <p className="text-sm sm:text-base mt-0">Owner, Grounded Power Electric, LLC<br />“Rooted in Quality Service”</p>
              <a className="inline-flex items-center justify-center w-full sm:w-auto bg-amberbrand text-bark font-bold border-2 border-bark rounded-[10px] px-5 py-3.5 min-h-[52px] hover:bg-bulb transition" href="#quote">Schedule Service →</a>
            </div>
          </div>
        </section>

        <section className="py-10 md:py-12" id="process">
          <div className="max-w-[1120px] mx-auto px-4 sm:px-5">
            <p className="text-leafdark font-extrabold uppercase tracking-[.12em] text-xs mb-2">How it works</p>
            <h2 className="font-slab font-bold text-[clamp(1.5rem,6vw,2.3rem)] leading-tight text-balance text-bark m-0">Schedule service in 3 easy steps.</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-4">
              {[['1','Contact us','Call, or use the form to describe your project. We strive to respond as quickly as possible during normal business hours.'],['2','Schedule an estimate or service','We discuss your project and schedule a visit at a time that works for you.'],['3','Work completed with care','We complete the work, explain what was done, and treat your home or business with care.']].map(([n,t,d]) => (
                <div key={n} className="bg-[#fffdf6] border border-[#e2d5b8] rounded-[14px] p-5 min-w-0">
                  <span className="bg-bark text-bulb w-[34px] h-[34px] grid place-items-center rounded-full font-black mb-2.5 inline-grid">{n}</span>
                  <h3 className="font-slab text-bark mt-0 leading-snug">{t}</h3><p className="text-[#5c4f3d] text-[.95rem] sm:text-base mb-0">{d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-10 md:py-12 bg-cream2" id="work">
          <div className="max-w-[1120px] mx-auto px-4 sm:px-5">
            <p className="text-leafdark font-extrabold uppercase tracking-[.12em] text-xs mb-2">Our work</p>
            <h2 className="font-slab font-bold text-[clamp(1.5rem,6vw,2.3rem)] leading-tight text-balance text-bark m-0">Real jobs, done right.</h2>
            <p className="text-[#5c4f3d] text-[.95rem] sm:text-base">A few recent projects — panel and meter work, lighting and fixtures, receptacles, and commercial installations.</p>
            <div className="grid grid-cols-1 min-[480px]:grid-cols-2 lg:grid-cols-3 gap-3 mt-4">
              {[
                ['/work-panel-meter.jpg', 'Panel & Meter', 'Replacement with clean, labeled wiring'],
                ['/work-chandelier.jpg', 'Chandelier Install', 'Crystal fixture, hung and wired'],
                ['/work-pendant.jpg', 'Pendant Lighting', 'Modern fixture installation'],
                ['/work-outdoor-sconces.jpg', 'Outdoor Lighting', 'Entry sconces flanking new doors'],
                ['/work-floor-outlet.jpg', 'Floor Receptacle', 'Pop-up outlet in finished space'],
                ['/work-commercial-conduit.jpg', 'Commercial Work', 'Disconnects and conduit runs'],
              ].map(([src, a, b]) => (
                <figure key={src} className="rounded-xl overflow-hidden border-2 border-bark bg-[#fffdf6] shadow-[0_4px_18px_rgba(59,35,20,.1)] m-0 min-w-0">
                  <img src={src} alt={`${a} — Grounded Power Electric`} loading="lazy" decoding="async" width="900" height="1200" className="w-full h-48 sm:h-56 object-cover block" />
                  <figcaption className="p-3 text-center font-bold text-bark text-[.95rem] sm:text-base">{a}<br /><small className="font-normal text-[#5c4f3d]">{b}</small></figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        <section className="py-10 md:py-12" id="reviews">
          <div className="max-w-[1120px] mx-auto px-4 sm:px-5">
            <p className="text-leafdark font-extrabold uppercase tracking-[.12em] text-xs mb-2">Reviews</p>
            <h2 className="font-slab font-bold text-[clamp(1.5rem,6vw,2.3rem)] leading-tight text-balance text-bark m-0">Neighbors who&apos;d call us again.</h2>
            <p className="text-[#5c4f3d] text-base sm:text-lg mt-2">Real 5-star reviews from our Google Business listing.</p>
            <div className="grid md:grid-cols-2 gap-3 mt-4">
              {REVIEWS.map((r) => (
                <div key={r.name} className="bg-[#fffdf6] border border-[#e2d5b8] rounded-[14px] p-4 sm:p-5 shadow-[0_4px_18px_rgba(59,35,20,.08)] flex flex-col min-w-0">
                  <p className="text-amberbrand tracking-[2px] m-0">★★★★★</p>
                  <p className="text-[#5c4f3d] flex-1 text-[.95rem] sm:text-base leading-relaxed">“{r.text}”</p>
                  <p className="m-0"><strong className="text-bark">— {r.name}</strong><br /><small className="text-[#8a7d68]">{r.meta}</small></p>
                </div>
              ))}
            </div>
            <p className="text-center mt-5"><a href={GOOGLE_REVIEWS} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center w-full min-[480px]:w-auto bg-amberbrand text-bark font-bold border-2 border-bark rounded-[10px] px-5 py-4 min-h-[52px] hover:bg-bulb transition no-underline text-center">See all reviews / Review us on Google →</a></p>
          </div>
        </section>

        <section className="py-10 md:py-12 bg-night text-cream" id="areas">
          <div className="max-w-[1120px] mx-auto px-4 sm:px-5 grid md:grid-cols-[1.1fr_.9fr] gap-6 md:gap-4 items-center">
            <div className="min-w-0">
              <p className="text-bulb font-extrabold uppercase tracking-[.12em] text-xs mb-2">Service area</p>
              <h2 className="font-slab font-bold text-[clamp(1.5rem,6vw,2.3rem)] leading-tight text-balance m-0">Serving the Midlands of South Carolina.</h2>
              <div className="flex flex-wrap gap-2 my-4">
                {['Irmo','Columbia','West Columbia','Lexington','Chapin','Ballentine'].map((c) => (
                  <span key={c} className="bg-[rgba(255,201,60,.14)] border border-[rgba(255,201,60,.4)] text-[#ffdb7a] px-3.5 py-2 rounded-full font-bold text-sm">{c}</span>
                ))}
              </div>
              <p className="text-[#b9a888] text-[.95rem] sm:text-base">Plus surrounding areas in the Midlands of South Carolina. Contact us to confirm service for your location.</p>
              <p className="text-[.95rem] sm:text-base">📞 <a href={PHONE_HREF} className="text-bulb font-extrabold whitespace-nowrap">{PHONE}</a> <span className="block min-[480px]:inline text-[#b9a888]">• {HOURS}</span></p>
              <p className="text-[#b9a888] text-sm break-all">🌐 {WEBSITE}</p>
            </div>
            <div className="rounded-[14px] overflow-hidden border-2 border-bulb/60 min-h-[220px] w-full min-w-0">
              <iframe
                title="Grounded Power Electric service area — Irmo and the Midlands, SC"
                src="https://www.google.com/maps?ll=34.0834,-81.1848&z=10&q=Irmo,+SC+29063&t=&output=embed"
                className="w-full h-[240px] sm:h-[280px] block border-0"
                loading="lazy"
              />
            </div>
          </div>
        </section>

        <section className="py-10 md:py-12" id="faq">
          <div className="max-w-[760px] mx-auto px-4 sm:px-5">
            <p className="text-leafdark font-extrabold uppercase tracking-[.12em] text-xs mb-2">FAQ</p>
            <h2 className="font-slab font-bold text-[clamp(1.5rem,6vw,2.3rem)] leading-tight text-balance text-bark m-0">Common questions.</h2>
            {FAQS.map((f) => (
              <details key={f.q} open={f.open} className="border border-[#e2d5b8] rounded-xl px-4 py-3.5 my-2 bg-[#fffdf6]">
                <summary className="font-extrabold text-bark min-h-[44px] flex items-center leading-snug">{f.q}</summary>
                <p className="text-[#5c4f3d] text-[.95rem] sm:text-base mb-1">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="py-10 md:py-12" id="quote" style={{ background: 'linear-gradient(180deg,#FAF5EB,#f4e3b8)' }}>
          <div className="max-w-[1120px] mx-auto px-4 sm:px-5 grid md:grid-cols-[.9fr_1.1fr] gap-6 md:gap-4 items-start">
            <div className="min-w-0">
              <p className="text-leafdark font-extrabold uppercase tracking-[.12em] text-xs mb-2">Request an estimate</p>
              <h2 className="font-slab font-bold text-[clamp(1.5rem,6vw,2.3rem)] leading-tight text-balance text-bark m-0">Contact us to schedule electrical service.</h2>
              <p className="text-[#5c4f3d] text-[.95rem] sm:text-base">Tell us about your project — panel work, troubleshooting, lighting, EV charger, generator connection, rewiring, or rental/commercial needs. Photos help.</p>
              <ul className="my-4 space-y-2.5 text-[.95rem] sm:text-base">
                {['Business hours — Monday–Friday, 8 AM–5 PM', 'Response as quickly as possible during business hours', 'Homeowners, landlords, managers, contractors & businesses welcome'].map((t) => (
                  <li key={t} className="pl-7 relative leading-snug"><span className="absolute left-0 text-leaf font-black">✓</span>{t}</li>
                ))}
              </ul>
              <p className="text-[#5c4f3d] text-[.95rem] sm:text-base"><strong>Prefer to talk?</strong> <a href={PHONE_HREF} className="text-leafdark font-bold whitespace-nowrap">{PHONE}</a><br /><a href={`mailto:${EMAIL}`} className="text-leafdark font-bold break-all">✉️ {EMAIL}</a><br /><span className="text-sm">🌐 {WEBSITE}</span></p>
              <div className="grid grid-cols-1 min-[420px]:grid-cols-2 gap-3 mt-4">
                {[['✓ Licensed', 'Electrical Contractor'], ['✓ Bonded & Insured', 'Plus BBB Accredited'], ['🕗 ' + HOURS.split(', ')[0], HOURS.split(', ')[1]], ['📍 Based in', SERVICE_TOWN]].map(([a, b]) => (
                  <div key={a} className="bg-[#fffdf6] border border-[#e2d5b8] rounded-[10px] px-3 py-2.5 min-w-0"><strong className="block text-bark text-sm leading-snug">{a}</strong><span className="text-[#5c4f3d] text-sm">{b}</span></div>
                ))}
              </div>
            </div>
            <MainForm />
          </div>
        </section>
      </main>
      )}

      <footer className="bg-[#170e04] text-[#d8cbaa] pt-8 md:pt-6 pb-32 md:pb-8 border-t-[6px] border-bark">
        <div className="max-w-[1120px] mx-auto px-4 sm:px-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-5 text-center sm:text-left">
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left min-w-0"><img src="/logo.png" alt="Grounded Power Electric — full logo" className="w-full max-w-[240px] sm:max-w-[280px] h-auto bg-cream rounded-[14px] p-2.5 border-2 border-bulb shadow-[0_0_35px_rgba(255,201,60,.2)]" /><p className="mt-2 text-[.95rem]">“Rooted in Quality Service.”<br />Irmo / Columbia, SC • Residential &amp; Commercial</p></div>
          <div className="text-[.95rem] leading-relaxed"><strong className="text-white">Contact</strong><br /><a href={PHONE_HREF} className="text-white font-bold whitespace-nowrap inline-block min-h-[44px] py-1">{PHONE}</a><br /><a href={`mailto:${EMAIL}`} className="text-white break-all">✉️ {EMAIL}</a><br /><span>{WEBSITE}</span><br />Based in {SERVICE_TOWN}<br />{HOURS}</div>
          <div className="text-[.95rem] leading-relaxed"><strong className="text-white">Services</strong><br />Panels &amp; Meters • Troubleshooting<br />Lighting &amp; Fans • EV &amp; Generators<br />Rewiring • Rentals • Commercial</div>
          <div className="text-[.95rem] leading-relaxed"><strong className="text-white">Company</strong><br />Licensed Electrical Contractor<br />Bonded &amp; Insured<br />BBB Accredited Business<br />Locally Owned &amp; Operated</div>
        </div>
        <div className="max-w-[1120px] mx-auto px-4 sm:px-5 mt-5 pt-4 border-t border-[#3a2a15] text-sm text-center sm:text-left">© 2026 Grounded Power Electric, LLC. All rights reserved. • {WEBSITE} • {PHONE} • <a href="#/privacy" className="underline underline-offset-2 hover:text-white">Privacy Policy</a></div>
      </footer>

      <a className="md:hidden fixed left-4 right-4 bg-bark text-bulb text-center px-4 py-4 rounded-[14px] font-black no-underline shadow-[0_10px_30px_rgba(0,0,0,.35)] z-[60] border-2 border-bulb min-h-[56px] inline-flex items-center justify-center" style={{ bottom: 'calc(0.875rem + env(safe-area-inset-bottom))' }} href={PHONE_HREF}>📞 Call {PHONE}</a>
    </div>
  )
}
