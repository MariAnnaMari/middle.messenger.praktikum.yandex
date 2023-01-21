import { Block, PathRouter, Store } from 'core';
import { withRouter } from 'helpers/withRouter';
import { withStore } from 'helpers/withStore';
import { Params } from 'core/router/PathRouter';
import { logout } from 'services/auth';

import { chatList } from '../../data/mockData';

import './chats.css';

type TMsg = { text: string; isMe?: boolean };
type TChatting = {
  user: {
    shortName: string;
    name: string;
  };
  msgList: TMsg[];
};

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
  chatting?: TChatting;
  router: PathRouter;
  store: Store<AppState>;
  params: Params;
  redirectToProfile: (e: MouseEvent) => void;
  onLogout: (e: MouseEvent) => void;
};

export class ChatsPage extends Block<ChatsPageProps> {
  static componentName = 'ChatsPage';
  constructor(props?: ChatsPageProps) {
    super(props);
    this.setProps({
      ...this.props,
      chatList: chatList,
      chatting: this.props.store.getState().chatting,
      redirectToProfile: (e: MouseEvent) => this.redirectToProfile(e),
      onLogout: (e: MouseEvent) => this.onLogout(e),
    });
    this.setState({ activeChat: this.props.params?.id });
  }

  redirectToProfile = (e: MouseEvent) => {
    e.preventDefault();
    this.props.router.go('/setting');
  };

  onLogout(e: MouseEvent) {
    e.preventDefault();
    this.props.store.dispatch(logout);
  }

  render(): string {
    // language=hbs
    return `
      {{#Layout title=title fullScreen=true }}
        <div class='chats'>
          <div class='msg-header'>
            {{{Button title="Logout" type="btn-primary" icon="fa-arrow-left" left="true" onClick=onLogout}}}
<!--            {{{Input className="input-search" type="text" placeholder="Search..."}}}-->
            <div class='profile-link'>
                {{{Button title="Profile" type="btn-grey" icon="fa-chevron-right" onClick=redirectToProfile}}}
<!--              {{{Avatar name="РГ"}}}-->
<!--              <span>Profile</span> -->
<!--              {{{Link to="/setting" icon="chevron-right"}}}-->
            </div>
          </div>
            {{#each chatList}}
                {{#with this}}
                     {{{ChatItem activeChat=${this.state.activeChat} id=id shortName=shortName name=name text=text time=time badge=badge isBadge=isBadge }}}
                {{/with}}
            {{/each}}         
        </div>
        {{{Chatting chatting=chatting activeChat=activeChat}}}
      {{/Layout}}
    `;
  }
}
export default withRouter(withStore(ChatsPage));
