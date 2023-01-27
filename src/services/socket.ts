import { Dispatch } from 'core';
import { chatsAPI } from 'api/chats';
import { getChats } from './chats';
import { APIError } from 'api/types';

function checkConnect(socket: WebSocket) {
  console.log('ping');
  socket.send(JSON.stringify({ type: 'ping' }));
}

export const createWebSocket = async (
  dispatch: Dispatch<AppState>,
  state: AppState,
  action: { chatId: number }
) => {
  const chatId = action.chatId;
  const userId = state.user?.id;
  const prevChatSocket = window.store.getState().chatSocket;
  if (prevChatSocket) {
    prevChatSocket.close();
  }

  dispatch({ isLoading: true });
  try {
    const { response } = await chatsAPI.getToken(chatId);
    const token = JSON.parse(response).token;
    // const socket = new WebSocket('wss://ya-praktikum.tech/ws/chats/<USER_ID>/<CHAT_ID>/<TOKEN_VALUE>');

    const socket = new WebSocket(
      `wss://ya-praktikum.tech/ws/chats/${userId}/${chatId}/${token}`
    );

    // повторить checkConnect с интервалом 30 секунды
    const timerId = setInterval(() => checkConnect(socket), 30000);

    socket.addEventListener('open', () => {
      console.log('Соединение установлено');

      dispatch({ chatSocket: socket });

      socket.send(
        JSON.stringify({
          content: '0',
          type: 'get old',
        })
      );
    });

    socket.addEventListener('close', (event) => {
      clearInterval(timerId);

      dispatch({ messages: [] });
      if (event.wasClean) {
        console.log('Соединение закрыто чисто');
      } else {
        console.log('Обрыв соединения');
      }

      console.log(`Код: ${event.code} | Причина: ${event.reason}`);
    });

    socket.addEventListener('message', (event) => {
      console.log('Получены данные от', socket.url);
      console.log('Получены данные', JSON.parse(event.data));
      const data = JSON.parse(event.data);
      if (data.type !== ('pong' || 'user_connect')) {
        const prevMsg = window.store.getState().messages;
        if (data instanceof Array) {
          dispatch({ messages: data });
        } else {
          dispatch({ messages: [data, ...prevMsg] });
        }
      }
      dispatch(getChats);
    });

    socket.addEventListener('error', (event) => {
      console.log('Ошибка', event.message);
    });
  } catch (err: APIError) {
    dispatch({ isLoading: false, loginFormError: JSON.parse(err).reason });
  }
};
