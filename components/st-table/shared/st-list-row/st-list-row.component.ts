import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FieldsMetadata, Model } from '../st-list.model';
import { getColPercent } from '../utils';

@Component({
   selector: 'gosec-list-row',
   styleUrls: ['./st-list-row.component.scss'],
   templateUrl: './st-list-row.component.html',
   changeDetection: ChangeDetectionStrategy.OnPush
})
export class GosecListRowComponent {
   @Input() rowData: Model<any>;
   @Input() metadata: Array<FieldsMetadata>;
   @Input() hasDetail: boolean = true;
   @Input() detailText: string = '';
   @Input() actionClass: string = '';
   @Output() openDetail: EventEmitter<string> = new EventEmitter<string>();
   @Output() clickAction: EventEmitter<string> = new EventEmitter<string>();


   // All values against which you consider truthy for boolean types
   TRUTHY_VALUES: Array<any> = [true, 'true', 1, '1'];

   RIGHT_MARGIN: number = 5;
   rowLength: number = 100;
   constructor() {
      this.rowLength = 100 - this.RIGHT_MARGIN;
   }

   getColPercentage(type: string): string {
      return getColPercent(type, this.rowLength, this.metadata);
   }

   getIcon(field: FieldsMetadata): string {
      return field.iconRel[this.rowData.getValue(field.id)].iconName;
   }

   getColor(field: FieldsMetadata): Object {
      return { color: field.iconRel[this.rowData.getValue(field.id)].color };
   }

   getBooleanText(field: FieldsMetadata): string {
      let value = this.getBoolean(this.rowData.getValue(field.id));
      if (value) {
         return field.booleanRel.trueText || field.booleanRel.trueField.trueText;
      } else {
         return field.booleanRel.falseText || field.booleanRel.falseField.falseText;
      }
   }


   getBooleanClass(field: FieldsMetadata): {} {
      let value = this.getBoolean(this.rowData.getValue(field.id));
      if (value) {
         if (field.booleanRel.trueField && field.booleanRel.trueField.cssClass) {
            return field.booleanRel.trueField.cssClass;
         } else {
            return 'st-table-positive-cell';
         }
      } else {
         if (field.booleanRel.falseField && field.booleanRel.falseField.cssClass) {
            return field.booleanRel.falseField.cssClass;
         } else {
            return 'st-table-negative-cell';
         }
      }
   }

   getBoolean(x: any): boolean {
      return this.TRUTHY_VALUES.some(function (value: any): any {
         return x === value;
      });
   }

   showDetail(id: string): void {
      this.openDetail.emit(id);
   }

   clickOnAction(id: string): void {
      this.clickAction.emit(id);
   }
}
