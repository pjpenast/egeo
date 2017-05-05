import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

import 'rxjs/add/operator/debounceTime';

@Component({
   selector: 'st-search',
   templateUrl: './st-search.component.html',
   styleUrls: ['./st-search.component.scss'],
   changeDetection: ChangeDetectionStrategy.OnPush
})

export class StSearchComponent implements OnChanges, OnDestroy, OnInit {
   @Input() debounce: number = 0;
   @Input() hasClearButton: boolean = false;
   @Input() liveSearch: boolean = true;
   @Input() minLength: number = 0;
   @Input() placeholder: string = 'Search';
   @Input() qaTag: string;
   @Input() searchOnlyOnClick: boolean = false;
   @Input() value: string;

   @Output() search: EventEmitter<string> = new EventEmitter<string>();

   public searchBox: FormControl = new FormControl();
   public focus: Boolean;

   private sub: Subscription | undefined = undefined;
   private lastEmited: string | undefined = undefined;

   public launchSearch(force: boolean = false, isFromButton: boolean = false): void {
      if (this.canSearch(isFromButton) && this.isDefined() && this.isEqualPrevious(force) && this.checkMins()) {
         this.lastEmited = this.searchBox.value;
         this.search.emit(this.lastEmited);
      }
   }

   public onKeyPress(event: KeyboardEvent): void {
      let key: number = event.keyCode || event.which;
      if (key === 13) {
         this.launchSearch(true);
      }
   }

   public onFocus(event: MouseEvent): void {
      this.focus = true;
   }

   public onBlur(event: MouseEvent): void {
      this.focus = false;
   }

   public clearInput(): void {
      this.searchBox.setValue('');
      this.focus = false;
   }

   public ngOnChanges(changes: SimpleChanges): void {
      this.manageSubscription();
      this.updateValue(changes);
   }

   public ngOnInit(): void {

      if (this.value) {
         this.searchBox.setValue(this.value);
      }

      this.manageSubscription();
   }

   public ngOnDestroy(): void {
      if (this.sub !== undefined) {
         this.sub.unsubscribe();
      }
   }

   private canSearch(isFromButton: boolean): boolean {
      return !this.searchOnlyOnClick || (this.searchOnlyOnClick && isFromButton);
   }

   private isDefined(): boolean {
      return this.searchBox && this.searchBox.value !== null && this.searchBox.value !== undefined;
   }

   private checkMins(): boolean {
      return this.minLength <= (this.searchBox && this.searchBox.value && this.searchBox.value.length) ||
         this.searchBox.value.trim().length === 0;
   }

   private isEqualPrevious(force: boolean): boolean {
      return this.lastEmited !== this.searchBox.value || force;
   }

   private updateValue(changes: SimpleChanges): void {
      let prop: string = 'value';
      if (changes[prop]) {
         this.searchBox.setValue(changes[prop].currentValue);
      }
   }

   private manageSubscription(): void {
      if (this.sub !== undefined) {
         this.sub.unsubscribe();
      }
      if (this.liveSearch) {
         this.sub = this.searchBox
            .valueChanges
            .debounceTime(this.debounce)
            .subscribe((event) => this.launchSearch());
      }
   }
}
