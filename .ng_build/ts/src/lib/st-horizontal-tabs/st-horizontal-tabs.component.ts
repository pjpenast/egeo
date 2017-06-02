import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { StHorizontalTab } from './st-horizontal-tabs.model';

@Component({
   selector: 'st-horizontal-tabs',
   template: `
     <section class="st-horizontal-tabs">
       <ul class="st-horizontal-tabs__list sth-horizontal-tabs__list">
         <li *ngFor="let option of options; let i = index;"
              class="st-horizontal-tabs__option sth-horizontal-tabs__option"
              [ngClass]="{'sth-horizontal-tabs__option--active': isActive(option), 'sth-horizontal-tabs__option--disabled': option.isDisabled}">
           <a class="st-horizontal-tabs__option__text sth-horizontal-tabs__option__text"
              (click)="activateOption(option)"
              [attr.id]="qaTag + '-tab-' + i" href="javascript:void(0)">{{option.text}}</a>
         </li>
       </ul>
     </section>
   `,
   styles: [`
     .st-horizontal-tabs {
       margin: 10px 0 30px;
       overflow: hidden;
       width: 100%; }

     .st-horizontal-tabs__list {
       list-style: none; }

     .st-horizontal-tabs__option {
       display: inline-block;
       width: 150px;
       height: 35px;
       line-height: 33px;
       box-sizing: border-box;
       margin-bottom: -5px; }

     .st-horizontal-tabs__option__text {
       margin-top: 2px;
       margin-left: 15px;
       cursor: pointer; }

     :host {
       display: block; }
   `],
   changeDetection: ChangeDetectionStrategy.OnPush
})

export class StHorizontalTabsComponent implements OnInit {
   @Input() activeOption: string;
   @Input() options: StHorizontalTab[];
   @Input() qaTag: string;
   @Output() changedOption: EventEmitter<any> = new EventEmitter<any>();

   ngOnInit(): void {
      if (this.options === undefined || this.qaTag === undefined) {
         throw new Error('Attribute options and qaTag is required, please review it');
      }

      if (this.options && this.options.length > 0 && !this.activeOption) {
         this.activateOption(this.options[0]);
      }
   }

   isActive(option: StHorizontalTab): boolean {
      return this.activeOption === option.text && !option.isDisabled;
   }

   activateOption(option: StHorizontalTab): void {
      if (option.isDisabled) {
         return;
      }
      this.activeOption = option.text;
      this.changedOption.emit(option.text);
   }
}
