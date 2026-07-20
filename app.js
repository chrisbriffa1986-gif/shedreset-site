<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Accessibility — ShedReset</title>
<meta name="description" content="Accessibility statement for shedreset.com — WCAG 2.2 AA, EN 301 549, EAA.">
<meta name="theme-color" content="#0B0F0D">

<link rel="preload" href="fonts/Fraunces-VF.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="fonts/Inter-VF.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="tokens.css">
<link rel="stylesheet" href="styles.css">

<style>
  .doc { max-width: 720px; margin: 0 auto; padding: var(--space-8) var(--space-3) var(--space-6); }
  .doc h1 { font-family: var(--font-display); font-size: var(--step-5); line-height: 1.05; margin: 0 0 var(--space-3); --wght: 380; --opsz: 96; font-variation-settings: "wght" var(--wght), "opsz" var(--opsz); }
  .doc h1 em { font-style: italic; color: var(--accent); }
  .doc h2 { font-family: var(--font-display); font-size: var(--step-3); font-weight: 500; margin: var(--space-5) 0 var(--space-2); --wght: 500; --opsz: 48; font-variation-settings: "wght" var(--wght), "opsz" var(--opsz); }
  .doc p, .doc li { font-family: var(--font-body); font-size: var(--step-1); line-height: 1.6; color: var(--on-surface-muted); }
  .doc a { color: var(--accent-warm); text-decoration: underline; text-underline-offset: 3px; }
  .doc ul { padding-left: 1.25rem; }
  .meta { font-family: var(--font-body); font-size: 0.78rem; letter-spacing: 0.22em; text-transform: uppercase; color: var(--on-surface-muted); margin-bottom: var(--space-3); }
  .back { display: inline-block; margin-bottom: var(--space-5); font-family: var(--font-body); font-size: 0.82rem; letter-spacing: 0.16em; text-transform: uppercase; color: var(--on-surface-muted); text-decoration: none; }
  .back:hover { color: var(--on-surface); }
</style>
</head>
<body>

<header class="nav" id="top">
  <div class="nav__inner">
    <a class="nav__brand" href="/" aria-label="ShedReset home">
      <svg width="22" height="22" viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <path d="M8 22 Q12 6 16 16 T24 10" stroke="currentColor" stroke-width="1.6" fill="none" stroke-linecap="round"/>
      </svg>
      <span>ShedReset</span>
    </a>
  </div>
</header>

<main class="doc">
  <a href="/" class="back">← Back to home</a>
  <p class="meta">Statement · Published 19 July 2026</p>
  <h1>An <em>accessible</em> quiet.</h1>
  <p>ShedReset is committed to making this website usable by everyone, including people who rely on assistive technology, reduced-motion settings, or non-visual navigation.</p>

  <h2>Standards this site targets</h2>
  <ul>
    <li>Web Content Accessibility Guidelines (WCAG) 2.2, Level AA</li>
    <li>EN 301 549 (harmonised European standard for ICT accessibility)</li>
    <li>The European Accessibility Act (EAA), Directive (EU) 2019/882, applicable from 28 June 2025</li>
  </ul>

  <h2>What we do</h2>
  <ul>
    <li>All animations honour <code>prefers-reduced-motion</code>. If your system requests reduced motion, the site renders in a static keyframe.</li>
    <li>Sound is off by default and only plays after explicit user opt-in via the “Sound” toggle in the header. No audio autoplays.</li>
    <li>Semantic HTML with landmarks (<code>&lt;header&gt;</code>, <code>&lt;main&gt;</code>, <code>&lt;footer&gt;</code>, <code>&lt;nav&gt;</code>) and one <code>&lt;h1&gt;</code> per page.</li>
    <li>Colour contrast meets or exceeds 4.5:1 for body text and 3:1 for large display type against the dark surface.</li>
    <li>Keyboard-only navigation is fully supported. A skip-link jumps to the waitlist. Focus is always visible and non-obscured.</li>
    <li>The site is responsive across viewports from 320 px up. Type scales via <code>clamp()</code>; layout does not require horizontal scrolling.</li>
    <li>Forms have visible labels, autocomplete hints, inline validation, and <code>role="status"</code> live regions for feedback.</li>
    <li>Fonts are self-hosted and preloaded. No third-party CDN is contacted before or during page load.</li>
  </ul>

  <h2>Known limitations</h2>
  <p>The type-craft hero animation uses variable-font weight and optical-size interpolation on first load. This is disabled entirely for users with <code>prefers-reduced-motion: reduce</code>. We do not know of any barrier this causes beyond what is already covered by the reduced-motion path.</p>

  <h2>Feedback</h2>
  <p>If you find something inaccessible, please tell us via the <a href="/#" data-contact-open>contact form</a>. We aim to respond within seven working days.</p>

  <h2>Enforcement</h2>
  <p>If you are unsatisfied with our response, you may contact your national accessibility enforcement body. In Malta, this is the <a href="https://www.crpd.org.mt/" rel="noopener">Commission for the Rights of Persons with Disability (CRPD)</a>.</p>

  <h2>How this statement was prepared</h2>
  <p>This statement was prepared based on a self-assessment carried out on 19 July 2026, covering keyboard navigation, colour contrast, reduced-motion behaviour, screen-reader landmarks (VoiceOver on macOS, NVDA on Windows), and third-party request auditing. The next scheduled review is 19 January 2027.</p>
</main>

<footer class="foot">
  <div class="foot__inner">
    <div>
      <h3>ShedReset</h3>
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/#waitlist">Waitlist</a></li>
        <li><a href="/#" data-contact-open>Contact</a></li>
      </ul>
    </div>
    <div>
      <h3>Legal</h3>
      <ul>
        <li><a href="privacy.html">Privacy</a></li>
        <li><a href="accessibility.html">Accessibility</a></li>
      </ul>
    </div>
    <div>
      <h3>Colophon</h3>
      <ul>
        <li>Fraunces &amp; Inter, self-hosted (SIL OFL 1.1)</li>
      </ul>
    </div>
  </div>
  <div class="foot__bottom">
    <span>© 2026 ShedReset · Malta</span>
  </div>
</footer>

<dialog class="contact" id="contact-dialog" aria-labelledby="contact-title-2">
  <form class="contact__body" id="contactForm" method="dialog" novalidate>
    <h2 id="contact-title-2">Say hello.</h2>
    <p>Questions, press, or partnerships.</p>
    <div class="contact__form">
      <label for="c-email">Email</label>
      <input type="email" id="c-email" name="email" autocomplete="email" required placeholder="your@email.com">
      <label for="c-name">Name (optional)</label>
      <input type="text" id="c-name" name="name" autocomplete="name" placeholder="Your name">
      <label for="c-subject">Subject (optional)</label>
      <input type="text" id="c-subject" name="subject" placeholder="What's this about">
      <label for="c-body">Message</label>
      <textarea id="c-body" name="body" required placeholder="Type here…"></textarea>
      <div class="contact__actions">
        <button type="button" value="cancel" data-contact-close>Cancel</button>
        <button type="submit">Send message</button>
      </div>
      <p class="waitlist__status" id="contactStatus" role="status" aria-live="polite"></p>
    </div>
  </form>
</dialog>

<script src="app.js" defer></script>
</body>
</html>
