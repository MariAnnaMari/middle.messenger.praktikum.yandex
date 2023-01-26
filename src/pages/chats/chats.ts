import { Block, PathRouter, Store } from 'core';
import { withRouter } from 'helpers/withRouter';
import { withStore } from 'helpers/withStore';
import { Params } from 'core/router/PathRouter';
import { logout } from 'services/auth';
import { createChat, getChats, getChatUsers } from 'services/chats';
import { TChat } from 'api/types';

import './chats.css';
import { getTimeDateFormat } from 'helpers/dateFormat';
import { createWebSocket } from 'services/socket';

type TChatItem = {
  id: number;
  shortName: string;
  name: string;
  text: string;
  badge?: number | string;
  isBadge?: boolean;
  isActive?: boolean;
  date: string;
  time: string;
};

type ChatsPageProps = {
  chatList?: TChatItem[];
  router: PathRouter;
  store: Store<AppState>;
  params: Params;
  redirectToProfile: (e: MouseEvent) => void;
  onLogout: (e: MouseEvent) => void;
  createChat: () => void;
};

export class ChatsPage extends Block<ChatsPageProps> {
  static componentName = 'ChatsPage';
  constructor(props?: ChatsPageProps) {
    super(props);
    this.setProps({
      ...this.props,
      redirectToProfile: (e: MouseEvent) => this.redirectToProfile(e),
      onLogout: (e: MouseEvent) => this.onLogout(e),
      createChat: () => this.createChat(),
    });

    this.props.store.dispatch(getChats);
    const activeChatId = this.props.store.getState().params?.id;

    if (activeChatId) {
      this.setState({ activeChat: this.props.params?.id });
      this.props.store.dispatch({ activeChatId: Number(activeChatId) });
      this.props.store.dispatch(getChatUsers);
      this.props.store.dispatch(createWebSocket, {
        chatId: Number(this.props.params?.id),
      });
    } else {
      this.props.store.dispatch({ activeChatId: null });
    }
  }

  redirectToProfile = (e: MouseEvent) => {
    e.preventDefault();
    this.props.router.go('/setting');
  };

  onLogout(e: MouseEvent) {
    e.preventDefault();
    this.props.store.dispatch(logout);
  }

  createChat() {
    const titleChat = this.refs.titleChat.inputElement.value;
    if (titleChat.length !== 0) {
      this.props.store.dispatch(createChat, {
        title: titleChat,
      });
    }
  }

  render(): string {
    const chats = this.props.store.getState().chatsList;

    // language=hbs
    return `
      {{#Layout title=title fullScreen=true }}
        <div class='chats-left-menu'>
          <div class='chats-left-menu-header'>
            {{{Button title="Logout" type="btn-primary" icon="fa-arrow-left" left="true" onClick=onLogout}}}
            <div class="input-btn-block">
                {{{Input ref="titleChat" className="input-search" onInput=onInput type="search" placeholder="Type title..." }}}
                {{{Button type="btn-grey" onClick=createChat icon="fa-plus"}}}
            </div>
            <div class='profile-link'>
                {{{Button title="Profile" type="btn-grey" icon="fa-chevron-right" onClick=redirectToProfile}}}
            </div>
          </div>
          <div class='chats-left-menu-content'>
            ${chats.map((item: TChat) => {
              const time = getTimeDateFormat(item?.last_message?.time);
              return `{{{ChatItem 
              id="${item.id}"
              title="${item.title}"
              text="${
                item.last_message?.content ? item.last_message?.content : ''
              }" 
              time="${item.last_message?.time ? time : ''}" 
              badge="${item?.unread_count}" 
              }}}`;
            })}
          </div>
        </div>
        {{{Chatting}}}
      {{/Layout}}
    `;
  }
}

export default withRouter(
  withStore(ChatsPage, (state: AppState) => ({
    chatsList: state.chatsList,
    chatUsers: state.chatUsers,
    params: state.params,
  }))
);
