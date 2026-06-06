/* ============================================================
   HAURA YOUTHS ENTERPRISES — Main JavaScript
   ============================================================ */

'use strict';

/* ============================================================
   MOBILE NAV TOGGLE
   ============================================================ */
(function initNav() {
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.navbar__links');

  if (!toggle || !links) return;

  toggle.addEventListener('click', () => {
    const isOpen = links.classList.toggle('open');
    toggle.setAttribute('aria-expanded', isOpen);
    toggle.querySelectorAll('span').forEach((bar, i) => {
      bar.style.transform = isOpen
        ? i === 0 ? 'translateY(7px) rotate(45deg)'
          : i === 1 ? 'scaleX(0)' : 'translateY(-7px) rotate(-45deg)'
        : '';
      bar.style.opacity = isOpen && i === 1 ? '0' : '1';
    });
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!toggle.contains(e.target) && !links.contains(e.target)) {
      links.classList.remove('open');
      toggle.setAttribute('aria-expanded', false);
      toggle.querySelectorAll('span').forEach(bar => {
        bar.style.transform = '';
        bar.style.opacity = '1';
      });
    }
  });
})();

/* ============================================================
   SCROLL REVEAL
   ============================================================ */
(function initScrollReveal() {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  els.forEach(el => observer.observe(el));
})();

/* ============================================================
   LAUNDRY LIVE COST CALCULATOR
   ============================================================ */
(function initCalculator() {
  const PRICES = {
    'tshirts':   500,
    'shirts':    500,
    'trousers':  500,
    'jeans':     1000,
    'jackets':   1000,
    'bedsheets': 1000,
  };

  const DELIVERY_FEE = 500;
  const FREE_DELIVERY_THRESHOLD = 10;

  const inputs = document.querySelectorAll('.calc-item__input[data-item]');
  const totalEl = document.getElementById('total-price');
  const deliveryNoteEl = document.getElementById('delivery-note');
  const itemCountEl = document.getElementById('item-count');

  if (!inputs.length || !totalEl) return;

  function formatTSh(amount) {
    return 'TSh ' + amount.toLocaleString('en-TZ');
  }

  function calculate() {
    let subtotal = 0;
    let totalItems = 0;

    inputs.forEach(input => {
      const item = input.dataset.item;
      const qty = Math.max(0, parseInt(input.value, 10) || 0);
      const price = PRICES[item] || 0;
      subtotal += qty * price;
      totalItems += qty;
    });

    const freeDelivery = totalItems > FREE_DELIVERY_THRESHOLD;
    const delivery = totalItems > 0 ? (freeDelivery ? 0 : DELIVERY_FEE) : 0;
    const total = subtotal + delivery;

    totalEl.textContent = formatTSh(total);

    if (itemCountEl) {
      itemCountEl.textContent = totalItems + (totalItems === 1 ? ' piece' : ' pieces');
    }

    if (deliveryNoteEl) {
      if (totalItems === 0) {
        deliveryNoteEl.textContent = 'Enter quantities above';
      } else if (freeDelivery) {
        deliveryNoteEl.textContent = 'Free delivery — over 10 pieces';
        deliveryNoteEl.style.color = '#10b981';
      } else {
        const remaining = FREE_DELIVERY_THRESHOLD - totalItems + 1;
        deliveryNoteEl.textContent = `+TSh 500 delivery · Add ${remaining} more for free`;
        deliveryNoteEl.style.color = '';
      }
    }
  }

  inputs.forEach(input => {
    input.addEventListener('input', calculate);
    // Prevent negative values
    input.addEventListener('change', () => {
      if (parseInt(input.value) < 0) input.value = 0;
    });
  });

  // Run once on load
  calculate();
})();

/* ============================================================
   ACTIVE NAV LINK
   ============================================================ */
(function setActiveNav() {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.navbar__links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === path || (path === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
})();
