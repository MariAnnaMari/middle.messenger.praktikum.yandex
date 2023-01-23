import { Block, PathRouter, Store } from 'core';
import { ValidateRuleType } from 'helpers/validateForm';
import { withRouter } from 'helpers/withRouter';
import { withStore } from 'helpers/withStore';
import { signup } from 'services/auth';

type SignupProps = {
  onSignIn?: (e: MouseEvent) => void;
  onSubmit?: (e: FormDataEvent) => void;
  onInput?: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
  setErrorValidation?: (val?: boolean) => void;
  formValues: {
    login: string;
    password: string;
    first_name: string;
    second_name: string;
    email: string;
    phone: string;
  };
  formError?: () => string | null;
  router: PathRouter;
  store: Store<AppState>;
};

export class SignupPage extends Block<SignupProps> {
  static componentName = 'SignupPage';
  constructor(props?: SignupProps) {
    super(props);
    console.log('SignupPage')
    this.state = { validationError: false };
    const defFormValues = {
      login: '',
      password: '',
      first_name: '',
      second_name: '',
      email: '',
      phone: '',
    };
    this.setProps({
      ...this.props,
      onSignIn: (e: MouseEvent) => this.onSignIn(e),
      onSubmit: (e: FormDataEvent) => this.onSubmit(e),
      setErrorValidation: (val) => {
        this.setState({ validationError: val });
      },
      formValues: defFormValues,
      formError: () => this.props.store.getState().loginFormError,
    });
  }

  onSignIn = (e: MouseEvent) => {
    e.preventDefault();
    this.props.router.go('/login');
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
      this.setProps({
        ...this.props,
        formValues: formData,
      });
      console.log('formData', formData)
      this.props.store.dispatch(signup, formData);
      console.log('Success', formData);
    } else {
      console.log('error Validation');
    }
  }

  render(): string {
    // language=hbs
    return `
      {{#Layout title="Sign up" }}
        <form>
          {{{ControlledInput
              onInput=onInput
              onFocus=onFocus
              name="email"
              label="email"
              placeholder="Email"
              type="text"
              value="${this.props?.formValues?.email}"
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
              value="${this.props?.formValues?.login}"
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
              value="${this.props?.formValues?.first_name}"
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
              value="${this.props?.formValues?.second_name}"
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
              value="${this.props?.formValues?.phone}"
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
            {{{Error ref="formError" text=formError}}}
        </form>
      {{/Layout}}
    `;
  }
}

export default withRouter(withStore(SignupPage));
