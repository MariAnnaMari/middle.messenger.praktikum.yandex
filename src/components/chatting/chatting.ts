import Block from 'core/Block';
import { InputProps } from 'components/input/input';

type TMsg = { text: string; isMe?: boolean };

type TChatting = {
  user: {
    shortName: string;
    name: string;
  };
  msgList: TMsg[];
};
interface ChattingProps {
  chatting: TChatting;
  onClick?: () => void;
  onInput?: () => void;
}

export class Chatting extends Block<ChattingProps> {
  static componentName = 'Chatting';
  constructor(props: ChattingProps) {
    super(props);
    this.state = { isSendBtnDisable: true };
    this.setProps({
      ...this.props,
      onInput: () => this.onInput(),
      onClick: () => this.onClick(),
    });
  }

  getMessage(): Nullable<string> {
    return this.refs.inputMessageRef.inputElement.value;
  }

  onClick() {
    const message: Nullable<string> = this.getMessage();
    if (!this.state.isSendBtnDisable) {
      console.log('message', message);
    } else {
      console.log('message is empty');
    }
  }

  onInput() {
    const message: Nullable<string> = this.getMessage();
    if (message && message.length !== 0) {
      this.setState({ isSendBtnDisable: false });
    } else {
      this.setState({ isSendBtnDisable: true });
    }
  }

  render() {
    // language=hbs
    return `
      <div class='msg-container'>
        <div class='msg-header'>
          {{{Avatar name="${this?.props?.chatting?.user?.shortName}"}}}
          <span>${this?.props?.chatting?.user?.name}</span>
          <i class='fa fa-ellipsis-v' aria-hidden='true'></i>
        </div>
        <div class='msg-list'>
            {{#each chatting.msgList}}
                {{#with this}}
                    <div class='msg-item {{#if isMe}}me{{/if}}'>
                        {{text}}
                    </div>
                {{/with}}
            {{/each}}
        </div>
        <div class='msg-input'>
          <i class='fa fa-paperclip size-24' aria-hidden='true'></i>
          {{{Input ref="inputMessageRef" name="message" onInput=onInput type='search' placeholder='Type...'}}}
          {{{Button type="btn-primary send-btn" onClick=onClick  icon="fa-arrow-right"}}}
        </div>
      </div>
    `;
  }
}
