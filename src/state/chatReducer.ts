import { Messages } from 'mentally-server';
import { messageService } from '../http/client';

export enum ChatActionType {
  SendMessage = 'ADD_MESSAGE',
  ReceiveMessage = 'RECEIVE_MESSAGE',
}

export interface ChatAction {
  type: ChatActionType;
  text: string;
}

export interface ChatState {
  messages: Messages[];
}

export function chatReducer(state: ChatState, action: ChatAction): ChatState {
  const { type, text } = action;
  switch (type) {
    case ChatActionType.ReceiveMessage:
      return {
        ...state,
        messages: [...state.messages, message],
      };
    case ChatActionType.SendMessage:
      messageService.create({
        text: text,
      })

      return state;
  }
}
