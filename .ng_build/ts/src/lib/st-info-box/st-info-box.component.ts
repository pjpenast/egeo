import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
   selector: 'st-info-box',
   template: `
     <section class="st-info-box sth-info-box" [ngStyle]="getStyles()">
        <div class="st-info-box__header sth-info-box__header">
           <label class="st-info-box__header__text sth-info-box__header__text">  <i *ngIf="icon" [ngClass]="icon" class="st-info-box__header__icon sth-info-box__header__icon"></i>{{title}}</label>
        </div>
        <div class="st-info-box__content">
           <ng-content></ng-content>
        </div>
     </section>
   `,
   styles: [`
     .st-info-box {
       margin: 0;
       height: 100%;
       width: 100%;
       overflow-x: auto; }

     .st-info-box__header {
       display: block;
       width: 100%;
       height: 50px;
       line-height: 52px;
       padding: 0 30px; }

     .st-info-box__header__icon {
       width: 20px;
       height: 20px;
       margin-right: 10px; }

     .st-info-box__header__text {
       font-size: 18px; }

     .st-info-box__content {
       padding: 20px 30px 30px 30px; }

     :host {
       display: block; }
   `],
   changeDetection: ChangeDetectionStrategy.OnPush
})

export class StInfoBoxComponent implements OnInit {
   @Input() icon: string;
   @Input() title: string;

   @Input() width: number;
   @Input() height: number;

   constructor() { }

   ngOnInit(): void {
      if (this.title === undefined) {
         throw new Error('st-info-box: title is a required field');
      }
   }

   getStyles(): Object {
      let result: Object = {};
      if (this.width !== undefined) {
         Object.assign(result, {
            'width': `${this.width}px`,
            'min-width': `${this.width}px`,
            'max-width': `${this.width}px`
         });
      }
      if (this.height !== undefined) {
         Object.assign(result, {
            'height': `${this.height}px`,
            'min-height': `${this.height}px`,
            'max-height': `${this.height}px`
         });
      }
      return result;
   }

}
