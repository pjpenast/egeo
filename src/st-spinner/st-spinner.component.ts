import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CheckRequired, Required } from '../decorators';

@Component({
  selector: 'st-spinner',
  templateUrl: './st-spinner.component.html',
  styleUrls: ['./st-spinner.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
@CheckRequired()
export class StSpinnerComponent {
  @Input() @Required() imageUrl: string;
}
