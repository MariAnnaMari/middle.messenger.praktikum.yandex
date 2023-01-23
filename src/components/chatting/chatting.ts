import { Block } from 'core';
import { withRouter } from 'helpers/withRouter';
import { withStore } from 'helpers/withStore';
import { addUserToChat, deleteUserFromChat } from '../../services/chats';

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
  activeChat: number | undefined;
  onClick?: () => void;
  onInput?: () => void;
  addUserToChat?: () => void;
  deleteUserFromChat?: (e: MouseEvent) => void;
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
      addUserToChat: () => this.addUserToChat(),
      deleteUserFromChat: (e: MouseEvent) => this.deleteUserFromChat(e),
      // getUserList: () => this.props.store.getState().chatUsers,
    });
  }

  getMessage(): Nullable<string> {
    return this.refs.inputMessageRef.inputElement.value;
  }

  addUserToChat() {
    const userLogin = this.refs.userLogin.inputElement.value;
    const chatId = this.props.store.getState().params?.id;
    this.props.store.dispatch(addUserToChat, {
      login: userLogin,
      chatId: Number(chatId),
    });
  }

  deleteUserFromChat(e: MouseEvent) {
    const userId = e.target.getAttribute('data-info');
    const chatId = this.props.store.getState().params?.id;
    this.props.store.dispatch(deleteUserFromChat, {
      users: [Number(userId)],
      chatId: Number(chatId),
    });
  }

  onClick() {
    const message: Nullable<string> = this.getMessage();
    if (!this.state?.isSendBtnDisable) {
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
    const chatUsers = this.props.store.getState().chatUsers;
    const me = this.props.store.getState().user;

    // language=hbs
    if (this.props.activeChat) {
      return `
          <div class='msg-container'>
              <div class='msg-header'>
                  <div style="display: flex; gap: 5px;">
                    <div>
                      {{{Avatar name=""}}}
                      <span>${me?.displayName}</span>
                    </div>
                      ${chatUsers
                        ?.filter((item: TUser) => item.id !== me.id)
                        ?.map((item: TUser) => {
                          return `
                          <span>
                            <div class="photo-editing-field">
                                {{{Avatar name=""}}}
                                {{{ButtonIcon icon="fa-trash"  dataInfo="${item.id}" onClick=deleteUserFromChat }}}
                            </div>
                            <span>${item?.displayName}</span>
                          </span>
                          `;
                        })}
                  </div>
                  <div class="input-btn-block">
                      {{{Input ref="userLogin" className="input-search" onInput=onInput type="search" placeholder="Type login..." }}}
                      {{{Button type="btn-grey" onClick=addUserToChat  icon="fa-user-plus"}}}
                  </div>
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
                  <div class="input-btn-block" style="width: 100%">
                    {{{Input ref="inputMessageRef" name="message" onInput=onInput type='search' placeholder='Type...'}}}
                    {{{Button type="btn-grey" onClick=onClick  icon="fa-arrow-right"}}}
                  </div>
              </div>
          </div>
      `;
    } else {
      return `<div class='empty-chat'>Select chat on the left</div>`;
    }
  }
}

export default withRouter(
  withStore(Chatting, (state: AppState) => ({
    user: state.user,
    params: state.params,
    chatUsers: state.chatUsers,
  }))
);
