import { Directive, ElementRef, HostListener, Renderer } from '@angular/core';

@Directive({ selector: '[stHeaderBehavior]' })
export class StHeaderBehaviorDirective {

   private expanded: boolean = true;
   private headerChangePos: number = 95;

   constructor(private renderer: Renderer, private elementRef: ElementRef) {
      this.renderer.setElementClass(this.elementRef.nativeElement, 'st-header-normal', true);
   }

   @HostListener('window:scroll', ['$event']) doSomething(event: Event): void {
      if (document.body.scrollTop > this.headerChangePos) {
         if (this.expanded) {
            this.expanded = !this.expanded;
            this.applyClass(this.expanded);
         }
      } else {
         if (!this.expanded) {
            this.expanded = !this.expanded;
            this.applyClass(this.expanded);
         }
      }
   }

   private applyClass(expanded: boolean): void {
      if (expanded) {
         this.renderer.setElementClass(this.elementRef.nativeElement, 'st-header-collapsed', false);
         this.renderer.setElementClass(this.elementRef.nativeElement, 'st-header-normal', true);
      } else {
         this.renderer.setElementClass(this.elementRef.nativeElement, 'st-header-normal', false);
         this.renderer.setElementClass(this.elementRef.nativeElement, 'st-header-collapsed', true);
      }
   }
}
