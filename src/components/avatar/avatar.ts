import { Block } from 'core';
import { withStore } from 'helpers/withStore';

import './avatar.css';
import { getAvatar } from 'services/auth';

interface AvatarProps {
  id?: number | string;
  src?: string;
  name?: string;
}

export class Avatar extends Block<AvatarProps> {
  static componentName = 'Avatar';
  constructor(props: AvatarProps) {
    super(props);
    if (props.src && props.id) {
      this.props.store.dispatch(getAvatar, { id: props.id, avatar: props.src });
    }
  }

  render() {
    const avatar = this.props.store
      .getState()
      .avatarList?.find((item) => item.id === Number(this.props?.id));
    const img = avatar
      ? `<img class='avatar' alt="avatar" src=${avatar.src} />`
      : '';
    // language=hbs
    return `
      <span class='avatar'>          
          ${img}
          {{name}}
      </span>
    `;
  }
}
export default withStore(Avatar, (state: AppState) => ({
  avatarList: state.avatarList,
}));
