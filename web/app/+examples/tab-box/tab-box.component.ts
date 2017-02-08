import { Component, ViewEncapsulation } from '@angular/core';
import { StTab } from '../../../../components';
import { ApiDoc, TYPES } from '../../shared';

@Component({
   selector: 'tab-box-example',
   templateUrl: './tab-box.component.html'
})

export class TabBoxComponent {
   tabs: StTab[];
   selectedTab: StTab;

   // tslint:disable:max-line-length
   public apiDoc: ApiDoc = {
      title: 'Tab Box',
      description: 'Tab box component is a useful component in order to divide information according a specific criteria',
      haveModel: true,  // True for show label False for hide
      apiSection: {
         inputs: [
            { paramName: 'tabs', type: 'Array<StTab>', required: true, details: 'List of tabs with a name and status (active or not active)' },
            { paramName: 'qaTag', type: TYPES.STR, required: true, details: 'Prefix used to generate the id values for qa tests' }
         ],
         outputs: [
            { paramName: 'select', type: 'StTab', required: true, details: 'This event is emitted when selected tab has changed. It has the selected tab as param' }
         ]
      },
      exampleDesc: `Next, you can see an example of a tab box with two tabs.`
   };
   // tslint:enable:max-line-length

   constructor() {
      this.tabs = [
         {
            label: 'Tab1',
            active: true
         }, {
            label: 'Tab2',
            active: false
         }
      ];

      this.selectedTab = this.tabs[0];
   }

   onSelectTab(tab: StTab): void {
      this.selectedTab = tab;
   }
}
