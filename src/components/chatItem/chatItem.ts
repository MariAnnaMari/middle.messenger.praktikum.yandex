import { Block, Store } from 'core';
import { withRouter } from 'helpers/withRouter';
import { withStore } from 'helpers/withStore';
import { Params } from 'core/router/PathRouter';
import { getChatUsers } from 'services/chats';
import { createWebSocket } from '../../services/socket';

interface ChatItemProps {
  store: Store<AppState>;
  params: Params;
  redirectToChat: (e: MouseEvent) => void;
  events?: { click?: () => void };
  id?: number;
  title?: string;
  name?: string;
  text?: string;
  time?: string;
  badge?: number;
}

export class ChatItem extends Block<ChatItemProps> {
  static componentName = 'ChatItem';
  constructor(props: ChatItemProps) {
    super({ ...props });
    this.setProps({ ...this.props, events: { click: this.redirectToChat } });
  }

  redirectToChat = () => {
    this.props.router.go(`/messenger/${this.props.id}`);
    this.props.store.dispatch({ activeChatId: Number(this.props.id) });
    this.props.store.dispatch(getChatUsers);
    this.props.store.dispatch(createWebSocket);
  };

  render() {
    const activeChat = this.props.store.getState().params?.id;
    const isActive = String(activeChat) === String(this.props.id);
    const isBadge = Number(this.props.badge) !== 0;
    // language=hbs
    return `
      <div id="{{id}}" class="chats-item ${isActive ? 'active' : ''}" >
        <div>
          {{{Avatar}}}
        </div>
        <div class='contact'>
          <strong class='contact-name'>${this.props.title}</strong>
          <br />
            <span class='contact-name'>{{name}}</span> <span class='contact-msg'>{{text}}</span>
        </div>
        <div class='msg-info'>
          <span class='msg-time'>{{time}}</span>
            {{#if ${isBadge}}}
              <span class='msg-count'>
                <img />{{badge}}
              </span>
            {{/if}}
                      
        </div>
      </div>
    `;
  }
}

export default withRouter(
  withStore(ChatItem, (state: AppState) => ({
    params: state.params,
  }))
);
