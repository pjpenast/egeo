import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';

import { StHeaderModel } from '../st-header.model';

@Component({
   selector: 'navigation-links',
   styleUrls: ['./navigation-links.component.scss'],
   templateUrl: './navigation-links.component.html'
})
export class NavigationLinksComponent {

   @Input() menu: StHeaderModel[] = [];
   @Input() qaTag: string;

   @Output() positionChange: EventEmitter<number> = new EventEmitter<number>();

   constructor(private _cd: ChangeDetectorRef) {}

   public hasIcon(option: StHeaderModel): boolean {
      return option.icon !== undefined;
   }

   public launchChangeDetector(): void {
      this._cd.markForCheck();
   }

   public onPositionChange(newPosition: number): void {
      this.positionChange.emit(newPosition);
   }

   public isActive(option: StHeaderModel): string {
      if (!option.isActive) {
         return 'sth-header-disable-option';
      } else {
         return '';
      }
   }
}
