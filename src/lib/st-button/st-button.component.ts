import { AfterViewInit, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'st-button',
  templateUrl: './st-button.component.html',
  styleUrls: ['./st-button.component.scss']
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
