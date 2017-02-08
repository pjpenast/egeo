import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ApiDoc, TYPES } from '../../../shared';

import { StHeaderModel, StHeaderUserMenuModel } from '../../../../../components';

@Component({
   selector: 'header-example',
   templateUrl: './header.component.html',
   styleUrls: ['./header.component.scss']
})

export class HeaderComponent {

   public userMenu: StHeaderUserMenuModel = {
      logoutLabel: 'Logout',
      userName: 'Antonio H.',
      logoutPath: ''
   };

   public contentOffset: number = 0;

   public headerMenu: Array<StHeaderModel> = [
      {
         icon: 'icon-head',
         label: 'IDENTITIES',
         link: '/navigation/header/test1',
         subMenus: [{
            label: 'USER',
            link: '/navigation/header/test1/subtest1',
            isActive: true
         },
         {
            label: 'GROUP',
            link: '/navigation/header/test1/subtest2',
            isActive: false
         }],
         isActive: true
      },
      {
         icon: 'icon-puzzle',
         label: 'SERVICES',
         link: '/navigation/header/test2',
         subMenus: [],
         isActive: false
      },
      {
         icon: 'icon-paper',
         label: 'POLICIES',
         link: '/navigation/header/test3',
         subMenus: [],
         isActive: true
      },
      {
         icon: 'icon-layers',
         label: 'AUDITING',
         link: '/navigation/header/test4',
         subMenus: [],
         isActive: true
      },
      {
         icon: 'icon-cog',
         label: 'SETTINGS',
         link: '/navigation/header/test5',
         subMenus: [],
         isActive: true
      }
   ];

   // tslint:disable:max-line-length
   public apiDoc: ApiDoc = {
      title: 'Header',
      description: 'The header component is a main component of an application. This component must be on top and scroll with page, when scroll is in a calculated position, the header shrinks and fix to top.',
      haveModel: true,
      apiSection: {
         inputs: [
            { paramName: 'appName', type: TYPES.STR, required: false, details: 'Name of application to show, by default empty' },
            { paramName: 'companyName', type: TYPES.STR, required: false, details: 'Company name to show, by default: Stratio' },
            { paramName: 'menu', type: 'Array<StHeaderModel>', required: false, details: 'Array with menu option to show' },
            { paramName: 'userMenu', type: 'StHeaderUserMenuModel', required: false, details: 'Object with user menu information' },
            { paramName: 'qaTag', type: TYPES.STR, required: true, details: 'Id value for qa test' }
         ],
         outputs: [
            { paramName: 'contentChangeOffset', type: TYPES.NUM, required: false, details: '' }
         ]
      },
      exampleDesc: `You can find the example at top of page`
   };
   // tslint:enable:max-line-length

   constructor(private _cd: ChangeDetectorRef) { }

   onContentChangeOffset(offset: number): void {
      this.contentOffset = offset + 10;
      setTimeout(() => {
         this._cd.markForCheck();
      });
   }
}
