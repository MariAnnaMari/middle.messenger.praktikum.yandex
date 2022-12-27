import Block from 'core/Block';
import { ValidateRuleType } from 'helpers/validateForm';
import ControlledInput from 'components/controlledInput';
import Layout from 'components/layout';

type SignupProps = {
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
  constructor(props: SignupProps) {
    super(props);
    this.state = { validationError: false };
    this.setProps({
      onSubmit: (e) => this.onSubmit(e),
      setErrorValidation: (val) => {
        this.setState({ validationError: val });
      },
      loginValue: '',
      passwordValue: '',
    });
  }

  onSubmit(e: FormDataEvent) {
    e.preventDefault();
    this.setState({ validationError: false });
    let event = new Event('blur');
    const inputList = this._element?.querySelectorAll('input') as NodeList;
    inputList.forEach((item: Node) => {
      item.dispatchEvent(event);
    });
    const isInvalidForm = this.state.validationError;
    const formData = {};
    if (!isInvalidForm) {
      inputList.forEach((item: Node) => {
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
            {{{Button title="Sign in"  type="btn-block" onClick=onSubmit}}}
          </div>
        </form>
      {{/Layout}}
    `;
  }
}
