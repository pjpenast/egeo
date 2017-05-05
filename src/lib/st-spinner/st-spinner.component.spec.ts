import { CommonModule } from '@angular/common';
import { DebugElement } from '@angular/core';
import { async, ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { StSpinnerComponent } from './st-spinner.component';

let fixture: ComponentFixture<StSpinnerComponent>;
let comp: StSpinnerComponent;
let imageUrl: string = 'image.jpg';

describe('StSpinnerComponent', () => {

   beforeEach(async(() => {
      TestBed.configureTestingModule({
         imports: [CommonModule, RouterTestingModule],
         declarations: [StSpinnerComponent]
      })
         .compileComponents();  // compile template and css
   }));

   beforeEach(() => {
      fixture = TestBed.createComponent(StSpinnerComponent);
      comp = fixture.componentInstance;
      comp.imageUrl = imageUrl;
   });

   it('should have an image with src', () => {
      fixture.detectChanges();
      let image: DebugElement = fixture.debugElement.query(By.css('img'));
      let src: string = image.nativeElement.getAttribute('src');
      expect(src).toBeDefined();
      expect(src).toEqual(imageUrl);
   });
});
