// Mobile nav
const btn = document.getElementById('menuBtn');
const nav = document.getElementById('nav');
if (btn && nav) btn.addEventListener('click', () => nav.classList.toggle('open'));

// Fake submit -> success (replace with Formspree / Netlify Forms for live site)
function wireForm(id) {
  const f = document.getElementById(id);
  if (!f) return;
  f.addEventListener('submit', (e) => {
    e.preventDefault();
    const ok = f.parentElement.querySelector('.form-success') || f.querySelector('.form-success');
    // basic validation already handled by required attributes
    const data = Object.fromEntries(new FormData(f).entries());
    console.log('Quote request:', data); // <-- hook this to email / CRM
    if (ok) ok.hidden = false;
    f.querySelector('button[type=submit]').textContent = 'Sent ✓';
    // TODO LIVE: POST to Formspree:
    // fetch('https://formspree.io/f/YOUR_ID', {method:'POST', headers:{'Accept':'application/json'}, body:new FormData(f)})
  });
}
wireForm('quickForm');
wireForm('mainForm');

// Sticky header shadow
const header = document.getElementById('header');
addEventListener('scroll', () => {
  header.style.boxShadow = scrollY > 10 ? '0 6px 24px rgba(0,0,0,.08)' : 'none';
}, {passive:true});
