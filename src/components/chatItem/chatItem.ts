import Block from 'core/Block';

interface ChatItemProps {
  shortName: string;
  name: string;
  text: string;
  time: string;
  badge?: number;
  isBadge?: boolean;
  isActive?: boolean;
}

export class ChatItem extends Block {
  static componentName = 'ChatItem';
  constructor(props: ChatItemProps) {
    super({ ...props });
  }

  render() {
    // language=hbs
    return `
      <div class='chats-item {{#if isActive}}active{{/if}}'>
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
                <img alt="badge" />{{badge}}
              </span>
            {{/if}}
                      
        </div>
      </div>
    `;
  }
}
