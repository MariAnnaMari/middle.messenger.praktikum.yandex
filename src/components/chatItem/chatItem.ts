import Block from 'core/Block';

interface ChatItemProps {
  shortName: string;
  name: string;
  text: string;
  time: string;
  badge?: string;
  isActive?: boolean;
}

export class ChatItem extends Block {
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
          {{#if badge}}
            <span class='msg-count'>
              <img />{{badge}}
            </span>
          {{/if}}
          
        </div>
      </div>
    `;
  }
}
