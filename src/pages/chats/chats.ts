import { Block, PathRouter, Store } from 'core';
import { withRouter } from 'helpers/withRouter';
import { withStore } from 'helpers/withStore';
import { Params } from 'core/router/PathRouter';
import { logout } from 'services/auth';
import { mockChat } from 'data/mockData';
import { createChat, getChats, getChatUsers } from 'services/chats';
import { TChat } from 'api/types';
import './chats.css';

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
  mockChat: TChat[];
};

export class ChatsPage extends Block<ChatsPageProps> {
  static componentName = 'ChatsPage';
  constructor(props?: ChatsPageProps) {
    super(props);
    this.setProps({
      ...this.props,
      mockChat: mockChat,
      redirectToProfile: (e: MouseEvent) => this.redirectToProfile(e),
      onLogout: (e: MouseEvent) => this.onLogout(e),
      createChat: () => this.createChat(),
    });

    this.props.store.dispatch(getChats);
    const activeChatId = this.props.store.getState().params?.id;

    if (activeChatId) {
      this.setState({ activeChat: this.props.params?.id });
      this.props.store.dispatch(getChatUsers, { id: activeChatId });
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
    console.log('createChat', titleChat);
    this.props.store.dispatch(createChat, {
      title: titleChat,
    });
  }

  render(): string {
    const chats = this.props.store.getState().chatsList;
    const mockChats = this.props?.mockChat;

    // language=hbs
    return `
      {{#Layout title=title fullScreen=true }}
        <div class='chats'>
          <div class='msg-header'>
            {{{Button title="Logout" type="btn-primary" icon="fa-arrow-left" left="true" onClick=onLogout}}}
            <div class="input-btn-block">
                {{{Input ref="titleChat" className="input-search" onInput=onInput type="search" placeholder="Type title..." }}}
                {{{Button type="btn-grey" onClick=createChat icon="fa-plus"}}}
            </div>
            <div class='profile-link'>
                {{{Button title="Profile" type="btn-grey" icon="fa-chevron-right" onClick=redirectToProfile}}}
            </div>
          </div>
            ${chats.map((item: TChat) => {
              return `{{{ChatItem 
              id="${item.id}"
              title="${item.title}"
              text="${
                item.last_message?.content ? item.last_message?.content : ''
              }" 
              time="${item.last_message?.time ? item.last_message?.time : ''}" 
              badge="${item?.unread_count}" 
              }}}`;
            })}
            ${mockChats?.map((item: TChat) => {
              const date =
                item.last_message?.time && new Date(item.last_message?.time);
              const time =
                date && `${date.getUTCHours()}:${date.getUTCMinutes()}`;
              return `{{{ChatItem 
              id="${item.id}"
              title="${item.title}"
              text="${
                item.last_message?.content ? item.last_message?.content : ''
              }" 
              time="${item.last_message?.time ? time : ''}" 
              name="${item.last_message?.user.first_name}"
              badge="${item?.unread_count}" 
              }}}`;
            })}       
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
