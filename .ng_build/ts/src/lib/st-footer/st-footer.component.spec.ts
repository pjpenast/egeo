import { CommonModule } from '@angular/common';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { StFooterComponent } from './st-footer.component';
import { StFooterLink } from './st-footer.model';

let items: StFooterLink[] = [
   {
      title: 'External Router',
      url: 'http://www.google.es'
   },
   {
      title: 'Internal Router',
      router: 'link'
   },
   {
      title: 'Output Action'
   }
];

describe('StFooterComponent', () => {

   let component: StFooterComponent;
   let fixture: ComponentFixture<StFooterComponent>;

   beforeEach(async(() => {
      TestBed.configureTestingModule({
         imports: [CommonModule, RouterTestingModule],
         declarations: [StFooterComponent]
      })
         .compileComponents();  // compile template and css
   }));


   beforeEach(() => {
      fixture = TestBed.createComponent(StFooterComponent);
      component = fixture.componentInstance;

   });

   describe('When check component Input', () => {
      it('Should have 3 links the menu', () => {
         component.links = items;
         fixture.detectChanges();
         expect(fixture.componentInstance.links.length).toBe(3);
      });

      it('Should have a right menu text', () => {
         component.rightsText = 'Example Text';
         fixture.detectChanges();
         let textElement = fixture.nativeElement.querySelector('.sth-footer-text');
         expect(textElement).toBeDefined();
      });

   });

   describe('When modify input image', () => {

      it('Should not have a image as logo', () => {
         let imageElement = fixture.nativeElement.querySelector('img');
         expect(imageElement).toBeNull();
      });

      it('Should have a image as logo', () => {
         component.image = 'https://www.google.es/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png';
         fixture.detectChanges();
         let imageElement = fixture.nativeElement.querySelector('img');
         expect(imageElement).toBeDefined();
      });

   });

   describe('When check component Output', () => {

      it('Should click on a link in the menu and output the content of the link', () => {
         let item: StFooterLink = {
            title: 'External Router',
            url: 'http://www.google.es'
         };

         spyOn(component.link, 'emit');
         component.links = items;
         fixture.detectChanges();
         let itemElement = fixture.nativeElement.querySelector('li');
         let itemClick = itemElement.querySelector('.link');

         itemClick.dispatchEvent(new Event('click'));
         fixture.detectChanges();
         expect(component.link.emit).toHaveBeenCalledWith(item);
      });

   });


});
