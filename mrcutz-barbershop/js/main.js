// Off-canvas nav toggle
const hamb = document.querySelector('.hamburger');
const nav  = document.querySelector('#nav-menu');
hamb.addEventListener('click', () => {
  const open = hamb.getAttribute('aria-expanded') === 'true';
  hamb.setAttribute('aria-expanded', String(!open));
  nav.hidden = open;
  nav.classList.toggle('open');
});
// Close nav when clicking outside
document.addEventListener('click', (e) => {
  const isOpen = hamb.getAttribute('aria-expanded') === 'true';
  // If nav is open, and click target is neither the menu nor the hamburger…
  if (isOpen && !nav.contains(e.target) && !hamb.contains(e.target)) {
    hamb.setAttribute('aria-expanded', 'false');
    nav.hidden = true;
    nav.classList.remove('open');
  }
});

// Lazy-load images & sources
document.addEventListener('DOMContentLoaded', () => {
  const els = document.querySelectorAll('img.lazy, source[data-srcset]');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        if (e.target.tagName === 'IMG') {
          const img = e.target;
          img.src = img.dataset.src;
          img.onload = () => img.classList.add('loaded');
        } else {
          e.target.srcset = e.target.dataset.srcset;
        }
        obs.unobserve(e.target);
      });
    });
    els.forEach(el => io.observe(el));
  } else {
    // fallback
    els.forEach(el => {
      if (el.tagName === 'IMG') {
        el.src = el.dataset.src;
        el.onload = () => el.classList.add('loaded');
      } else {
        el.srcset = el.dataset.srcset;
      }
    });
  }
});

