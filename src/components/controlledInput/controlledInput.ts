import Block from 'core/Block';

import './controlledInput.css';
import { validateForm, ValidateRuleType } from 'helpers';

interface ControlledInputProps {
  onInput?: () => void;
  onFocus?: () => void;
  onBlur?: (e: FocusEvent) => void;
  type?: 'text' | 'password' | 'email';
  placeholder?: string;
  value?: string;
  label?: string;
  name?: string;
  validateRule?: ValidateRuleType;
  setErrorValidation?: (val?: boolean) => void;
}

export class ControlledInput extends Block<ControlledInputProps> {
  static componentName = 'ControlledInput';
  constructor({ validateRule, ...props }: ControlledInputProps) {
    super({
      ...props,
      onBlur: (e: FocusEvent) => {
        const inputEl = e.target as HTMLInputElement;
        if (validateRule !== undefined) {
          const error = validateForm([
            {
              type: validateRule,
              value: inputEl.value,
            },
          ]);
          this.refs.errorRef.setProps({ text: error });
          if (error.length !== 0) {
            this.props.setErrorValidation &&
            this?.props?.setErrorValidation(true);
          }
        }
      },
    });
  }

  protected render(): string {
    // language=hbs
    return `
        <div class="controlled-input">
            <div class="input-with-label">
                <label>{{placeholder}}</label>
                {{{Input
                        onInput=onInput
                        onBlur=onBlur
                        onFocus=onFocus
                        name="{{name}}"
                        placeholder="{{placeholder}}"
                        type="{{type}}"
                        value=value
                }}}
            </div>
            {{{Error ref="errorRef" text=error}}}
        </div>
    `;
  }
}
