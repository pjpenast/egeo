import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { StToggleButton } from './st-toggle-buttons.interface';

@Component({
   selector: 'st-toggle-buttons',
   templateUrl: './st-toggle-buttons.component.html',
   styleUrls: ['./st-toggle-buttons.component.css'],
   changeDetection: ChangeDetectionStrategy.OnPush
})
export class StToggleButtonsComponent {
   @Input() tabs: StToggleButton[] = [];
   @Input() description: string;
   @Input() qaTag: string;
   @Output() select: EventEmitter<StToggleButton> = new EventEmitter<StToggleButton>();

   onClick(selectedTab: StToggleButton): void {
      for (let tab of this.tabs) {
         tab.active = false;
      }
      selectedTab.active = true;
      this.select.emit(selectedTab);
   }
}
