import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'st-page-title',
  templateUrl: './st-page-title.component.html',
  styleUrls: ['./st-page-title.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StPageTitleComponent implements OnInit {
   @Input() title: string = '';
   @Input() leftButton: string = '';
   @Input() qaTag: string;
   @Input() preTitle: string | undefined;
   @Output() clickButton: EventEmitter<any> = new EventEmitter();

   onClickedButton(): void {
      this.clickButton.emit();
   }

   hasPreTitle(): boolean {
      return this.preTitle !== undefined;
   }

   ngOnInit(): void {
      if (this.qaTag === undefined) {
         throw new Error('ST-PAGE-TITLE: qa field is required');
      }
   }
}
