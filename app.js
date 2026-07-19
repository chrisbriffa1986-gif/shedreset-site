/* ============================================================
 * ShedReset v4 — client scaffold
 * - Zero third-party fetches. All font + asset requests are first-party.
 * - Silent by default. Sound only on explicit toggle (WebAudio, no files).
 * - IntersectionObserver reveals manifesto lines.
 * - Cross-origin POST to shedreset.pplx.app for signup + message.
 * - Reduced-motion honoured throughout.
 * ============================================================ */

(function () {
  'use strict';

  var API = 'https://shedreset.pplx.app/port/8000';
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  document.documentElement.classList.remove('no-js');
  document.documentElement.classList.add('js');

  /* ----------- Sound (WebAudio, opt-in) ----------- */
  // No sound file is fetched from anywhere. The click sound is synthesised in
  // the browser via WebAudio when (and only when) the user opts in. This keeps
  // the "zero third-party fetches before consent" invariant true even for audio.
  var audioCtx = null;
  var soundOn = false;
  var soundBtn = document.getElementById('soundtoggle');
  function ping(freq, dur) {
    if (!soundOn || reduced) return;
    try {
      if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      var o = audioCtx.createOscillator();
      var g = audioCtx.createGain();
      o.type = 'sine';
      o.frequency.value = freq;
      g.gain.value = 0;
      o.connect(g).connect(audioCtx.destination);
      var now = audioCtx.currentTime;
      g.gain.setValueAtTime(0, now);
      g.gain.linearRampToValueAtTime(0.05, now + 0.01);
      g.gain.exponentialRampToValueAtTime(0.0001, now + dur);
      o.start(now);
      o.stop(now + dur + 0.02);
    } catch (e) { /* silent */ }
  }
  if (soundBtn) {
    soundBtn.addEventListener('click', function () {
      soundOn = !soundOn;
      soundBtn.setAttribute('aria-pressed', String(soundOn));
      soundBtn.firstElementChild.textContent = 'Sound · ' + (soundOn ? 'on' : 'off');
      if (soundOn) ping(660, 0.18);
    });
  }
  document.addEventListener('click', function (e) {
    var el = e.target.closest && e.target.closest('a, button');
    if (el && soundOn) ping(880, 0.08);
  }, { passive: true });

  /* ----------- Manifesto reveal ----------- */
  var lines = document.querySelectorAll('.manifesto__line[data-reveal]');
  if (lines.length && 'IntersectionObserver' in window && !reduced) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en, i) {
        if (en.isIntersecting) {
          setTimeout(function () { en.target.classList.add('-in'); }, i * 120);
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.35 });
    lines.forEach(function (l) { io.observe(l); });
  } else {
    // reduced-motion or older browser — show static
    lines.forEach(function (l) { l.classList.add('-in'); });
  }

  /* ----------- Signup form ----------- */
  /* Waitlist capture intentionally not wired in v4.
     Board Resolution #009 mandated Path B: the field remains disabled until a
     scoped v4.1 lands with (a) privacy notice, (b) explicit opt-in text, and
     (c) documented erasure path. Until then this section is display-only. */

  /* ----------- Contact dialog ----------- */
  var dlg = document.getElementById('contact-dialog');
  var contactForm = document.getElementById('contactForm');
  var contactStatus = document.getElementById('contactStatus');

  document.querySelectorAll('[data-contact-open]').forEach(function (el) {
    el.addEventListener('click', function (e) {
      e.preventDefault();
      if (dlg && typeof dlg.showModal === 'function') dlg.showModal();
      else if (dlg) dlg.setAttribute('open', 'open');
    });
  });
  document.querySelectorAll('[data-contact-close]').forEach(function (el) {
    el.addEventListener('click', function () {
      if (dlg && typeof dlg.close === 'function') dlg.close();
      else if (dlg) dlg.removeAttribute('open');
    });
  });

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      contactStatus.className = 'waitlist__status';
      contactStatus.textContent = 'Sending…';

      var email = document.getElementById('c-email').value.trim();
      var name = document.getElementById('c-name').value.trim();
      var subject = document.getElementById('c-subject').value.trim();
      var body = document.getElementById('c-body').value.trim();

      if (!email || !body) {
        contactStatus.className = 'waitlist__status -err';
        contactStatus.textContent = 'Email and message are required.';
        return;
      }

      fetch(API + '/api/message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from_email: email,
          from_name: name || null,
          subject: subject || null,
          body: body,
          referrer: location.href
        })
      })
        .then(function (r) { return r.json().then(function (j) { return { ok: r.ok, j: j }; }); })
        .then(function (x) {
          if (x.ok && x.j.ok) {
            contactStatus.className = 'waitlist__status -ok';
            contactStatus.textContent = 'Message sent. We’ll reply soon.';
            contactForm.reset();
            setTimeout(function () { if (dlg && dlg.close) dlg.close(); }, 1200);
          } else {
            contactStatus.className = 'waitlist__status -err';
            contactStatus.textContent = (x.j && x.j.detail) || 'Something went wrong. Please try again.';
          }
        })
        .catch(function () {
          contactStatus.className = 'waitlist__status -err';
          contactStatus.textContent = 'Network error. Please try again.';
        });
    });
  }

})();