// i18n: English ↔ Tamil
const translations = {
  "title":            { en:"Your Barber Shop", ta:"உங்கள் ஷேவர் கடை" },
  "skip":             { en:"Skip to content", ta:"உள்ளடக்கத்துக்கு சீர்" },
  "nav.home":         { en:"Home", ta:"முகப்பு" },
  "nav.about":        { en:"About", ta:"எங்களைப் பற்றி" },
  "nav.services":     { en:"Services", ta:"சேவைகள்" },
  "nav.pricing":      { en:"Pricing", ta:"விலைகள்" },
  "nav.team":         { en:"Team", ta:"அணி" },
  "hero.title":       { en:"Elevate Your Look", ta:"உங்கள் தோற்றத்தை உயர்த்துங்கள்" },
  "hero.subtitle":    { en:"Precision cuts, modern style — every time.", ta:"துல்லியமான வெட்டல்கள், நவீன பாணி — எப்போதும்." },
  "hero.cta":         { en:"Our Services", ta:"எங்கள் சேவைகள்" },
  "about.title":      { en:"About Us", ta:"எங்களைப்பற்றி" },
  "about.text":       { en:"Since 1997, [Your Shop Name] has served [Your City] with classic techniques & today’s trends.", ta:"1997இல் இருந்து, [உங்கள் கடை பெயர்] பாரம்பரிய நுட்பங்களும் இன்றைய போக்குகளும் மூலம் [உங்கள் நகரம்] மக்களுக்கு சேவை வழங்குகிறது." },
  "services.title":   { en:"Our Services", ta:"எங்கள் சேவைகள்" },
  "services.haircut.title": { en:"Expert Haircut", ta:"திறமையான தலைமுடி வெட்டுதல்" },
  "services.haircut.desc":  { en:"₹500 – ₹800: Tailored cuts with scalp massage & styling finish.", ta:"₹500 – ₹800: சரியான வெட்டல்கள், தலையின் மசாஜ் மற்றும் ஸ்டைலிங்." },
  "services.shave.title":   { en:"Straight-Razor Shave", ta:"நேரடித் தேற்ப்டால் புடிகட்டி" },
  "services.shave.desc":    { en:"₹600 – ₹900: Hot-towel prep + precision shave + soothing balm.", ta:"₹600 – ₹900: சூடான துணியுடன் தயாரிப்பு + துல்லியமான புடிகட்டி + சத்தமற்ற பாலம்." },
  "services.beard.title":   { en:"Beard Trim & Color", ta:"தாடி வடிவு மற்றும் நிறம்" },
  "services.beard.desc":    { en:"₹700 – ₹1,000: Shape, trim, and subtle color refresh.", ta:"₹700 – ₹1,000: வடிவமைப்பு, வெட்டு, மெல்லிய நிற புதுப்பிப்பு." },
  "services.spa.title":     { en:"Hair Spa Treatment", ta:"முடி ஸ்பா சிகிச்சை" },
  "services.spa.desc":      { en:"₹1,200: Deep nourishment & revitalization.", ta:"₹1,200: ஆழமான ஊட்டச்சத்து மற்றும் புத்துணர்ச்சி." },
  "services.facial.title":  { en:"Men’s Facial", ta:"ஆண்கள் முக சிகிச்சை" },
  "services.facial.desc":   { en:"₹800: Cleanse, exfoliate & hydrate.", ta:"₹800: சுத்தம், கிளீன்சிங் மற்றும் ஈரப்பதம்." },
  "services.massage.title": { en:"Head & Shoulder Massage", ta:"தலை மற்றும் தோள் மசாஜ்" },
  "services.massage.desc":  { en:"₹500: Relaxation & stress relief.", ta:"₹500: ஓய்வு மற்றும் மன அழுத்தம் குறைப்பு." },
  "pricing.title":    { en:"Pricing Plans", ta:"விலை நிரல்கள்" },
  "pricing.service":  { en:"Service", ta:"சேவை" },
  "pricing.standard": { en:"Standard (₹)", ta:"நிலையானது (₹)" },
  "pricing.premium":  { en:"Premium (₹)", ta:"பிரீமியம் (₹)" },
  "pricing.haircut":  { en:"Adult Haircut", ta:"வயோது தலைமுடி வெட்டுதல்" },
  "pricing.shave":    { en:"Straight-Razor Shave", ta:"நேரடித் தேற்ப்டால் புடிகட்டி" },
  "pricing.beard":    { en:"Beard Trim & Color", ta:"தாடி வடிவு மற்றும் நிறம்" },
  "pricing.spa":      { en:"Hair Spa Treatment", ta:"முடி ஸ்பா சிகிச்சை" },
  "pricing.facial":   { en:"Men’s Facial", ta:"ஆண்கள் முக சிகிச்சை" },
  "pricing.massage":  { en:"Head & Shoulder Massage", ta:"தலை மற்றும் தோள் மசாஜ்" },
  "team.title":       { en:"Meet the Team", ta:"அணியை சந்திக்க" },
  "team.jane.name":   { en:"Jane Doe", ta:"ஜேன் டோ" },
  "team.jane.role":   { en:"Senior Stylist & Color Specialist", ta:"சீனியர் ஸ்டைலிஸ்ட் மற்றும் நிற நிபுணர்" },
  "team.john.name":   { en:"John Smith", ta:"ஜான் ஸ்மித்" },
  "team.john.role":   { en:"Master Barber & Grooming Expert", ta:"மாஸ்டர் ஷேவர் மற்றும் பராமரிப்பு நிபுணர்" },
  "footer.address":   { en:"© 2025 [Your Shop Name] — 123 Main St, [Your City]", ta:"© 2025 [உங்கள் கடை பெயர்] — 123 முக்கிய சாலை, [உங்கள் நகரம்]" },
  "footer.hours":     { en:"Mon–Fri: 9 am–6 pm | Sat: 9 am–2 pm | Closed Sunday", ta:"திங்கள்–வெள்ளி: 9 am–6 pm | சனி: 9 am–2 pm | ஞாயிறு: மூடப்பட்டது" }
};

let currentLang = 'en';
document.getElementById('lang-switch').addEventListener('click', () => {
  currentLang = currentLang === 'en' ? 'ta' : 'en';
  Object.entries(translations).forEach(([key, val]) => {
    document.querySelectorAll(`[data-i18n-key="${key}"]`).forEach(el => {
      el.textContent = val[currentLang];
    });
  });
});

// Initialize English on load
Object.keys(translations).forEach(k => {
  document.querySelectorAll(`[data-i18n-key="${k}"]`).forEach(el => {
    el.textContent = translations[k].en;
  });
});
