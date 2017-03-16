import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { StSpinnerComponent } from './st-spinner.component';
import { CommonModule } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { TestBed, ComponentFixture, fakeAsync } from '@angular/core/testing';

let fixture: ComponentFixture<StSpinnerComponent>;
let comp: StSpinnerComponent;
let imageUrl: string = 'image.jpg';

describe('StSpinnerComponent', () => {

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ CommonModule, RouterTestingModule ],
            declarations: [StSpinnerComponent]
        });

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
