import { Block } from 'core';

import './buttonIcon.css';

interface ButtonIconProps {
  icon?: string;
  dataInfo?: string;
  onClick?: () => void;
  events?: { click?: () => void };
}

export class ButtonIcon extends Block<ButtonIconProps> {
  static componentName = 'ButtonIcon';
  constructor({ icon, dataInfo, onClick }: ButtonIconProps) {
    super({ icon, dataInfo, events: { click: onClick } });
  }
  protected render(): string {
    // language=hbs
    return `
        <i class="fa {{icon}}" data-info="{{dataInfo}}" aria-hidden="true" onclick=onClick ></i>
    `;
  }
}
