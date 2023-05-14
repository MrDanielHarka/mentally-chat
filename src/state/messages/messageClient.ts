import { Message } from './message';

export const fetchMessages = async (): Promise<Message[]> => {
  const response = await fetch('http://localhost:3000/chat');
  return await response.json();
};
