import Block from 'core/Block';

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

export class Chatting extends Block {
  constructor(props: ChattingProps) {
    super(props);
    this.state = { isSendBtnDisable: true };
    this.setProps({
      onInput: () => this.onInput(),
      onClick: () => this.onClick(),
    });
  }

  onClick() {
    const { inputMessageRef }: any = this.refs;
    const message: string = inputMessageRef?._element?.value;
    if (!this.state.isSendBtnDisable) {
      console.log('message', message);
    } else {
      console.log('message is empty');
    }
  }

  onInput() {
    const { inputMessageRef }: any = this.refs;
    const message: string = inputMessageRef?._element?.value;
    if (message.length !== 0) {
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
          ${this?.props?.chatting?.msgList?.map(
            (item: TMsg) => `
                    <div class='msg-item ${item?.isMe === true ? 'me' : ''}'>
                        ${item.text}
                    </div>
                   `
          )}
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
