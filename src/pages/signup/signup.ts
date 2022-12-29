import Block from 'core/Block';
import { ValidateRuleType } from 'helpers/validateForm';

type SignupProps = {
  onSignIn?: (e: MouseEvent) => void;
  onSubmit?: (e: FormDataEvent) => void;
  onInput?: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
  setErrorValidation?: (val?: boolean) => void;
  loginValue?: string;
  passwordValue?: string;
  title?: string;
};

export class SignupPage extends Block<SignupProps> {
  static componentName = 'SignupPage';
  constructor(props: SignupProps) {
    super(props);
    this.state = { validationError: false };
    this.setProps({
      onSignIn: (e: MouseEvent) => this.onSignIn(e),
      onSubmit: (e: FormDataEvent) => this.onSubmit(e),
      setErrorValidation: (val) => {
        this.setState({ validationError: val });
      },
      loginValue: '',
      passwordValue: '',
    });
  }

  onSignIn = (e: MouseEvent) => {
    e.preventDefault();
    location.href = '/';
  };

  onSubmit(e: FormDataEvent) {
    e.preventDefault();
    this.setState({ validationError: false });
    const event = new Event('blur');
    const inputList = this._element?.querySelectorAll(
      'input'
    ) as NodeListOf<HTMLInputElement>;
    inputList.forEach((item: HTMLInputElement) => {
      item.dispatchEvent(event);
    });
    const formData: { [key: string]: string } = {};
    if (!this.state.validationError) {
      inputList.forEach((item: HTMLInputElement) => {
        formData[`${item.name}`] = item.value;
      });
      console.log('Success', formData);
    } else {
      console.log('error Validation');
    }
  }

  render(): string {
    // language=hbs
    return `
      {{#Layout title=title }}
        <form>
          {{{ControlledInput
              onInput=onInput
              onFocus=onFocus
              name="email"
              label="email"
              placeholder="Email"
              type="text"
              validateRule="${ValidateRuleType.Email}"
              setErrorValidation=setErrorValidation
          }}}          
          {{{ControlledInput
              onInput=onInput
              onFocus=onFocus
              name="login"
              label="login"
              placeholder="Login"
              type="text"
              validateRule="${ValidateRuleType.Login}"
              setErrorValidation=setErrorValidation
          }}}          
          {{{ControlledInput
              onInput=onInput
              onFocus=onFocus
              name="first_name"
              label="name"
              placeholder="Name"
              type="text"
              validateRule="${ValidateRuleType.Name}"
              setErrorValidation=setErrorValidation
          }}}          
          {{{ControlledInput
              onInput=onInput
              onFocus=onFocus
              name="second_name"
              label="Surname"
              placeholder="Surname"
              type="text"
              validateRule="${ValidateRuleType.Name}"
              setErrorValidation=setErrorValidation
          }}}        
          {{{ControlledInput
              onInput=onInput
              onFocus=onFocus
              name="phone"
              label="Phone"
              placeholder="Phone"
              type="text"
              validateRule="${ValidateRuleType.Phone}"
              setErrorValidation=setErrorValidation
          }}}
          {{{ControlledInput
              onInput=onInput
              onFocus=onFocus
              name="password"
              label="Password"
              placeholder="Password"
              type="text"
              validateRule="${ValidateRuleType.Password}"
              setErrorValidation=setErrorValidation
          }}}
          <div class="form-btns">
            {{{Button title="Sign up" type="btn-primary  btn-block" onClick=onSubmit}}}
            {{{Button title="Sign in"  type="btn-block" onClick=onSignIn}}}
          </div>
        </form>
      {{/Layout}}
    `;
  }
}
