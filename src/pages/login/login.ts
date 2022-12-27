import Block from 'core/Block';
import { ValidateRuleType } from 'helpers/validateForm';
import ControlledInput from 'components/controlledInput';

type LoginProps = {
  onSubmit?: (e: FormDataEvent) => void;
  onInput?: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
  setErrorValidation?: (val: boolean) => void;
  loginValue?: string;
  passwordValue?: string;
  title?: string;
};

export class LoginPage extends Block<LoginProps> {
  constructor(props: LoginProps) {
    super(props);
    this.state = { validationError: false };
    this.setProps({
      onSubmit: (e: FormDataEvent) => this.onSubmit(e),
      setErrorValidation: (val: boolean) => {
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
      console.log('error validation');
    }
  }

  render() {
    // language=hbs
    return `
      {{#FormLayout title=title }}
        <form>
          {{{ControlledInput
              onInput=onInput
              onFocus=onFocus
              name="login"
              label="login"
              placeholder="login"
              type="text"
              value="${this.props.loginValue}"
              validateRule="${ValidateRuleType.Login}"
              setErrorValidation=setErrorValidation
          }}}
          {{{ControlledInput
              onInput=onInput
              onFocus=onFocus
              name="password"
              label="Password"
              placeholder="Password"
              type="text"
              value="${this.props.loginValue}"
              validateRule="${ValidateRuleType.Password}"
              setErrorValidation=setErrorValidation
          }}}
          <div class="form-btns">
            {{{Button title="Sign in" type="btn-primary  btn-block" onClick=onSubmit}}}
            {{{Button title="Sign up"  type="btn-block" onClick=onSubmit}}}
          </div>
        </form>
      {{/FormLayout}}
    `;
  }
}
