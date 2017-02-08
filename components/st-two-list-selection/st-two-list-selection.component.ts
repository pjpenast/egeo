import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

import { StTwoListSelectionElement, StListModifierObject } from './st-two-list-selection.model';

@Component({
   selector: 'st-two-list-selection',
   templateUrl: './st-two-list-selection.component.html',
   styleUrls: ['./st-two-list-selection.component.scss'],
   changeDetection: ChangeDetectionStrategy.OnPush
})
export class StTwoListSelectionComponent {

   @Input() completeList: Array<StTwoListSelectionElement> = new Array<StTwoListSelectionElement>();
   @Input() selectedList: Array<StTwoListSelectionElement> = new Array<StTwoListSelectionElement>();
   @Output() listModifier: EventEmitter<StListModifierObject> = new EventEmitter<StListModifierObject>();
   @Output() changeCompleteSearch: EventEmitter<string> = new EventEmitter<string>();
   @Output() changeSelectedSearch: EventEmitter<string> = new EventEmitter<string>();
   @Input() editable: boolean;
   @Input() completeListTitle: string;
   @Input() selectedListTitle: string;
   @Input() searchButtonLabel: string;
   @Input() qaTag: string;

   selectedSearchText: string;
   private completeSearchText: string;

   private listToAdd: Array<StTwoListSelectionElement> = new Array<StTwoListSelectionElement>();
   private listToRemove: Array<StTwoListSelectionElement> = new Array<StTwoListSelectionElement>();

   constructor() { }

   markElement(row: StTwoListSelectionElement, toAdd: boolean): void {
      if (toAdd) {
         let rowToFind: Array<StTwoListSelectionElement> = this.listToAdd.filter((rowOfArray) => row.id === rowOfArray.id);
         if (rowToFind.length > 0) {
            this.listToAdd = this.listToAdd.filter((rowOfArray) => rowOfArray.id !== rowToFind[0].id);
         } else {
            this.listToAdd.push(row);
         }
      } else {
         let rowToFind: Array<StTwoListSelectionElement> = this.listToRemove.filter((rowOfArray) => row.id === rowOfArray.id);
         if (rowToFind.length > 0) {
            this.listToRemove = this.listToRemove.filter((rowOfArray) => rowOfArray.id !== rowToFind[0].id);
         } else {
            this.listToRemove.push(row);
         }
      }
   }

   modifyList(actionToAdd: boolean): void {
      let list: Array<StTwoListSelectionElement>;
      if (actionToAdd) {
         list = this.listToAdd;
      } else {
         list = this.listToRemove;
      }
      if (list.length > 0) {
         this.listModifier.emit({ actionToAdd: actionToAdd, list: list });
      }
      if (actionToAdd) {
         this.listToAdd = new Array<StTwoListSelectionElement>();
      } else {
         list = this.listToRemove = new Array<StTwoListSelectionElement>();
      }
      this.completeSearchText = '';
      this.selectedSearchText = '';
   }

   searchInCompleteList(text: string): void {
      this.completeSearchText = text;
      this.changeCompleteSearch.emit(this.completeSearchText);
   }

   searchInSelectedList(text: string): void {
      this.selectedSearchText = text;
      this.changeSelectedSearch.emit(this.selectedSearchText);
   }
}

