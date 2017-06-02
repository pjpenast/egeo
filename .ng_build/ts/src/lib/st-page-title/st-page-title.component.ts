import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'st-page-title',
  template: `
    <div class="st-page-title sth-page-title">
       <st-button *ngIf="leftButton" text="Tool subtype4" typeClass="btnTool" subtypeClass="subtype4" qaTag="{{qaTag}}-left-button"
          leftIcon="{{leftButton}}" class="button-box sth-page-title-button-box" inputType="button" (click)="onClickedButton()">
          </st-button>
          <div class="main-title sth-page-title-main-title">
             <span *ngIf="hasPreTitle()" class="sth-page-title-pre-title">{{preTitle}}: </span>
             <span class="sth-page-title-title">{{title}}</span>
          </div>
          <div>
             <ng-content></ng-content>
          </div>
    </div>
  `,
  styles: [`
    .st-page-title {
      width: 100%;
      display: flex;
      flex-direction: row;
      align-items: flex-end;
      flex-wrap: nowrap; }

    .button-box {
      padding-right: 10px;
      padding-bottom: 8;
      margin-right: 10px;
      display: inline-block; }

    .main-title {
      flex-grow: 1;
      white-space: nowrap;
      line-height: 25px;
      padding-bottom: 10px;
      vertical-align: bottom;
      overflow: hidden;
      text-overflow: ellipsis; }
  `],
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
