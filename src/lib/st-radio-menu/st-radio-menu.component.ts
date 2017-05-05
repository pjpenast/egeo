import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {StRadioMenuOption} from './st-radio-menu-option.interface';
@Component({
   selector: 'st-radio-menu',
   templateUrl: './st-radio-menu.component.html',
   styleUrls: ['./st-radio-menu.component.scss'],
   changeDetection: ChangeDetectionStrategy.OnPush
})

export class StRadioMenuComponent {
   @Input() activeOption: StRadioMenuOption;
   @Input() options: StRadioMenuOption[];
   @Input() qaTag: string;
   @Output() changedOption: EventEmitter<any> = new EventEmitter<any>();

   constructor() {
   }

   isActive(option: StRadioMenuOption): boolean {
      return this.activeOption !== undefined && (this.activeOption.value === option.value);
   }

   activateOption(option: StRadioMenuOption): void {
      this.activeOption = option;
      this.changedOption.emit(option);
   }
}
