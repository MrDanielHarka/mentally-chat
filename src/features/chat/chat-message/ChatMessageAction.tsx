import { SuggestedAction, SuggestedActionType } from '../../../state/messages/messageActions';

import './ChatMessageAction.css';

export function ChatMessageAction({ action, handle }: { action: SuggestedAction, handle: (payload: any) => void }) {
  if (action.handled) {
    return null;
  }


  switch (action.type) {
    case SuggestedActionType.ASK_MOOD:
      return (
        <div className="actions select-mood">
          <button onClick={() => handle(0)}>😃</button>
          <button onClick={() => handle(1)}>🙂</button>
          <button onClick={() => handle(2)}>😐</button>
          <button onClick={() => handle(3)}>😕</button>
          <button onClick={() => handle(4)}>😔</button>
        </div>
      );
    case SuggestedActionType.SCHEDULE_APPOINTMENT:
      return (
        <div className="actions">
          <button onClick={() => handle(0)}>Yes</button>
          <button onClick={() => handle(1)}>No</button>
        </div>
      );
  }
}
