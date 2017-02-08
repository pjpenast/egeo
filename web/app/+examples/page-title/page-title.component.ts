import { Component, ViewEncapsulation } from '@angular/core';
import { ApiDoc, TYPES } from '../../shared';

@Component({
   selector: 'page-title-example',
   templateUrl: './page-title.component.html',
   styleUrls: ['./page-title.component.scss']
})

export class PageTitleComponent {
   apiDoc: ApiDoc;
   title: string = 'page title';

   constructor() {
      this.apiDoc = {
         title: 'Page title',
         description: 'Page title component is think for use in headers of pages.',
         haveModel: true,
         apiSection: {
            inputs: [
               { paramName: 'title', type: TYPES.STR, required: true, details: 'Title text to show, must be final text to show not allow translate' },
               { paramName: 'leftButton', type: TYPES.STR, required: false, details: 'Icon class of button displayed  to the left of title.' }
            ],
            outputs: []
         },
         exampleDesc: `Next, we can see an example of Page title component showing a title and two elements in the right side.
         The right side content must be surrounded by page-title tags as you can see in html code below`
      };
   }



}
