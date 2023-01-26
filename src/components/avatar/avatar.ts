import Block from 'core/Block';

import './avatar.css';
import { authAPI } from 'api/auth';

interface AvatarProps {
  src?: string;
  name?: string;
  path?: string;
}

export class Avatar extends Block<AvatarProps> {
  static componentName = 'Avatar';
  constructor(props: AvatarProps) {
    super(props);
    console.log('this.props', this.props);
    if (props.src) {
      this.getAvatar(props.src);
    }
  }

  async getAvatar(path: string): Promise<any> {
    const { responseURL } = await authAPI.getAvatar(path);
    this.setProps({ ...this.props, path: responseURL });
  }

  render() {
    // language=hbs
    return `
      <span class='avatar'>
          {{#if path}} <img class='avatar' alt="avatar" src={{path}} />
          {{/if}}
          {{name}}
      </span>
    `;
  }
}
