import type { AppConfig } from './lib/types';

export const APP_CONFIG_DEFAULTS: AppConfig = {
  companyName: 'Health assistent',
  pageTitle: 'Health assistent',
  pageDescription: 'An AI-powered health assistant to help you with your medical questions.',

  supportsChatInput: true,
  supportsVideoInput: true,
  supportsScreenShare: true,
  isPreConnectBufferEnabled: true,

  logo: '/lk-logo.svg',
  accent: '#f59e0b',
  logoDark: '/lk-logo-dark.svg',
  accentDark: '#fbbf24',
  startButtonText: 'Start Counseling  Call',
};
