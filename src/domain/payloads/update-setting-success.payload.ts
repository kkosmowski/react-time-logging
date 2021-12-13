import { SettingsInterface } from '@interfaces/settings.interface';

export interface UpdateSettingSuccessPayload<T = string | number> {
  settingName: keyof SettingsInterface;
  value: T;
}