import Block from 'core/Block';

import './button.css';

export interface ButtonProps {
  title: string;
  link?: string;
  icon?: string;
  type?: string;
  onClick?: (e: MouseEvent) => void;
  events?: { click?: () => void };
  left?: boolean;
  dataTestId?: string;
}

export class Button extends Block<ButtonProps> {
  static componentName = 'Button';
  constructor({
    title,
    link,
    icon,
    type,
    onClick,
    left,
    dataTestId,
  }: ButtonProps) {
    super({
      title,
      link,
      icon,
      type,
      left,
      events: { click: onClick },
      dataTestId,
    });
  }
  protected render(): string {
    // language=hbs
    return `
        <button {{#if dataTestId}}data-testid="{{dataTestId}}"{{/if}} class='btn {{type}}' type='submit'>
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
