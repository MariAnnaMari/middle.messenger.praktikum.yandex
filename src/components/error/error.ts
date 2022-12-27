import Block from 'core/Block';

import './error.css';

interface ErrorProps {
  text?: string;
}

export class Error extends Block {

  protected render(): string {
    // language=hbs
    return `<div class="error">{{#if text}}{{text}}{{/if}}</div>`;
  }
}
