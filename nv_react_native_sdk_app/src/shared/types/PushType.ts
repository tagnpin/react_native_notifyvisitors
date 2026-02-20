type AndroidPushType =
  | 'standardPushNID'
  | 'stdPushWithActionNID'
  | 'richPushNID'
  | 'gifPushNID'
  | 'sliderPushNID'
  | 'crouselPushNID';

type IOSPushType =
  | 'standardPushNID'
  | 'stdPushWithActionNID'
  | 'richPushNID'
  | 'audioPushNID'
  | 'videoPushNID';

type PushType = AndroidPushType | IOSPushType;
