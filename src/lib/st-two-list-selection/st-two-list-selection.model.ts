import { TranslateableElement } from '../utils/egeo-resolver/egeo-resolve-model';

export interface StTwoListSelectionElement {
   id: string | number;
   name: string;
   selected?: boolean;
}

export interface StTwoListSelectionAction {
   element: StTwoListSelectionElement;
   position: number;
}

export interface StTwoListSelectionConfig {
   allElementsListTitle: string;
   allElementsSearchPlaceholder: string;
   selectedElementsListTitle: string;
   selectedElementsSearchPlaceholder: string;
}

export interface StTwoListSelectionConfigSchema {
   allElementsListTitle: TranslateableElement;
   allElementsSearchPlaceholder: TranslateableElement;
   selectedElementsListTitle: TranslateableElement;
   selectedElementsSearchPlaceholder: TranslateableElement;
}
