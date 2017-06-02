import { TranslateableElement } from '../utils/egeo-resolver/egeo-resolve-model';

export interface StInputError {
  generic?: string;
  required?: string;
  minLength?: string;
  maxLength?: string;
  type?: string;
  pattern?: string;
}

export interface StInputErrorSchema {
  generic?: TranslateableElement;
  required?: TranslateableElement;
  minLength?: TranslateableElement;
  maxLength?: TranslateableElement;
  type?: TranslateableElement;
  pattern?: TranslateableElement;
}

