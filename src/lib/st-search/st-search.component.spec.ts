import { DebugElement, SimpleChanges } from '@angular/core';
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

// Component
import { StSearchComponent } from './st-search.component';


let comp: StSearchComponent;
let fixture: ComponentFixture<StSearchComponent>;
let de: DebugElement;

let id: string = 'search-123';
let placeholder: string = 'search a text';
let debounce: number = 10;
let minLength: number = 0;

describe('StSearchComponent', () => {

   beforeEach(async(() => {
      TestBed.configureTestingModule({
         imports: [FormsModule, ReactiveFormsModule],
         declarations: [StSearchComponent]
      })
         .compileComponents();  // compile template and css
   }));

   beforeEach(() => {
      fixture = TestBed.createComponent(StSearchComponent);
      comp = fixture.componentInstance;

      comp.qaTag = id;
      comp.placeholder = placeholder;
      comp.debounce = debounce;
      comp.minLength = minLength;
   });

   it('should be initialized correctly', () => {
      fixture.detectChanges();
      let input: HTMLInputElement = fixture.debugElement.query(By.css('input')).nativeElement;

      expect(input.id).toEqual(id);  // qaTag
      expect(input.placeholder).toEqual(placeholder); // placeholder value
   });

   it('init with value', () => {
      comp.debounce = 0;
      comp.minLength = 0;
      comp.value = 'Initial value';
      fixture.detectChanges();
      let input: DebugElement = fixture.debugElement.query(By.css('input'));

      expect((<HTMLInputElement>input.nativeElement).value).toEqual('Initial value');
   });

   it('should be search (async)', fakeAsync(() => {
      fixture.detectChanges();
      let result: string = 'test';
      let input: HTMLInputElement = fixture.debugElement.query(By.css('input')).nativeElement;

      let outputSearch: string;
      comp.search.subscribe((search: string) => outputSearch = search);
      input.value = result;
      input.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      tick(11);
      expect(outputSearch).toEqual(result);
   }));

   it('should be searched with delay', fakeAsync(() => {
      comp.debounce = 1000;
      fixture.detectChanges();

      let result: string = 'test';
      let input: HTMLInputElement = fixture.debugElement.query(By.css('input')).nativeElement;

      let outputSearch: string = '';
      comp.search.subscribe((search: string) => outputSearch = search);
      input.value = result;
      input.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      tick(500);
      expect(outputSearch).not.toEqual(result);
      tick(501);
      expect(outputSearch).toEqual(result);
   }));

   it('should be searched with min length', fakeAsync(() => {
      comp.debounce = 0;
      comp.minLength = 3;
      let responseFunction = jasmine.createSpy('response');
      comp.search.subscribe(responseFunction);
      fixture.detectChanges();

      let input: HTMLInputElement = fixture.debugElement.query(By.css('input')).nativeElement;

      input.value = 'te';
      input.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      tick(10);

      expect(responseFunction).not.toHaveBeenCalled();

      input.value = 'test';
      input.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      tick(10);

      expect(responseFunction).toHaveBeenCalled();
      expect(responseFunction).toHaveBeenCalledWith('test');
   }));

   it('should be searched when press enter', () => {
      comp.debounce = 0;
      comp.minLength = 0;
      let responseFunction = jasmine.createSpy('response');
      comp.search.subscribe(responseFunction);

      fixture.detectChanges();
      let input: DebugElement = fixture.debugElement.query(By.css('input'));

      input.nativeElement.value = 'te';
      input.nativeElement.dispatchEvent(new Event('input'));
      input.triggerEventHandler('keypress', { keyCode: 13 });
      fixture.detectChanges();

      expect(responseFunction).toHaveBeenCalled();
      expect(responseFunction).toHaveBeenCalledTimes(1);
      expect(responseFunction).toHaveBeenCalledWith('te');

      input.nativeElement.value = 'test';
      input.nativeElement.dispatchEvent(new Event('input'));
      input.triggerEventHandler('keypress', { which: 10 });
      fixture.detectChanges();

      expect(responseFunction).toHaveBeenCalled();
      expect(responseFunction).toHaveBeenCalledTimes(1); // Not again

      input.nativeElement.value = 'test';
      input.nativeElement.dispatchEvent(new Event('input'));
      input.triggerEventHandler('keypress', { which: 13 });
      fixture.detectChanges();

      expect(responseFunction).toHaveBeenCalled();
      expect(responseFunction).toHaveBeenCalledTimes(2);
      expect(responseFunction).toHaveBeenCalledWith('test');
   });

   it('should be searched when click', () => {
      comp.debounce = 0;
      comp.minLength = 0;
      let responseFunction = jasmine.createSpy('response');
      comp.search.subscribe(responseFunction);

      fixture.detectChanges();
      let input: DebugElement = fixture.debugElement.query(By.css('input'));
      let searchButton: DebugElement = fixture.debugElement.query(By.css('.st-search-icon'));

      input.nativeElement.value = 'te';
      input.nativeElement.dispatchEvent(new Event('input'));
      searchButton.triggerEventHandler('mousedown', {});
      fixture.detectChanges();

      expect(responseFunction).toHaveBeenCalled();
      expect(responseFunction).toHaveBeenCalledTimes(1);
      expect(responseFunction).toHaveBeenCalledWith('te');

      input.nativeElement.value = 'test';
      input.nativeElement.dispatchEvent(new Event('input'));
      searchButton.triggerEventHandler('mousedown', {});
      fixture.detectChanges();

      expect(responseFunction).toHaveBeenCalled();
      expect(responseFunction).toHaveBeenCalledTimes(2);
      expect(responseFunction).toHaveBeenCalledWith('test');
   });

   it('should be searched only on click', () => {
      comp.debounce = 0;
      comp.minLength = 0;
      comp.searchOnlyOnClick = true;
      let responseFunction = jasmine.createSpy('response');
      comp.search.subscribe(responseFunction);

      fixture.detectChanges();
      let input: DebugElement = fixture.debugElement.query(By.css('input'));
      let searchButton: DebugElement = fixture.debugElement.query(By.css('.st-search-icon'));

      input.nativeElement.value = 'test';
      input.nativeElement.dispatchEvent(new Event('input'));
      input.triggerEventHandler('keypress', { which: 13 });
      fixture.detectChanges();

      expect(responseFunction).not.toHaveBeenCalled();
      expect(responseFunction).toHaveBeenCalledTimes(0);

      searchButton.triggerEventHandler('mousedown', {});
      fixture.detectChanges();

      expect(responseFunction).toHaveBeenCalled();
      expect(responseFunction).toHaveBeenCalledTimes(1);
      expect(responseFunction).toHaveBeenCalledWith('test');
   });

   it('should be searched on click twice the same', () => {
      comp.debounce = 0;
      comp.minLength = 0;
      let responseFunction = jasmine.createSpy('response');
      comp.search.subscribe(responseFunction);

      fixture.detectChanges();
      let input: DebugElement = fixture.debugElement.query(By.css('input'));
      let searchButton: DebugElement = fixture.debugElement.query(By.css('.st-search-icon'));

      input.nativeElement.value = 'test';
      input.nativeElement.dispatchEvent(new Event('input'));

      searchButton.triggerEventHandler('mousedown', {});
      fixture.detectChanges();

      expect(responseFunction).toHaveBeenCalled();
      expect(responseFunction).toHaveBeenCalledTimes(1);
      expect(responseFunction).toHaveBeenCalledWith('test');

      searchButton.triggerEventHandler('mousedown', {});
      fixture.detectChanges();

      expect(responseFunction).toHaveBeenCalled();
      expect(responseFunction).toHaveBeenCalledTimes(2);
      expect(responseFunction).toHaveBeenCalledWith('test');
   });

   it('should be able to clear on click', () => {
      comp.debounce = 0;
      comp.minLength = 0;
      comp.hasClearButton = true;

      fixture.detectChanges();

      let input: DebugElement = fixture.debugElement.query(By.css('input'));

      input.nativeElement.value = 'test';
      input.nativeElement.dispatchEvent(new Event('input'));
      input.nativeElement.dispatchEvent(new Event('focus'));
      fixture.detectChanges();

      let clearButton: DebugElement = fixture.debugElement.query(By.css('.icon-cross'));
      expect(comp.searchBox.value).toEqual('test');

      clearButton.nativeElement.dispatchEvent(new Event('mousedown'));
      expect(comp.searchBox.value).toEqual('');
   });


   it('should be able to change focus', () => {
      comp.debounce = 0;
      comp.minLength = 0;
      fixture.detectChanges();
      let input: DebugElement = fixture.debugElement.query(By.css('input'));

      expect(comp.focus).toBeFalsy();

      input.nativeElement.dispatchEvent(new Event('focus'));
      fixture.detectChanges();

      expect(comp.focus).toBeTruthy();

      input.nativeElement.dispatchEvent(new Event('blur'));
      fixture.detectChanges();

      expect(comp.focus).toBeFalsy();
   });


   it('should be able to change initial Values', () => {
      comp.debounce = 0;
      comp.minLength = 0;
      comp.value = 'Initial value';
      fixture.detectChanges();
      let input: DebugElement = fixture.debugElement.query(By.css('input'));

      expect((<HTMLInputElement>input.nativeElement).value).toEqual('Initial value');

      let changes: SimpleChanges = {
         value: { currentValue: 'new value', previousValue: 'Initial value', firstChange: true, isFirstChange: () => true },
         liveSearch: { currentValue: false, previousValue: true, firstChange: true, isFirstChange: () => true }
      };

      comp.value = 'new value';
      comp.liveSearch = false;

      comp.ngOnChanges(changes);
      fixture.detectChanges();

      expect((<HTMLInputElement>input.nativeElement).value).toEqual('new value');


      changes = {
         liveSearch: { currentValue: true, previousValue: false, firstChange: false, isFirstChange: () => false }
      };
      comp.ngOnChanges(changes);
      fixture.detectChanges();

      expect((<HTMLInputElement>input.nativeElement).value).toEqual('new value');
   });
});
