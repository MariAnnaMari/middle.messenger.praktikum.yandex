import Block from 'core/Block';

import './button.css';

interface ButtonProps {
  title: string;
  link?: string;
  icon?: string;
  type?: string;
  onClick?: () => void;
  events?: { click?: () => void };
  left?: boolean;
}

export class Button extends Block<ButtonProps> {
  static componentName = 'Button';
  constructor({ title, link, icon, type, onClick, left }: ButtonProps) {
    super({ title, link, icon, type,left, events: { click: onClick } });
  }
  protected render(): string {
    // language=hbs
    return `
        <button class='btn {{type}}' type='submit'>
            {{#if link}}
                <a href={{link}}>
                    {{title}}
                </a>
            {{else}}
                {{"title"}}
            {{/if}}
            {{#if icon}}
                <i class='{{#if left}}left{{/if}} fa {{icon}}' aria-hidden='true'></i>
            {{/if}}
        </button>
    `;
  }
}
