import Block from 'core/Block';
import { ValidateRuleType } from 'helpers/validateForm';
import ControlledInput from 'components/controlledInput';
import Layout from 'components/layout';

type ProfileProps = {
  onSubmit?: (e: FormDataEvent) => void;
  onInput?: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
  setErrorValidation?: (val: boolean) => void;
  loginValue?: string;
  passwordValue?: string;
  title?: string;
};

export class ProfilePage extends Block<ProfileProps> {
  static componentName = 'ProfilePage';
  constructor(props?: ProfileProps) {
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
    } else {
      console.log('error Validation');
    }
  }

  render(): string {
    // language=hbs
    return `
      {{#Layout title="Setting profile" }}
        <form>
          <div class="photo-editing-field">
            {{{Avatar name="ME"}}}
            <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
          </div>
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
              name="email"
              label="email"
              placeholder="Email"
              type="text"
              validateRule="${ValidateRuleType.Email}"
              setErrorValidation=setErrorValidation
          }}}
          <div class="form-btns">
            {{{Button title="Edit" type="btn-primary  btn-block" onClick=onSubmit}}}
            {{{Button title="Edit password"  type="btn-block" onClick=onSubmit}}}
          </div>
        </form>
      {{/Layout}}
    `;
  }
}
