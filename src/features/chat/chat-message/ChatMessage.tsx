import { useAuth, users } from '../../../state/auth/authReducer';
import { Message } from '../../../state/messages/message';

import './ChatMessage.css';

export function ChatMessage({ message }: { message: Message }) {
  const auth = useAuth();

  var className = '';
  if (message.userId == null) {
    className = 'from-bot';
  } else if (auth.user?.id === message.userId) {
    className = 'from-user';
  } else {
    className = 'from-therapist';
  }

  const avatar = message.userId == null ? 'https://cdn.midjourney.com/017d1f0e-f113-44eb-8d45-1aee5d8751ae/0_0.png' : users.find((user) => user.id === message.userId)?.avatar;

  return (
    <div className={`chat-message-container ${className}`}>
      <div className="chat-row">
        <img src={`${avatar}`} alt="Avatar" className="chat-message-avatar" />

        <div className="chat-bubble">
          <p className="chat-text">{message.text}</p>
          <p className="chat-date">{new Date(message.createdAt).toLocaleTimeString()}</p>
        </div>
      </div>
    </div>
  );
}
