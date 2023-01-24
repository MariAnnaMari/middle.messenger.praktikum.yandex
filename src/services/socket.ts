import { Dispatch } from 'core';
import { chatsAPI } from 'api/chats';

export const createWebSocket = async (
  dispatch: Dispatch<AppState>,
  state: AppState
) => {
  const chatId = state.activeChatId;
  const userId = state.user?.id;
  const prevChatSocket = state.chatSocket;
  console.log('prevChatSocket', prevChatSocket);
  if (prevChatSocket) {
    prevChatSocket.close();
  }
  dispatch({ isLoading: true });

  const { response, status } = await chatsAPI.getToken(chatId);

  if (status !== 200) {
    dispatch({ isLoading: false, loginFormError: JSON.parse(response).reason });
    return;
  }

  const token = JSON.parse(response).token;

  console.log('getToken', JSON.parse(response));
  // const socket = new WebSocket('wss://ya-praktikum.tech/ws/chats/<USER_ID>/<CHAT_ID>/<TOKEN_VALUE>');

  const socket = new WebSocket(
    `wss://ya-praktikum.tech/ws/chats/${userId}/${chatId}/${token}`
  );
  socket.addEventListener('open', () => {
    console.log('Соединение установлено');

    // socket.send(
    //   JSON.stringify({
    //     content: 'Моё первое сообщение миру!',
    //     type: 'message',
    //   })
    // );
  });

  socket.addEventListener('close', (event) => {
    if (event.wasClean) {
      console.log('Соединение закрыто чисто');
    } else {
      console.log('Обрыв соединения');
    }

    console.log(`Код: ${event.code} | Причина: ${event.reason}`);
  });

  socket.addEventListener('message', (event) => {
    console.log('Получены данные', event.data);
  });

  socket.addEventListener('error', (event) => {
    console.log('Ошибка', event.message);
  });
  // window.socket = socket;
  dispatch({ chatSocket: socket });
};

export const closeWebSocket = (dispatch: Dispatch<AppState>) => {
  // const socket = window.socket;
  // socket.close();
};
