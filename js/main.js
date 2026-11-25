// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    // Close mobile menu if open
    document.querySelector('.nav').classList.remove('nav--open');
  });
});

// Mobile menu toggle
const menuToggle = document.querySelector('.nav__toggle');
const nav = document.querySelector('.nav');
if (menuToggle) {
  menuToggle.addEventListener('click', () => {
    const open = nav.classList.toggle('nav--open');
    menuToggle.setAttribute('aria-expanded', open);
  });
}

// Navbar background on scroll
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('navbar--scrolled');
  } else {
    navbar.classList.remove('navbar--scrolled');
  }
});

// Intersection Observer for scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const queueReveal = (element) => {
  if (element.dataset.revealQueued === 'true') {
    return;
  }

  element.dataset.revealQueued = 'true';

  // Wait until after the next paint so above-the-fold media
  // animates instead of rendering immediately in its final state.
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      element.classList.add('revealed');
    });
  });
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      queueReveal(entry.target);
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Marquee pause on hover
const marquee = document.querySelector('.marquee__track');
if (marquee) {
  marquee.addEventListener('mouseenter', () => {
    marquee.style.animationPlayState = 'paused';
  });
  marquee.addEventListener('mouseleave', () => {
    marquee.style.animationPlayState = 'running';
  });
}

// Hero slideshow
const heroSlideshow = document.querySelector('.hero__slideshow');
if (heroSlideshow) {
  const slides = Array.from(heroSlideshow.querySelectorAll('.hero__slide'));
  const slideshowNav = heroSlideshow.querySelector('.hero__slideshow-nav');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let currentSlide = 0;
  const dots = [];

  if (slideshowNav) {
    slideshowNav.innerHTML = '';

    slides.forEach((_, index) => {
      const dot = document.createElement('span');
      dot.className = 'hero__slideshow-dot';

      if (index === 0) {
        dot.classList.add('hero__slideshow-dot--active');
      }

      slideshowNav.appendChild(dot);
      dots.push(dot);
    });
  }

  const showSlide = (index) => {
    slides.forEach((slide, slideIndex) => {
      slide.classList.toggle('hero__slide--active', slideIndex === index);
    });

    dots.forEach((dot, dotIndex) => {
      dot.classList.toggle('hero__slideshow-dot--active', dotIndex === index);
    });

    currentSlide = index;
  };

  const startSlideshow = () => {
    if (prefersReducedMotion || slides.length < 2) {
      return;
    }

    window.setInterval(() => {
      if (heroSlideshow.dataset.paused === "true") return;
      const nextSlide = (currentSlide + 1) % slides.length;
      showSlide(nextSlide);
    }, 2000);
  };

  showSlide(0);
  startSlideshow();
}

// Scroll progress, scrollspy, slideshow pause (WCAG 2.2.2)
(() => {
  const bar = document.querySelector('.progress');
  const links = [...document.querySelectorAll('.nav__link[href^="#"]')];
  const onScroll = () => {
    const max = document.documentElement.scrollHeight - innerHeight;
    if (bar && max > 0) bar.style.transform = `scaleX(${Math.min(scrollY / max, 1)})`;
    links.forEach(l => {
      const t = document.querySelector(l.getAttribute('href'));
      const r = t && t.getBoundingClientRect();
      l.setAttribute('aria-current', !!r && r.top < innerHeight * .4 && r.bottom > innerHeight * .4);
    });
  };
  addEventListener('scroll', onScroll, { passive: true }); onScroll();
  const show = document.querySelector('.hero__slideshow');
  if (show) {
    const b = document.createElement('button');
    b.className = 'hero__pause'; b.type = 'button'; b.textContent = 'Pause';
    b.setAttribute('aria-label', 'Pause slideshow');
    b.addEventListener('click', () => {
      const p = show.dataset.paused !== 'true';
      show.dataset.paused = p; b.textContent = p ? 'Play' : 'Pause';
      b.setAttribute('aria-label', p ? 'Play slideshow' : 'Pause slideshow');
    });
    show.appendChild(b);
  }
})();

// Close mobile menu on Escape or outside tap
(() => {
  const n = document.querySelector('.nav'), t = document.querySelector('.nav__toggle');
  if (!n || !t) return;
  const close = () => { n.classList.remove('nav--open'); t.setAttribute('aria-expanded', 'false'); };
  addEventListener('keydown', e => { if (e.key === 'Escape') { close(); t.focus(); } });
  document.addEventListener('click', e => { if (!n.contains(e.target) && !t.contains(e.target)) close(); });
})();
