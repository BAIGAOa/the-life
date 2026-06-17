import { ComponentType } from "react";

export interface SelectSetting {
  id: string;
  label: string;
  component?: ComponentType<any>;
  description?: string;
  options?: { label: string; value: string }[];
  defaultValue?: string;
  onAction?: (value: string) => void;
}

export type SettingEntry = SelectSetting;
