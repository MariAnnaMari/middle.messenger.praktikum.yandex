import { Block, PathRouter, Store } from 'core';
import { withRouter } from 'helpers/withRouter';
import { withStore } from 'helpers/withStore';
import { Params } from 'core/router/PathRouter';

import { chatting, chatList } from '../../data/mockData';

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
};

export class ChatsPage extends Block<ChatsPageProps> {
  static componentName = 'ChatsPage';
  constructor(props?: ChatsPageProps) {
    super(props);
    this.setProps({
      ...this.props,
      chatList: chatList,
      chatting: this.props.store.getState().chatting,
    });
    this.setState({ activeChat: this.props.params?.id });
  }

  render(): string {
    // language=hbs
    return `
      {{#Layout title=title fullScreen=true }}
        <div class='chats'>
          <div class='msg-header'>
            {{{Input className="input-search" type="text" placeholder="Search..."}}}
            <div class='profile-link'>
              {{{Avatar name="РГ"}}}
              <span>Profile</span> 
              {{{Link to="/setting" icon="chevron-right"}}}
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
