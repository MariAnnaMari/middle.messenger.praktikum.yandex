import { Block, Store } from 'core';
import { withRouter } from 'helpers/withRouter';
import { withStore } from 'helpers/withStore';
import { ValidateRuleType } from 'helpers/validateForm';
import ControlledInput from 'components/controlledInput';
import Layout from 'components/layout';
import { editProfile, login, logout, signup } from 'services/auth';

type ProfileProps = {
  onSubmit?: (e: FormDataEvent) => void;
  onLogout?: (e: MouseEvent) => void;
  onInput?: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
  changeAvatar?: () => void;
  setErrorValidation?: (val: boolean) => void;
  formValues: {
    login: string;
    first_name: string;
    second_name: string;
    display_name: string;
    email: string;
    phone: string;
  };
  formError?: () => string | null;
  title?: string;
  store: Store<AppState>;
};

export class ProfilePage extends Block<ProfileProps> {
  static componentName = 'ProfilePage';
  constructor(props?: ProfileProps) {
    super(props);
    const userValue = this.props.store.getState().user;
    this.state = { validationError: false };
    const defFormValues = {
      login: userValue.login,
      display_name: userValue.displayName,
      first_name: userValue.firstName,
      second_name: userValue.secondName,
      email: userValue.email,
      phone: userValue.phone,
    };
    this.setProps({
      ...this.props,
      changeAvatar: () => this.changeAvatar(),
      onLogout: (e: MouseEvent) => this.onLogout(e),
      onSubmit: (e: FormDataEvent) => this.onSubmit(e),
      setErrorValidation: (val: boolean) => {
        this.setState({ validationError: val });
      },
      formValues: defFormValues,
      formError: () => this.props.store.getState().loginFormError,
    });
  }

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
    const isInvalidForm = this.state.validationError;
    const formData: any = {};
    if (!isInvalidForm) {
      inputList.forEach((item: HTMLInputElement) => {
        formData[`${item.name}`] = item.value;
      });
      console.log('Success', formData);
      this.props.store.dispatch(editProfile, formData);
    } else {
      console.log('error Validation');
    }
  }
  onLogout(e: MouseEvent) {
    e.preventDefault();
    this.props.store.dispatch(logout);
  }

  changeAvatar() {
    console.log('changeAvatar');
  }

  render(): string {
    console.log('render profile');
    // language=hbs
    return `
      {{#Layout title="Setting profile" }}
        <form>        
          <span>
            <div class="photo-editing-field">
                {{{Avatar name=""}}}
                {{{ButtonIcon icon="fa-pencil-square-o"  dataInfo="" onClick=changeAvatar }}}
            </div>
          </span>
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
              name="display_name"
              label="Display name"
              placeholder="Display name"
              type="text"
              value="${this.props?.formValues?.display_name}"
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
              name="email"
              label="email"
              placeholder="Email"
              type="text"
              value="${this.props?.formValues?.email}"
              validateRule="${ValidateRuleType.Email}"
              setErrorValidation=setErrorValidation
          }}}
          <div class="form-btns">
            {{{Button title="Edit" type="btn-primary  btn-block" onClick=onSubmit}}}
<!--            {{{Button title="Edit password"  type="btn-block" onClick=onSubmit}}}-->
            {{{Button title="Logout"  type="btn-block" onClick=onLogout}}}
          </div>
        </form>
      {{/Layout}}
    `;
  }
}
export default withStore(ProfilePage);
