import Block from 'core/Block';

import './avatar.css';

interface AvatarProps {
  src?: string;
  name?: string;
}

export class Avatar extends Block<AvatarProps> {
  static componentName = 'Avatar';

  render() {
    // language=hbs
    return `
      <span class='avatar'>
          {{#if src}} <img alt="avatar" src={{src}} />
          {{/if}}
          {{name}}
      </span>
    `;
  }
}
