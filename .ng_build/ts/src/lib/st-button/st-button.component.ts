import { AfterViewInit, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'st-button',
  template: `
    <button #myInput [attr.type]="inputType" class="st-button sth-button" [attr.id]="qaTag" [attr.disabled]="isDisabled ? true : null" [ngClass]="getButtonTypeClass()" (click)="onClickEvent($event)">
       <i class="st-button__icon {{leftIcon}}" *ngIf="leftIcon"></i>
       <span class="st-button__text">{{text}}</span>
       <i class="st-button__icon {{rightIcon}}" *ngIf="rightIcon"></i>
    </button>
  `,
  styles: [`
    .st-button--btnMain, .st-button--btnLink {
      min-width: 150px;
      padding: 3px 20px 0; }

    .st-button--btnTool {
      align-items: center;
      border-radius: 100%;
      display: inline-flex;
      justify-content: center;
      min-width: 0;
      outline: none;
      padding: 7px 1px;
      width: 35px; }
      .st-button--btnTool .st-button__text {
        display: none; }

    .st-button {
      box-sizing: border-box;
      cursor: pointer;
      height: 35px;
      outline: none; }
      .st-button__icon + .st-button__text,
      .st-button__text + .st-button__icon {
        margin: 0 0 0 4px; }
      .st-button[disabled] {
        cursor: auto; }
      .st-button--btnLink .st-button__icon + .st-button__text,
      .st-button--btnLink .st-button__text + .st-button__icon {
        margin: 0 0 0 2px; }
      .st-button--btnTool .st-button__icon + .st-button__text,
      .st-button--btnTool .st-button__text + .st-button__icon {
        margin: 0; }
  `]
})

export class StButtonComponent {
   @Input() inputType: string = 'button'; // button / submit / reset
   @Input() isDisabled: boolean = false;
   @Input() leftIcon: string;
   @Input() qaTag: string;
   @Input() rightIcon: string;
   @Input() subtypeClass: string = 'default';
   @Input() text: string = 'Click Me';
   @Input() themeClass: string;
   @Input() typeClass: string = 'btnMain';

   @Output() onClick: EventEmitter<any> = new EventEmitter();

   constructor() {}

   public getButtonTypeClass(): string {
      let cssClass: string;

      if (this.typeClass) {
        cssClass = 'st-button--' + this.typeClass + ' sth-button--' + this.typeClass;
      }

      if (this.subtypeClass) {
        cssClass = cssClass + ' ' +  'st-button--' + this.typeClass + '-'
                   + this.subtypeClass + ' sth-button--' + this.typeClass + '-' + this.subtypeClass;
      }

      if (this.themeClass) {
        cssClass = cssClass + ' ' + 'st-button--' + this.themeClass + ' sth-button--' + this.themeClass;
      }

      return cssClass;
   }

   public onClickEvent(event: any): void {
     this.onClick.emit(event);
   }
}
