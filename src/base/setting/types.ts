export interface SelectSetting {
  id: string;
  label: string;
  description?: string;
  renderer: 'select';
  options: { label: string; value: string }[];
  defaultValue: string;
  onAction: (value: string) => void;
}

export interface MultiSelectSetting {
  id: string;
  label: string;
  description?: string;
  renderer: 'multiSelect';
  options: { label: string; value: string }[];
  defaultValue: string[];
  onAction: (value: string[]) => void;
}

export type SettingEntry = SelectSetting | MultiSelectSetting;
