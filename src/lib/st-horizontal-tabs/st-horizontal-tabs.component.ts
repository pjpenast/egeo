/*
 * © 2017 Stratio Big Data Inc., Sucursal en España.
 *
 * This software is licensed under the Apache License, Version 2.0.
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY;
 * without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 * See the terms of the License for more details.
 *
 * SPDX-License-Identifier: Apache-2.0.
 */
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { StHorizontalTab } from './st-horizontal-tabs.model';

@Component({
   selector: 'st-horizontal-tabs',
   templateUrl: './st-horizontal-tabs.component.html',
   styleUrls: ['./st-horizontal-tabs.component.scss'],
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
