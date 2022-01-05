import { SettingsInterface } from '@interfaces/settings.interface';

export type SettingType = string | number | boolean;

export interface UpdateSettingSuccessPayload<T = SettingType> {
  settingName: keyof SettingsInterface;
  value: T;
}