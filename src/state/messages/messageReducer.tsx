import { Message } from './message';

export enum ActionType {
  FETCHED_MESSAGES = 'FETCHED_MESSAGES',
  RECEIVED_MESSAGE = 'RECEIVED_MESSAGE',
}

export type Action =
  | { type: ActionType.RECEIVED_MESSAGE; payload: Message }
  | { type: ActionType.FETCHED_MESSAGES; payload: Message[] }

export interface MessageState {
  messages: Message[];
}

export function messageReducer(state: MessageState, action: Action): MessageState {
  switch (action.type) {
    case ActionType.RECEIVED_MESSAGE:
      const newMessage = action.payload;

      // It can happen that we receive the same message twice
      if (state.messages.find((m) => m.id === newMessage.id)) {
        return state;
      }

      const updatedMessages = [...state.messages, newMessage].sort(
        (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );

      return { ...state, messages: updatedMessages };
    case ActionType.FETCHED_MESSAGES: {
      const loadedMessages = action.payload;

      const messages = loadedMessages.sort(
        (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
      return { ...state, messages: messages };
    }
  }
}
