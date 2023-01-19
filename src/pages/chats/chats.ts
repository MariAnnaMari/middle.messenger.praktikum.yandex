import Block from 'core/Block';

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
  fullScreen?: boolean;
  chatList?: TChatItem[];
  chatting?: TChatting;
};

export class ChatsPage extends Block<ChatsPageProps> {
  static componentName = 'ChatsPage';
  constructor({ fullScreen, ...props }: ChatsPageProps) {
    super(props);
    this.props.fullScreen = true;
    this.props.chatList = chatList;
    this.props.chatting = chatting;
  }

  render(): string {
    // language=hbs
    return `
      {{#Layout title=title fullScreen=${this.props.fullScreen} }}
        <div class='chats'>
          <div class='msg-header'>
            {{{Input className="input-search" type="text" placeholder="Search..."}}}
            <div class='profile-link'>
              {{{Avatar name="РГ"}}}
              <span>Profile</span> 
              {{{Link to="/profile" icon="chevron-right"}}}
            </div>
          </div>
            {{#each chatList}}
                {{#with this}}
                     {{{ChatItem isActive=isActive shortName=shortName name=name text=text time=time badge=badge isBadge=isBadge }}}
                {{/with}}
            {{/each}}         
        </div>
        {{{Chatting chatting=chatting}}}
      {{/Layout}}
    `;
  }
}
