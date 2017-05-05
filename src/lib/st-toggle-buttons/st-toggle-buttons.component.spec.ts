import { DebugElement } from '@angular/core';
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';

import { StToggleButtonsComponent } from './st-toggle-buttons.component';
import { StToggleButton } from './st-toggle-buttons.interface';


let comp: StToggleButtonsComponent;
let fixture: ComponentFixture<StToggleButtonsComponent>;
let de: DebugElement;

let tabs: StToggleButton[] = [
   { label: 'toogle1', active: true, number: 0 },
   { label: 'toogle2', active: false, number: 1 },
   { label: 'toogle3', active: false, number: 2 }
];
let description: string = 'toogle test';
let qaTag: string = 'toogle-test';

describe('StToggleButtonsComponent', () => {

   beforeEach(async(() => {
      TestBed.configureTestingModule({
         imports: [RouterTestingModule],
         declarations: [StToggleButtonsComponent]
      })
         .compileComponents();  // compile template and css
   }));

   beforeEach(() => {
      fixture = TestBed.createComponent(StToggleButtonsComponent);
      comp = fixture.componentInstance;

      comp.tabs = tabs;
      comp.description = description;
      comp.qaTag = qaTag;
   });

   it('should init correctly', () => {
      fixture.detectChanges();
      let desc: DebugElement = fixture.debugElement.query(By.css('.st-toggle-buttons__description'));
      let options: DebugElement[] = fixture.debugElement.queryAll(By.css('.st-toggle-buttons__tab'));

      expect(desc).toBeDefined();
      expect(desc.nativeElement).toBeDefined();
      expect((<HTMLDivElement>desc.nativeElement).innerText).toEqual(description);

      expect(options).toBeDefined();
      expect(options.length).toEqual(3);

   });

   it('should change active tab on click', () => {
      fixture.detectChanges();

      let option1: DebugElement = fixture.debugElement.query(By.css(`#${qaTag}-${tabs[0].label}`));
      let option3: DebugElement = fixture.debugElement.query(By.css(`#${qaTag}-${tabs[2].label}`));

      expect(option1).toBeDefined();
      expect(option3).toBeDefined();
      expect(option1.classes['st-toggle-buttons__tab--active']).toBeTruthy();
      expect(option3.classes['st-toggle-buttons__tab--active']).toBeFalsy();

      option3.nativeElement.dispatchEvent(new Event('click'));
      fixture.detectChanges();

      expect(option1.classes['st-toggle-buttons__tab--active']).toBeFalsy();
      expect(option3.classes['st-toggle-buttons__tab--active']).toBeTruthy();
   });

   it('Should emit an event when active tab is clicked', () => {
      let responseFunction = jasmine.createSpy('response');
      comp.select.subscribe(responseFunction);

      fixture.detectChanges();

      let option2: DebugElement = fixture.debugElement.query(By.css(`#${qaTag}-${tabs[1].label}`));

      expect(option2).toBeDefined();
      expect(option2.classes['st-toggle-buttons__tab--active']).toBeFalsy();

      option2.nativeElement.dispatchEvent(new Event('click'));
      fixture.detectChanges();

      expect(option2.classes['st-toggle-buttons__tab--active']).toBeTruthy();
      expect(responseFunction).toHaveBeenCalled();
      expect(responseFunction).toHaveBeenCalledTimes(1);
      expect(responseFunction).toHaveBeenCalledWith(tabs[1]);
   });
});
