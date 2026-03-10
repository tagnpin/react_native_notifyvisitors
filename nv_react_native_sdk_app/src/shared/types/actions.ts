// src/shared/types/actions.ts

import { ParamSchema, ParamsDefinition } from './params';

export type PlatformSupport = 'android' | 'ios' | 'all';

export type FeatureActionButton<TPayload = Record<string, any>> = {
  label: string;
  variant?: 'primary' | 'secondary' | 'danger';
  execute: (payload: TPayload) => Promise<any> | void;
};

export type FeatureActionProps<TPayload = Record<string, any>> = {
  key: string;
  title?: string;
  description?: string;

  /** Parameters expected by SDK method */
  //fields?: ActionField[]; // 👈 NEW (instead of params)
  // params?: Record<string, ParamSchema>;
  //params?: Record<keyof TPayload, ParamSchema>;
  params?: ParamsDefinition<TPayload>;
  inputParams?: ParamsDefinition<TPayload>;
  onParamChange?: (param: Record<string, ParamSchema>) => void;

  /** Execution handler */
  execute?: (payload: TPayload) => Promise<any> | void;
  actionButtons?: FeatureActionButton<TPayload>[];

  /** UI hints */
  actionLabel?: string;
  actionBadgeCount?: number;
  showResult?: boolean;
  resultTitle?: string;
  icon?: React.ReactNode | (() => React.ReactNode);
  // icon?: () => React.ReactNode; // ✅ function returning JSX
  iconPosition?: 'left' | 'right';

  /** Platform control */
  platform?: PlatformSupport;
  hiddenOn?: PlatformSupport[];

  /** Layout */
  layout?: 'card' | 'inline';
  accordionDefaultExpanded?: boolean;

  onBeforeExecute?: () => void;
  onAfterExecute?: (result?: any) => void;
};

export type ActionButtonProps = {
  title?: string;
  subtitle?: string;

  onPress: () => void;

  // Icon support
  // icon?: React.ReactNode;
  icon?: React.ReactNode | (() => React.ReactNode);
  iconPosition?: 'left' | 'right';

  // Badge
  badgeCount?: number;

  // Layout
  layout?: 'default' | 'iconOnly';

  // Visual variants
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'row';

  disabled?: boolean;
  fullWidth?: boolean;
};
