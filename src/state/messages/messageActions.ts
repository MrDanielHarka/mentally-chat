export enum SuggestedActionType {
  SCHEDULE_APPOINTMENT = 'SCHEDULE_APPOINTMENT',
  ASK_MOOD = 'ASK_MOOD',
}

export interface SuggestedAction {
  type: SuggestedActionType;
  handled: boolean;
}

export interface ScheduleAppointmentMessageAction extends SuggestedAction {
  type: SuggestedActionType.SCHEDULE_APPOINTMENT;
  handled: boolean;
  payload: {
    possibleDates: Date[];
  };
}

export interface AskMoodMessageAction extends SuggestedAction {
  type: SuggestedActionType.ASK_MOOD;
  handled: boolean;
}
