import { Component } from '@theme/component';

/**
 * Editorial hero carousel.
 *
 * Cross-fades between stacked full-bleed screens. Autoplay pauses while the
 * pointer is over the carousel, while anything inside it has focus, when the
 * tab is hidden, and whenever the visitor prefers reduced motion.
 *
 * @typedef {object} PvHeroSliderRefs
 * @property {HTMLElement[]} slides - One element per screen
 * @property {HTMLButtonElement[]} dots - One control per screen
 * @property {HTMLButtonElement} [prev] - Previous arrow, when more than one slide exists
 * @property {HTMLButtonElement} [next] - Next arrow, when more than one slide exists
 *
 * @extends {Component<PvHeroSliderRefs>}
 */
export class PvHeroSliderComponent extends Component {
  requiredRefs = ['slides'];

  /** @type {number} */
  index = 0;

  /** @type {number | undefined} */
  timer;

  /** @type {AbortController | undefined} */
  controller;

  connectedCallback() {
    super.connectedCallback();

    const { slides } = this.refs;
    if (!slides || slides.length < 2) return;

    this.controller = new AbortController();
    const { signal } = this.controller;

    this.refs.prev?.addEventListener('click', () => this.previous(), { signal });
    this.refs.next?.addEventListener('click', () => this.next(), { signal });

    for (const dot of this.refs.dots ?? []) {
      dot.addEventListener('click', () => this.select(Number(dot.dataset.index)), { signal });
    }

    this.addEventListener('keydown', this.handleKeyDown, { signal });
    this.addEventListener('pointerenter', this.pause, { signal });
    this.addEventListener('pointerleave', this.resume, { signal });
    this.addEventListener('focusin', this.pause, { signal });
    this.addEventListener('focusout', this.resume, { signal });

    document.addEventListener(
      'visibilitychange',
      () => (document.hidden ? this.pause() : this.resume()),
      { signal }
    );

    // Lightweight swipe support for touch.
    let startX = 0;
    this.addEventListener(
      'touchstart',
      (event) => {
        startX = event.touches[0]?.clientX ?? 0;
      },
      { signal, passive: true }
    );
    this.addEventListener(
      'touchend',
      (event) => {
        const endX = event.changedTouches[0]?.clientX ?? startX;
        const delta = endX - startX;
        if (Math.abs(delta) < 40) return;
        delta < 0 ? this.next() : this.previous();
      },
      { signal, passive: true }
    );

    this.resume();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.pause();
    this.controller?.abort();
    this.controller = undefined;
  }

  /** @param {KeyboardEvent} event */
  handleKeyDown = (event) => {
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      this.next();
    }
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      this.previous();
    }
  };

  next() {
    this.select(this.index + 1);
  }

  previous() {
    this.select(this.index - 1);
  }

  /** @param {number} rawIndex */
  select(rawIndex) {
    const { slides } = this.refs;
    const count = slides.length;
    if (!count) return;

    const index = ((rawIndex % count) + count) % count;
    if (index === this.index && slides[index].classList.contains('is-active')) {
      this.restart();
      return;
    }

    this.index = index;

    for (const [i, slide] of slides.entries()) {
      const active = i === index;
      slide.classList.toggle('is-active', active);
      slide.toggleAttribute('inert', !active);
      slide.setAttribute('aria-hidden', active ? 'false' : 'true');
    }

    for (const [i, dot] of (this.refs.dots ?? []).entries()) {
      dot.classList.toggle('is-active', i === index);
      dot.setAttribute('aria-selected', i === index ? 'true' : 'false');
    }

    this.restart();
  }

  resume() {
    if (!this.dataset.autoplay || this.dataset.autoplay === 'false') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (document.hidden) return;

    this.clear();
    const speed = Number(this.dataset.autoplaySpeed) || 7;
    this.timer = window.setInterval(() => this.next(), speed * 1000);
  }

  pause = () => {
    this.clear();
  };

  restart() {
    this.clear();
    this.resume();
  }

  clear() {
    if (this.timer !== undefined) {
      window.clearInterval(this.timer);
      this.timer = undefined;
    }
  }
}

if (!customElements.get('pv-hero-slider')) {
  customElements.define('pv-hero-slider', PvHeroSliderComponent);
}
