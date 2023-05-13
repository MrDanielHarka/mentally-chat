import { Messages } from 'mentally-server';
import './ChatMessage.css';

export function MessageBubble({ message }: { message: Messages }) {
  return (
    <div className="chat-message">
      <div className="chat-text">
        <p>{message.text}</p>
      </div>
  
      <p className="actions">{message.actions}</p>
    </div>
  );
}
