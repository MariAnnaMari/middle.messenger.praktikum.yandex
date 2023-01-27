import { Block, Store } from 'core';
import { withRouter } from 'helpers/withRouter';
import { withStore } from 'helpers/withStore';
import { ValidateRuleType } from 'helpers/validateForm';
import ControlledInput from 'components/controlledInput';
import Layout from 'components/layout';
import { editAvatar, editProfile, logout } from 'services/auth';

type ProfileProps = {
  onSubmit?: (e: FormDataEvent) => void;
  onLogout?: (e: MouseEvent) => void;
  onInput?: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
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
  redirectToEditPassword: (e: MouseEvent) => void;
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
      avatar: userValue.avatar,
    };
    this.setProps({
      ...this.props,
      onLogout: (e: MouseEvent) => this.onLogout(e),
      onSubmit: (e: FormDataEvent) => this.onSubmit(e),
      setErrorValidation: (val: boolean) => {
        this.setState({ validationError: val });
      },
      formValues: defFormValues,
      formError: () => this.props.store.getState().loginFormError,
      redirectToEditPassword: (e: MouseEvent) => this.redirectToEditPassword(e),
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
    const profileData: any = {};
    if (!isInvalidForm) {
      inputList.forEach((item: HTMLInputElement) => {
        if (item.name === 'avatar') {
          if (item.value) {
            const avatarFormData = new FormData();
            avatarFormData.append('avatar', item.files[0]);
            const user = this.props.store.getState().user;
            this.props.store.dispatch(editAvatar, {
              avatarFormData: avatarFormData,
              itemId: user.id,
            });
          }
        } else {
          profileData[`${item.name}`] = item.value;
        }
      });

      console.log('Success', profileData);
      this.props.store.dispatch(editProfile, profileData);
    } else {
      console.log('error Validation');
    }
  }
  onLogout(e: MouseEvent) {
    e.preventDefault();
    this.props.store.dispatch(logout);
  }

  redirectToEditPassword = (e: MouseEvent) => {
    e.preventDefault();
    this.props.router.go('/password');
  };

  render(): string {
    const user = this.props.store.getState().user;
    // language=hbs
    return `
      {{#Layout title="Setting profile" }}
        {{{Button title="Logout"  type="btn-right-top-angle" onClick=onLogout}}}
        <form>        
          <span>
            <div class="photo-editing-field">
              {{{Avatar id="${user?.id}" src="${user?.avatar}"}}}
              <input type="file" id="avatar" name="avatar" accept="image/png, image/jpeg">
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
            {{{Button title="Edit password"  type="btn-block" onClick=redirectToEditPassword}}}
          </div>
            <div id="output"></div>
        </form>
      {{/Layout}}
    `;
  }
}
export default withRouter(withStore(ProfilePage));
