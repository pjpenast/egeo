import { Directive, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChange } from '@angular/core';

@Directive({ selector: '[submenuPos]' })

export class SubmenuPosDirective implements OnChanges {

   @Input() submenuPosIsActive: boolean;
   @Output() positionChange: EventEmitter<number> = new EventEmitter<number>();

   constructor(private el: ElementRef) { }

   ngOnInit(): void {
      if (this.submenuPosIsActive) {
         this.positionChange.emit(this.el.nativeElement.getBoundingClientRect().left);
      }
   }

   ngOnChanges(change: any): void {
      if (this.submenuPosIsActive) {
         this.positionChange.emit(this.el.nativeElement.getBoundingClientRect().left);
      }
   }
}
