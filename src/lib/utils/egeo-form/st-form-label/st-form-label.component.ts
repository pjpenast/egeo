import {
   ChangeDetectionStrategy,
   Component,
   Input
} from '@angular/core';

import { StFormLabelStatus } from './st-form-label-status.enum';
import { Required, CheckRequired } from '../../../decorators/require-decorators';

@Component({
   selector: 'st-form-label',
   templateUrl: './st-form-label.component.html',
   styleUrls: ['./st-form-label.component.scss'],
   changeDetection: ChangeDetectionStrategy.OnPush
})

@CheckRequired()
export class StFormLabelComponent {
   @Input() label: string = '';
   @Input() @Required() qaTag: string;
   @Input() contextualHelp: string;
   @Input() status: StFormLabelStatus;
   @Input() name: string;

   getStatusClass(): string {
      switch (this.status) {
         case StFormLabelStatus.DISABLED:
            return 'disabled';
         case StFormLabelStatus.ERROR:
            return 'error';
         case StFormLabelStatus.FOCUS:
            return 'active';
         default:
            return '';
      }
   }
}
