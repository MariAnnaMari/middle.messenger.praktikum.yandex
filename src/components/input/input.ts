import Block from 'core/Block';

import './input.css';

interface InputProps {
  onInput?: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
  type?: 'text' | 'password' | 'email';
  placeholder?: string;
  value?: string;
  name?: string;
  className?: string;
}

export class Input extends Block {
  constructor({ onInput, onFocus, onBlur, ...props }: InputProps) {
    super({
      ...props,
      events: {
        focus: () => onFocus,
        input: onInput,
        blur: onBlur,
      },
    });
  }

  protected render(): string {
    // language=hbs
    return `
        <input class="{{className}}" name="{{name}}" value="{{value}}" type={{type}} placeholder={{placeholder}} />
    `;
  }
}
