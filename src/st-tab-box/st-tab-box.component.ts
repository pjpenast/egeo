import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { StTab } from './st-tab-box.interface';

@Component({
   selector: 'st-tab-box',
   templateUrl: './st-tab-box.component.html',
   styleUrls: ['./st-tab-box.component.scss'],
   changeDetection: ChangeDetectionStrategy.OnPush
})
export class StTabBoxComponent {
   @Input() tabs: StTab[] = [];
   @Input() qaTag: string;
   @Output() select: EventEmitter<StTab> = new EventEmitter<StTab>();

   constructor(private _cd: ChangeDetectorRef) { }

   onClick(selectedTab: StTab): void {
      this.tabs = Object.assign([], this.tabs.map((tab) => {
         if (tab.label === selectedTab.label) {
            return Object.assign({}, tab, { active: true });
         } else {
            return Object.assign({}, tab, { active: false });
         }
      }));
      this._cd.markForCheck();
      this.select.emit(Object.assign({}, selectedTab, { active: true }));
   }

   getTabWidth(): string {
      return `${(100 / this.tabs.length).toFixed(2)}%`;
   }
}
