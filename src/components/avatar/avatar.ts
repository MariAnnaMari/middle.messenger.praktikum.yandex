import Block from 'core/Block';

import './avatar.css';

interface AvatarProps {
  src?: string;
  name?: string;
}

export class Avatar extends Block {
  static componentName = 'Avatar';
  constructor(props: AvatarProps) {
    super({ ...props });
  }

  render() {
    // language=hbs
    return `
      <span class='avatar'>
        <img {{#if src}} src={{src}} {{/if}} />{{name}}
      </span>
    `;
  }
}
