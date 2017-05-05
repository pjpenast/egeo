import { TranslateableElement } from '../utils/egeo-resolver/egeo-resolve-model';

export interface StToggleButton {
   label: string;
   number?: number;
   active?: boolean;
}

export interface StToggleButtonSchema {
   label: TranslateableElement;
   number?: number;
   active?: boolean;
}
