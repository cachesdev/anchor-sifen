import { setGlobalConfig } from 'valibot';
import '@valibot/i18n/es';
setGlobalConfig({ lang: 'es' });

export * from './client';
export * from './qr';
export * from './sifen/types';
export * from './certificate';
export * from './xml-gen';
export * from './xml-sign';
export * from './result';
export * from './gen';
