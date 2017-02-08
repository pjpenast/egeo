import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FieldsMetadata, ORDER_TYPE, Order } from '../st-list.model';
import { getColPercent } from '../utils';

@Component({
  selector: 'gosec-list-header',
  styleUrls: ['./gosec-list-header.component.scss'],
  templateUrl: './gosec-list-header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GosecListHeaderComponent {
  @Input() headerList: Array<FieldsMetadata>;
  @Input() order: Order;
  @Output() onOrderChange: EventEmitter<Order> = new EventEmitter<Order>();

  private rowLength: number = 95;

  constructor() { }

  getColPercentage(type: string): string {
    return getColPercent(type, this.rowLength, this.headerList);
  }

  orderField(field: FieldsMetadata): void {
    if (this.order.orderBy === field.id) {
      this.order.type = this.order.type === ORDER_TYPE.ASC ? ORDER_TYPE.DESC : ORDER_TYPE.ASC;
    } else {
      this.order.orderBy = field.id;
      this.order.type = ORDER_TYPE.ASC;
    }
    this.onOrderChange.emit(this.order);
  }

  getIcon(field: string): string {
    return (this.order.orderBy !== field || this.order.type === ORDER_TYPE.ASC) ? 'icon-arrow2_up' : 'icon-arrow2_down';
  }
}
