import { Component, ElementRef, OnInit, Input, ViewEncapsulation } from '@angular/core';
import * as Popper from 'popper.js/dist/umd/popper.js';

export type PopperPlacement = 'top' | 'top-start' | 'top-end' |
   'right' | 'right-start' | 'right-end' |
   'bottom' | 'bottom-start' | 'bottom-end' |
   'left' | 'left-start' | 'left-end';

@Component({
   selector: 'st-pop',
   encapsulation: ViewEncapsulation.None,
   templateUrl: './st-pop.component.html'
})
export class StPopComponent implements OnInit {

   @Input() placement: PopperPlacement = 'left';
   @Input() hidden: boolean = true;
   @Input() gpuAcceleration: boolean = true;

   private popper: any;

   constructor(private el: ElementRef) { }

   ngOnInit(): void {

      this.popper = new Popper.default(
         this.el.nativeElement.querySelector('[pop-button]'),
         this.el.nativeElement.querySelector('[pop-content]'),
         {
            placement: this.placement,
            removeOnDestroy: true,
            gpuAcceleration: this.gpuAcceleration,
            preventOverflow: {
               enabled: true
            }
         }
      );

   }

}
