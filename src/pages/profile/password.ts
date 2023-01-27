import { Block, PathRouter, Store } from 'core';
import { ValidateRuleType } from 'helpers/validateForm';
import ControlledInput from 'components/controlledInput';
import Layout from 'components/layout';
import { withRouter } from 'helpers/withRouter';
import { withStore } from 'helpers/withStore';
import { Params } from 'core/router/PathRouter';
import { editPassword } from 'services/auth';

type LoginProps = {
  redirectToProfile?: (e: MouseEvent) => void;
  onSubmit?: (e: FormDataEvent) => void;
  onInput?: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
  setErrorValidation?: (val: boolean) => void;
  router: PathRouter;
  store: Store<AppState>;
  params: Params;
  formError?: () => string | null;
  formValues: { oldPassword: string; newPassword: string };
};

export class EditPasswordPage extends Block<LoginProps> {
  static componentName = 'EditPasswordPage';
  constructor(props?: LoginProps) {
    super(props);
    this.state = { validationError: false };
    const defFormValues = { oldPassword: '', newPassword: '' };
    this.setProps({
      ...this.props,
      redirectToProfile: (e: MouseEvent) => this.redirectToProfile(e),
      onSubmit: (e: FormDataEvent) => this.onSubmit(e),
      setErrorValidation: (val: boolean) => {
        this.setState({ validationError: val });
      },
      formValues: defFormValues,
      formError: () => this.props.store.getState().loginFormError,
    });
  }

  redirectToProfile = (e: MouseEvent) => {
    e.preventDefault();
    this.props.router.go('/setting');
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
        formData[item.name] = item.value;
      });
      console.log('Success', formData);
      this.setProps({
        ...this.props,
        formValues: formData,
      });
      this.props.store.dispatch(editPassword, formData);
    } else {
      console.log('error validation');
    }
  }

  render(): string {
    // language=hbs
    return `
      {{#Layout title="Edit password" }}
        <form>
          {{{ControlledInput
              onInput=onInput
              onFocus=onFocus
              name="oldPassword"
              label="Old password"
              placeholder="Old password"
              type="text"
              value="${this.props?.formValues?.oldPassword}"
              validateRule="${ValidateRuleType.Password}"
              setErrorValidation=setErrorValidation
          }}}          
            {{{ControlledInput
              onInput=onInput
              onFocus=onFocus
              name="newPassword"
              label="New password"
              placeholder="New password"
              type="text"
              value="${this.props?.formValues?.newPassword}"
              validateRule="${ValidateRuleType.Password}"
              setErrorValidation=setErrorValidation
          }}}
          <div class="form-btns">
            {{{Button title="Edit" type="btn-primary  btn-block" onClick=onSubmit}}}
            {{{Button title="Back to profile"  type="btn-block" onClick=redirectToProfile}}}
          </div>
            {{{Error ref="formError" text=formError}}}
        </form>
      {{/Layout}}
    `;
  }
}
export default withRouter(
  withStore(EditPasswordPage, (state: AppState) => ({
    loginFormError: state.loginFormError,
  }))
);
