import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChange } from '@angular/core';

@Component({
   selector: 'st-vertical-tabs',
   templateUrl: './st-vertical-tabs.component.html',
   styleUrls: ['./st-vertical-tabs.component.css'],
   changeDetection: ChangeDetectionStrategy.OnPush
})
export class StVerticalTabsComponent implements OnInit {
   @Input() activeOption: string;
   @Input() options: string[];
   @Input() qaTag: string;
   @Output() changeOption: EventEmitter<string> = new EventEmitter<string>();

   activeOptionIndex: number = 0;
   arrowMovement: number = 39;
   arrowMargin: number = 0;

   constructor() { }

   ngOnInit(): void {
      if (!this.qaTag) {
         throw new Error('qaTag is a required field');
      }
      if (this.options && this.options.length > 0) {
         if (this.activeOption) {
            this.changeActive(this.activeOption);
         } else {
            this.activeFirstOption();
         }
      } else {
         throw new Error('options is a required field');
      }
   }

   ngOnChanges(changes: any): void {
      if (changes && changes.activeOption) {
         this.changeActive(changes.activeOption.currentValue);
      }
   }

   isActive(optionName: string): boolean {
      return this.activeOption === optionName;
   }

   activateOption(optionName: string): void {
      this.changeActive(optionName);
      this.changeOption.emit(optionName);
   }

   private changeActive(optionName: string): void {
      this.activeOption = optionName;
      this.activeOptionIndex = this.options.indexOf(optionName);
      if (this.activeOptionIndex < 0) {
         this.activeFirstOption();
      }
   }

   private activeFirstOption(): void {
      this.changeActive(this.options[0]);
   }
}
