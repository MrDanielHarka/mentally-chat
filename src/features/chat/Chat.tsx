import { useEffect, useReducer } from 'react';
import { ChatInputField } from './chat-input-field/ChatInputField';
import { ChatMessage } from './chat-message/ChatMessage';

import './Chat.css';
import { ChatStatusBadge } from './chat-status-badge/ChatStatusBadge';
import { ActionType, MessageState, messageReducer } from '../../state/messages/messageReducer';
import { useAuth } from '../../state/auth/authReducer';
import { Socket, io } from 'socket.io-client';
import { fetchMessages } from '../../state/messages/messageClient';
import { Message } from '../../state/messages/message';

const initialState: MessageState = {
  messages: [],
};

const socket: Socket = io('http://localhost:3000');

export function Chat() {
  const [state, dispatch] = useReducer(messageReducer, initialState);
  const auth = useAuth();

  useEffect(() => {
    fetchMessages().then((messages) => {
      dispatch({ type: ActionType.FETCHED_MESSAGES, payload: messages });
    });
  }, []);

  useEffect(() => {
    socket.on('message', (message: Message) => {
      dispatch({
        type: ActionType.RECEIVED_MESSAGE,
        payload: message,
      });
    });
  }, []);

  const sendMessage = async (text: string) => {
    socket.emit('message', { userId: auth.user!.id, text });
  };

  return (
    <div className="chat-container">
      <ChatStatusBadge />

      <div className="chat-messages">
        {state.messages.map((message) => (
          <div>
            <ChatMessage key={message.id} message={message} />
          </div>
        ))}
      </div>

      <ChatInputField onSend={sendMessage} />
    </div>
  );
}
