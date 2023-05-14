import { useState } from 'react';

import './ChatInputField.css';

export function ChatInputField({ onSend }: { onSend: (message: string) => void }) {
  const [input, setInput] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSend(input);
    setInput('');
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(event.target.value);
  };

  return (
    <form className="chat-input-field" onSubmit={handleSubmit}>
      <textarea autoFocus value={input} placeholder="Start typing..." onChange={handleInputChange} />
      <button type="submit">Send</button>
    </form>
  );
}
