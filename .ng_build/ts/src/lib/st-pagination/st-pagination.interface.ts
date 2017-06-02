import { TranslateableElement } from '../utils/egeo-resolver/egeo-resolve-model';

export interface Paginate {
   currentPage: number;
   perPage: number;
}

export interface PaginateTexts {
   display: string;
   element: string;
   perPage: string;
   of: string;
}

export interface PaginateTextsSchema {
   display: TranslateableElement;
   element: TranslateableElement;
   perPage: TranslateableElement;
   of: TranslateableElement;
}
