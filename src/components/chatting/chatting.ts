import { Block } from 'core';
import { withRouter } from 'helpers/withRouter';
import { withStore } from 'helpers/withStore';
import { addUserToChat, deleteUserFromChat } from 'services/chats';
import { mockMsgList } from 'data/mockData';
import { TMsg, TUser } from 'api/types';
import { getTimeDateFormat } from '../../helpers/dateFormat';

interface ChattingProps {
  msgList: TMsg[];
  onClick?: () => void;
  onInput?: () => void;
  addUserToChat?: () => void;
  deleteUserFromChat?: (e: MouseEvent) => void;
}

export class Chatting extends Block<ChattingProps> {
  static componentName = 'Chatting';
  constructor(props: ChattingProps) {
    super(props);
    // this.state = { isSendBtnDisable: true };
    this.setProps({
      ...this.props,
      msgList: mockMsgList,
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

  clearMessage(): Nullable<string> {
    this.refs.inputMessageRef.inputElement.value = '';
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
    this.props.store.dispatch(deleteUserFromChat, {
      users: [Number(userId)],
    });
  }

  onClick() {
    const message: Nullable<string> = this.getMessage();
    const socket = this.props.store.getState().chatSocket;
    if (socket && message.length !== 0) {
      socket.send(
        JSON.stringify({
          content: message,
          type: 'message',
        })
      );
    }
    this.clearMessage();
  }

  onInput() {
    console.log('onInput');
  }

  render() {
    const chatUsers = this.props.store.getState().chatUsers;
    const msgList = this.props.msgList;
    const me = this.props.store.getState().user;
    const activeChatId = this.props.store.getState().params?.id;

    // language=hbs
    if (activeChatId) {
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
                  ${msgList?.map((item: TMsg) => {
                    const time = getTimeDateFormat(item?.time);
                    const isMe =
                      me.id === item.user_id ? 'msg-item me' : 'msg-item';
                    return `                      
                          <div class="${isMe}">    
                              <span class="time">${time}</span>                                                   
                              <div class="content">${item.content}</div>
                          </div>
                          `;
                  })}
              </div>
              <div class='msg-input'>
                  <i class='fa fa-paperclip size-24' aria-hidden='true'></i>      
                  {{{Input ref="inputMessageRef" name="message" onInput=onInput type='search' placeholder='Type...'}}}
                  {{{Button type="btn-primary circle-btn" onClick=onClick  icon="fa-arrow-right"}}}
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
