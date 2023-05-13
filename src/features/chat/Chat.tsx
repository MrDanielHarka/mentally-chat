import { useEffect, useState } from 'react';
import { ChatInputField } from './chat-input-field/ChatInputField';
import { MessageBubble } from './chat-message/ChatMessage';
import { messageService } from '../../http/client';
import { Messages } from 'mentally-server';

import './Chat.css'

export function Chat() {
  const [messages, setMessages] = useState<Messages[]>([]);

  const addMessage = (message: Messages) => {
    setMessages((messages) => {
      if (!messages.find((msg) => msg._id === message._id)) {
        return [...messages, message].sort((a, b) => a.createdAt - b.createdAt);
      }

      return messages;
    });
  };

  useEffect(() => {
    messageService.on('created', (message: Messages) => addMessage(message));
  }, []);

  useEffect(() => {
    messageService.find({ paginate: false }).then((messages: { data: Messages[] }) => {
      setMessages(messages.data.sort((a, b) => a.createdAt - b.createdAt));
    });
  }, []);

  const sendMessage = (text: string) => {
    messageService
      .create({
        text: text,
      })
      .then((message) => addMessage(message));
  };

  return (
    <div className='chat'>
      {messages.map((msg) => (
        <MessageBubble key={msg._id.toString()} message={msg} />
      ))}

      <ChatInputField onSend={sendMessage} />
    </div>
  );
}
