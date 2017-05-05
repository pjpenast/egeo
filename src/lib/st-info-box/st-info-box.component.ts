import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
   selector: 'st-info-box',
   templateUrl: './st-info-box.component.html',
   styleUrls: ['./st-info-box.component.scss'],
   changeDetection: ChangeDetectionStrategy.OnPush
})

export class StInfoBoxComponent implements OnInit {
   @Input() icon: string;
   @Input() title: string;

   @Input() width: number;
   @Input() height: number;

   constructor() { }

   ngOnInit(): void {
      if (this.title === undefined) {
         throw new Error('st-info-box: title is a required field');
      }
   }

   getStyles(): Object {
      let result: Object = {};
      if (this.width !== undefined) {
         Object.assign(result, {
            'width': `${this.width}px`,
            'min-width': `${this.width}px`,
            'max-width': `${this.width}px`
         });
      }
      if (this.height !== undefined) {
         Object.assign(result, {
            'height': `${this.height}px`,
            'min-height': `${this.height}px`,
            'max-height': `${this.height}px`
         });
      }
      return result;
   }

}
