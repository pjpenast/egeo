import { Component, ViewEncapsulation, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { TranslateService } from 'ng2-translate/ng2-translate';
import { StModalService } from '../../components';

@Component({
   selector: 'app',
   templateUrl: './app.component.html',
   styleUrls: ['./app.component.scss'],
   encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {

   @ViewChild('loadModal', { read: ViewContainerRef }) target: any;

   constructor(translate: TranslateService, private _modalService: StModalService) {
      translate.setDefaultLang('en');
      translate.use('en');

   }

   ngOnInit(): void {
      this._modalService.container = this.target;
   }

}
