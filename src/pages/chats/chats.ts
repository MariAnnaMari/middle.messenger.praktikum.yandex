import Block from 'core/Block';
import Layout from 'components/layout';

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
              {{{Link to="/" icon="chevron-right"}}}
            </div>
          </div>
          ${this?.props?.chatList?.map((item: TChatItem) => {
            return `                   
                {{{ChatItem  isActive="${item.isActive}" shortName="${item.shortName}" name="${item.name}" text="${item.text}" time="${item.time}" isBadge="${item.isBadge}" badge="${item?.badge}"}}}
                `;
          })}
        </div>
        {{{Chatting chatting=chatting}}}
      {{/Layout}}
    `;
  }
}
