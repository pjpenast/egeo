import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { CheckRequired, Required } from '../../decorators/require-decorators';
import { StTwoListSelectionElement } from '../st-two-list-selection.model';

@Component({
   selector: 'list-item',
   templateUrl: './list-item.component.html',
   styleUrls: ['list-item.component.scss'],
   changeDetection: ChangeDetectionStrategy.OnPush
})
@CheckRequired()
export class ListItemComponent {

   @Input() @Required() item: StTwoListSelectionElement;
   @Input() @Required() qaTag: string;
   @Input() editable: boolean = false;

   @Output() selectItem: EventEmitter<StTwoListSelectionElement> = new EventEmitter<StTwoListSelectionElement>();

   constructor() { }

   onSelect(): void {
      this.selectItem.emit(this.item);
   }

   get itemName(): string {
      return this.item.name;
   }

   get itemQaTag(): string {
      return this.qaTag + '-item-' + this.item.id;
   }

   get selected(): boolean {
      return this.item.selected;
   }

}
