import { TranslateableElement } from '../utils/egeo-resolver/egeo-resolve-model';

export interface StTab {
  label: string;
  active?: boolean;
}

export interface StTabSchema {
  label: TranslateableElement;
  active?: boolean;
}
