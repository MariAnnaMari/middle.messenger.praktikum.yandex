import Block from 'core/Block';

import './controlledInput.css';
import { validateForm, ValidateRuleType } from 'helpers/validateForm';

interface ControlledInputProps {
  onInput?: () => void;
  onFocus?: () => void;
  type?: 'text' | 'password' | 'email';
  placeholder?: string;
  value?: string;
  label?: string;
  name?: string;
  validateRule?: ValidateRuleType;
  setErrorValidation?: (val?: boolean) => void;
}

export class ControlledInput extends Block {
  constructor({ validateRule, ...props }: ControlledInputProps) {
    super({
      ...props,
      onBlur: (e: FocusEvent) => {
        const inputEl = e.target as HTMLInputElement;
        const error = validateForm([
          {
            type: validateRule,
            value: inputEl.value,
          },
        ]);
        this.refs.errorRef.setProps({ text: error });
        if (error.length) {
          props.setErrorValidation(true);
        }
      },
    });
  }

  protected render(): string {
    // language=hbs
    return `
      <div class="controlled-input">
        {{{Input
            onInput=onInput
            onBlur=onBlur
            onFocus=onFocus
            name="{{name}}"
            placeholder="{{placeholder}}"
            type="{{type}}"
        }}}
        {{{Error ref="errorRef" text=error}}}
      </div>
    `;
  }
}
