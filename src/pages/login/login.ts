import { Block, PathRouter, Store } from 'core';
import { ValidateRuleType } from 'helpers/validateForm';
import ControlledInput from 'components/controlledInput';
import Layout from 'components/layout';
import { withRouter } from 'helpers/withRouter';
import { withStore } from 'helpers/withStore';
import { Params } from 'core/router/PathRouter';
import { login } from 'services/auth';

type LoginProps = {
  onSignUp?: (e: MouseEvent) => void;
  onSubmit?: (e: FormDataEvent) => void;
  onInput?: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
  setErrorValidation?: (val: boolean) => void;
  router: PathRouter;
  store: Store<AppState>;
  params: Params;
  formError?: () => string | null;
  formValues: { login: string; password: string };
};

export class LoginPage extends Block<LoginProps> {
  static componentName = 'LoginPage';
  constructor(props?: LoginProps) {
    super(props);
    this.state = { validationError: false };
    const defFormValues = { login: '', password: '' };
    this.setProps({
      ...this.props,
      onSignUp: (e: MouseEvent) => this.onSignUp(e),
      onSubmit: (e: FormDataEvent) => this.onSubmit(e),
      setErrorValidation: (val: boolean) => {
        this.setState({ validationError: val });
      },
      formValues: defFormValues,
      formError: () => this.props.store.getState().loginFormError,
    });
  }

  onSignUp = (e: MouseEvent) => {
    e.preventDefault();
    this.props.router.go('/sign-up');
    // this.props.store.dispatch(login, { login: 'mari', password: 'mari' });
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
      this.setProps({
        ...this.props,
        formValues: formData,
      });
      this.props.store.dispatch(login, formData);
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
              label="Login"
              placeholder="Login"
              type="text"
              value="${this.props?.formValues?.login}"
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
              value="${this.props?.formValues?.password}"
              validateRule="${ValidateRuleType.Password}"
              setErrorValidation=setErrorValidation
          }}}
          <div class="form-btns">
            {{{Button title="Sign in" type="btn-primary  btn-block" onClick=onSubmit}}}
            {{{Button title="Sign up"  type="btn-block" onClick=onSignUp}}}
          </div>
            {{{Error ref="formError" text=formError}}}
        </form>
      {{/Layout}}
    `;
  }
}
export default withRouter(withStore(LoginPage));
