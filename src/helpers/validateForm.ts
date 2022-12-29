export enum ValidateRuleType {
  Login = 'login',
  Password = 'password',
  Email = 'email',
  Name = 'name',
  Required = 'required',
  Phone = 'phone',
}

type ValidateRule = {
  value: string;
  secondValue?: string;
  type: ValidateRuleType;
};

export function validateForm(rules: ValidateRule[]) {
  const errorMsg = [];
  for (let i = 0; i < rules.length; i++) {
    const { type, value } = rules[i];
    if (value === '' || value.length === 0) {
      errorMsg.push('field can not be empty');
      break;
    }
    if (type === ValidateRuleType.Email) {
      const pattern = /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i;
      const isValid = pattern.test(value);
      if (!isValid) {
        errorMsg.push('невалидный email');
        break;
      }
    }
    if (type === ValidateRuleType.Phone) {
      const pattern = /^[\d|+][\d]{10,15}$/i;
      const isValid = pattern.test(value);
      if (!isValid) {
        errorMsg.push(
          'от 10 до 15 символов, состоит из цифр, может начинается с плюса'
        );
        break;
      }
    }
    if (type === ValidateRuleType.Name) {
      const pattern = /^[A-Z|А-Я|Ë][\D]/g;
      const isValid = pattern.test(value);
      if (!isValid) {
        errorMsg.push(
          'латиница или кириллица, первая буква должна быть заглавной, без пробелов и без цифр, нет спецсимволов (допустим только дефис)'
        );
        break;
      }
    }
    if (type === ValidateRuleType.Login) {
      const pattern = /(?=.*[\D])[\w-]{3,20}$/g;
      const isValid = pattern.test(value);
      if (!isValid) {
        errorMsg.push(
          'от 3 до 20 символов, латиница, может содержать цифры, но не состоять из них, без пробелов, без спецсимволов (допустимы дефис и нижнее подчёркивание)'
        );
        break;
      }
    }
    if (type === ValidateRuleType.Password) {
      const re = /(?=.*[A-Z])(?=.*[0-9]){8,40}/g;
      const isValid = re.test(value);
      if (!isValid) {
        errorMsg.push(
          'от 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра.'
        );
        break;
      }
    }
  }

  return errorMsg;
}
