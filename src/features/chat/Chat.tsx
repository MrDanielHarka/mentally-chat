import { useEffect, useReducer, useState } from 'react';
import { ChatInputField } from './chat-input-field/ChatInputField';
import { ChatMessage } from './chat-message/ChatMessage';

import './Chat.css';
import { ActionType, MessageState, messageReducer } from '../../state/messages/messageReducer';
import { useAuth } from '../../state/auth/authReducer';
import { Socket, io } from 'socket.io-client';
import { fetchMessages } from '../../state/messages/messageClient';
import { Message } from '../../state/messages/message';

const initialState: MessageState = {
  messages: [],
};

export function Chat() {
  const auth = useAuth();
  const [socket, setSocket] = useState<Socket | null>(null);
  
  const [state, dispatch] = useReducer(messageReducer, initialState);

  useEffect(() => {
    fetchMessages().then((messages) => {
      dispatch({ type: ActionType.FETCHED_MESSAGES, payload: messages });
    });

    setSocket(io('http://localhost:3000', { auth: { email: auth.user?.email } }));
  }, [auth]);

  useEffect(() => {
    socket?.on('message', (message: Message) => {
      dispatch({
        type: ActionType.RECEIVED_MESSAGE,
        payload: message,
      });
    });
  }, [socket]);

  const sendMessage = async (text: string) => {
    socket?.emit('message', { text });
  };

  return (
    <div className="chat-container">
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
