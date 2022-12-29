import Block from 'core/Block';

import './button.css';

interface ButtonProps {
  title: string;
  link?: string;
  icon?: string;
  type?: string;
  onClick: () => void;
}

export class Button extends Block {
  static componentName = 'Button';
  constructor({ title, link, icon, type, onClick }: ButtonProps) {
    super({ title, link, icon, type, events: { click: onClick } });
  }
  protected render(): string {
    // language=hbs
    return `
      <button class='btn {{type}}' type='submit'>
        {{#if icon}}
          <i class='fa {{icon}}' aria-hidden='true'></i>
        {{/if}}
        {{#if link}}
          <a href={{link}}>
            {{title}}
          </a>
        {{else}}
          {{"title"}}
        {{/if}}
      </button>
    `;
  }
}
