import { Component, ViewEncapsulation } from '@angular/core';
import { StFooterLink } from '../../../../components';
import { ApiDoc, TYPES } from '../../shared';

@Component({
   selector: 'footer-example',
   templateUrl: './footer.component.html'
})
export class FooterComponent {
   apiDoc: ApiDoc;
   rightsText: string;
   links: Array<StFooterLink> = new Array<StFooterLink>();

   constructor() {
      this.rightsText = '© Stratio Big Data Inc. All Rights Reserved';
      this.links.push({
         title: 'Legal Terms',
         url: 'http://www.google.es'
      });
      this.links.push({
         title: 'Help',
         url: 'http://www.google.es'
      });
      this.links.push({
         title: 'Internal Content',
         router: 'info-box'
      });
      this.links.push({
         title: 'Modal Open'
      });

      // tslint:disable:max-line-length
      this.apiDoc = {
         title: 'Footer',
         description: 'The footer component is used to create a consistent user experience across the whole applications of the Stratio Data Centric Suite. It beyonds to the layout family of components.',
         haveModel: true,
         apiSection: {
            inputs: [
               { paramName: 'rightsText', type: TYPES.STR, required: false, details: 'The text that appears at the beginning of the toolbar to show the rights and copyright declarations.' },
               { paramName: 'image', type: TYPES.STR, required: false, details: 'The image that appears in the footer, such as the logo of your project' },
               { paramName: 'links', type: TYPES.ARRAY_OBJ, required: false, details: 'An array of StFooterLink objects (see below) that defines the links that will appear in the toolbar.' },
               { paramName: 'qaTag', type: TYPES.STR, required: true, details: 'Id for qa search in automated test' }
            ],
            outputs: [
               { paramName: 'link', type: TYPES.OBJ, required: false, details: 'Trigger an event out to control the action of clicking a link' }

            ]
         },
         exampleDesc: ``
      };
      // tslint:enable:max-line-length

   }

   onLinkChange($event: MouseEvent): void {
      console.log($event);
   }
}
