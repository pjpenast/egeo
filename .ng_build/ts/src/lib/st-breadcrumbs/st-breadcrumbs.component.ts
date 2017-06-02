import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
   selector: 'st-breadcrumbs',
   template: `
     <ul class="st-breadcrumbs">
        <li class="st-breadcrumbs__item sth-breadcrumbs__item" *ngFor="let el of generateCrumbs(); let last = last; let i = index;" [ngClass]="{'last': last}" >
           <span class="st-breadcrumbs__item--text sth-breadcrumbs__item--text" (click)="onSelect(i)" [attr.id]="qaTag + '-' + i">{{el}}</span>
           <span class="st-breadcrumbs__item--arrow sth-breadcrumbs__item--arrow" >></span>
        </li>
     </ul>
   `,
   styles: [`
     .st-breadcrumbs__item {
       display: inline; }

     .st-breadcrumbs__item--text {
       cursor: pointer; }

     .last .st-breadcrumbs__item--text {
       cursor: default;
       background-color: transparent; }

     .last .st-breadcrumbs__item--arrow {
       display: none; }
   `]
})
export class StBreadCrumbs implements OnInit {
   @Input() options: string[];
   @Input() qaTag: string;
   @Output() changeOption: EventEmitter<number> = new EventEmitter<number>();

   ngOnInit(): void {
      if (!this.qaTag) {
         throw new Error('qaTag is a necesary field');
      }
   }

   public generateCrumbs(): string[] {
      if (this.options.length <= 6) {
         return [...this.options];
      } else {
         return this.options.slice(0, 1).concat(['...']).concat(this.options.slice(-4));
      }
   }

   public onSelect(index: number): void {

      if (index + 1 < this.options.length) {
         if (this.options.length <= 6 || index === 0) {
            this.changeOption.emit(index);
         } else {
            let calculatedIndex: number;
            calculatedIndex = this.options.length - (6 - (index));
            this.changeOption.emit(calculatedIndex);
         }
      }
   }
}
