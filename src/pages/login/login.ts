import { Block, PathRouter, Store } from 'core';
import { ValidateRuleType } from 'helpers/validateForm';
import ControlledInput from 'components/controlledInput';
import Layout from 'components/layout';
import { withRouter } from 'helpers/withRouter';
import { withStore } from 'helpers/withStore';
import { Params } from 'core/router/PathRouter';

type LoginProps = {
  onSignUp?: (e: MouseEvent) => void;
  onSubmit?: (e: FormDataEvent) => void;
  onInput?: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
  setErrorValidation?: (val: boolean) => void;
  loginValue?: string;
  passwordValue?: string;
  router: PathRouter;
  store: Store<AppState>;
  params: Params;
};

export class LoginPage extends Block<LoginProps> {
  static componentName = 'LoginPage';
  constructor(props?: LoginProps) {
    super(props);
    this.state = { validationError: false };
    this.setProps({
      ...this.props,
      onSignUp: (e: MouseEvent) => this.onSignUp(e),
      onSubmit: (e: FormDataEvent) => this.onSubmit(e),
      setErrorValidation: (val: boolean) => {
        this.setState({ validationError: val });
      },
      loginValue: '',
      passwordValue: '',
    });
  }

  onSignUp = (e: MouseEvent) => {
    e.preventDefault();
    // this.props.router.go('/sign-up');
    this.props.router.go('/login/12');
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
    const formData: any = {};
    if (!this.state.validationError) {
      inputList.forEach((item: HTMLInputElement) => {
        formData[`${item.name}`] = item.value;
      });
      console.log('Success', formData);
      this.props.router.go('/messenger');
    } else {
      console.log('error validation');
    }
  }

  render(): string {
    // language=hbs
    return `
      {{#Layout title="Login" }}
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
            {{{Button title="Sign up"  type="btn-block" onClick=onSignUp}}}
          </div>
        </form>
      {{/Layout}}
    `;
  }
}
export default withRouter(withStore(LoginPage));
