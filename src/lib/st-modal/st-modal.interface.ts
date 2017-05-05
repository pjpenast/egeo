import { TranslateableElement } from '../utils/egeo-resolver/egeo-resolve-model';

export enum StModalType { INFO, WARNING, NEUTRAL }
export enum StModalWidth { COMPACT, REGULAR, LARGE }
export enum StModalMainTextSize { BIG, MEDIUM }
export enum StModalResponse { YES, NO, CLOSE }

export interface StModalButton {
   icon?: string;
   iconLeft?: boolean;
   primary?: boolean;
   label: string;
   response: StModalResponse;
}

export interface StModalConfig {
   contextualTitle?: string;
   modalTitle?: string;
   message?: string;
   html?: string;
   mainText?: StModalMainTextSize;
   modalType?: StModalType;
   modalWidth?: StModalWidth;
   inputs?: Object;
   outputs?: Object;
   buttons?: StModalButton[];
   closeOnAccept?: boolean;
   qaTag: string;
}
