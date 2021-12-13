import { SettingsInterface } from '@interfaces/settings.interface';

export interface UpdateSettingSuccessPayload<T = string> {
  settingName: keyof SettingsInterface;
  value: T;
}