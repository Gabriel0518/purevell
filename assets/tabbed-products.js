import { Component } from '@theme/component';

/**
 * Tabbed product list.
 *
 * Switches between collection panels using a horizontal tab bar. Tabs follow the
 * WAI-ARIA tabs pattern: roving tabindex, arrow key navigation, and panels that
 * are hidden rather than removed so their product cards stay rendered.
 *
 * @typedef {object} TabbedProductsRefs
 * @property {HTMLButtonElement[]} tabs - The tab buttons, in panel order
 * @property {HTMLElement[]} panels - The tab panels, in tab order
 *
 * @extends {Component<TabbedProductsRefs>}
 */
export class TabbedProductsComponent extends Component {
  requiredRefs = ['tabs', 'panels'];

  /** @type {AbortController | undefined} */
  controller;

  connectedCallback() {
    super.connectedCallback();

    this.controller = new AbortController();

    for (const [index, tab] of this.refs.tabs.entries()) {
      tab.addEventListener('click', () => this.select(index, false), {
        signal: this.controller.signal,
      });

      tab.addEventListener('keydown', (event) => this.onKeyDown(event, index), {
        signal: this.controller.signal,
      });
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    this.controller?.abort();
    this.controller = undefined;
  }

  /**
   * Handles roving focus and selection from the keyboard.
   *
   * @param {KeyboardEvent} event
   * @param {number} index
   */
  onKeyDown(event, index) {
    const { key } = event;
    const lastIndex = this.refs.tabs.length - 1;

    /** @type {number | null} */
    let nextIndex = null;

    if (key === 'ArrowRight' || key === 'ArrowDown') nextIndex = index === lastIndex ? 0 : index + 1;
    if (key === 'ArrowLeft' || key === 'ArrowUp') nextIndex = index === 0 ? lastIndex : index - 1;
    if (key === 'Home') nextIndex = 0;
    if (key === 'End') nextIndex = lastIndex;

    if (nextIndex === null) return;

    event.preventDefault();
    this.select(nextIndex, true);
  }

  /**
   * Shows the panel at `index` and hides the rest.
   *
   * @param {number} index
   * @param {boolean} moveFocus - Move focus to the selected tab
   */
  select(index, moveFocus) {
    const { tabs, panels } = this.refs;

    for (const [i, tab] of tabs.entries()) {
      const selected = i === index;

      tab.setAttribute('aria-selected', selected ? 'true' : 'false');
      tab.setAttribute('tabindex', selected ? '0' : '-1');

      if (selected && moveFocus) tab.focus();
    }

    for (const [i, panel] of panels.entries()) {
      panel.toggleAttribute('hidden', i !== index);
    }
  }
}

if (!customElements.get('tabbed-products')) {
  customElements.define('tabbed-products', TabbedProductsComponent);
}
