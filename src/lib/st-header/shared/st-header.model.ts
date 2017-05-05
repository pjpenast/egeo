import { TranslateableElement } from '../../utils/egeo-resolver/egeo-resolve-model';

export interface StHeaderModel {
   icon?: string;
   label: string;
   link: string;
   isActive: boolean;
   subMenus: StSubMenuModel[];
   notifications?: number;
}

export interface StSubMenuModel {
   label: string;
   link: string;
   isActive: boolean;
}

/** For translate service */
export interface StHeaderModelSchema {
   icon?: string;
   label: TranslateableElement;
   link: string;
   isActive: boolean;
   subMenus: StSubMenuModelSchema[];
   notifications?: number;
}

export interface StSubMenuModelSchema {
   label: TranslateableElement;
   link: string;
   isActive: boolean;
}
