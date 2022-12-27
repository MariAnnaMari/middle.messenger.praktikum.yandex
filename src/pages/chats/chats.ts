import Block from 'core/Block';
import Layout from 'components/layout';

import './chats.css';

type ChatsPageProps = {
  title?: string;
  fullScreen?: boolean;
};

export class ChatsPage extends Block<ChatsPageProps> {
  constructor({ fullScreen, ...props }: ChatsPageProps) {
    super(props);
    this.props.fullScreen = true;
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
            {{{ChatItem shortName="GH" name="Greg" isActive="true" text="dsfdf" time="13:34" badge="4"}}}
            {{{ChatItem shortName="LL" name="Lola" text="dsfdfgdfgdf" time="13:54"}}}
        </div>
        <div class='msg-container'>
          <div class='msg-header'>
            {{{Avatar name="МБ"}}}
            <span>Мадам бугенвилияdfdf</span>
            <i class='fa fa-ellipsis-v' aria-hidden='true'></i>
          </div>
          <div class='msg-list'>
            <div class='msg-item'>
              text
            </div>
            <div class='msg-item me'>
              text
            </div>
          </div>
          <div class='msg-input'>
            <i class='fa fa-paperclip size-24' aria-hidden='true'></i>
            {{{Input type='search' placeholder='Type...'}}}
            {{{Button type="btn-primary send-btn" icon="fa-arrow-right"}}}
          </div>
        </div>
      {{/Layout}}
    `;
  }
}
