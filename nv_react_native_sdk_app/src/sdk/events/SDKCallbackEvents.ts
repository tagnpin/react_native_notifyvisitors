// src/sdk/SDKCallbackEvents.ts

import { SDKEventsEmitter } from './SDKEventsEmitter';

export const SDKCallbackEvents = {
  nvEventSurvey: new SDKEventsEmitter<any>(),
  nvLinkInfo: new SDKEventsEmitter<any>(),
  nvKnownUser: new SDKEventsEmitter<any>(),
};

// export const SDKCallbackEvents = {
//   EVENT_SURVEY_INFO: 'EVENT_SURVEY_INFO',
//   PUSH_TOKEN_UPDATED: 'PUSH_TOKEN_UPDATED',
//   BADGE_UPDATED: 'BADGE_UPDATED',
// } as const;

// export type SDKEventName =
//   (typeof SDKCallbackEvents)[keyof typeof SDKCallbackEvents];
