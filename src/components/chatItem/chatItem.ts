import Block from 'core/Block';

interface ChatItemProps {
  id: number;
  shortName: string;
  name: string;
  text: string;
  time: string;
  badge?: number;
  activeChat?: number | undefined;
  isBadge?: boolean;
}

export class ChatItem extends Block<ChatItemProps> {
  static componentName = 'ChatItem';
  constructor(props: ChatItemProps) {
    super(props);
  }

  render() {
    const isActive = String(this.props.activeChat) === String(this.props.id);
    // language=hbs
    return `
      <div id="{{id}}" class="chats-item ${isActive ? 'active' : ''}">
        <div>
          {{{Avatar name=shortName}}}
        </div>
        <div class='contact'>
          <span class='contact-name'>{{name}}</span>
          <br />
          <span class='contact-msg'>{{text}}</span>
        </div>
        <div class='msg-info'>
          <span class='msg-time'>{{time}}</span>
            {{#if isBadge}}
              <span class='msg-count'>
                <img />{{badge}}
              </span>
            {{/if}}
                      
        </div>
      </div>
    `;
  }
}
