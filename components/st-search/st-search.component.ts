import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, OnChanges, OnDestroy, SimpleChanges, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
   selector: 'st-search',
   templateUrl: './st-search.component.html',
   styleUrls: ['./st-search.component.scss'],
   changeDetection: ChangeDetectionStrategy.OnPush
})

export class StSearchComponent implements OnChanges, OnDestroy, OnInit {
   @Input() qaTag: string;
   @Input() placeholder: string = 'Search';
   @Input() debounce: number = 0;
   @Input() minLength: number = 0;

   @Output() onSearch: EventEmitter<string> = new EventEmitter<string>();

   searchBox: FormControl = new FormControl();

   private sub: Subscription | undefined = undefined;
   private lastEmited: string | undefined = undefined;

   // Its necesary check null because value is any type.
   public launchSearch(): void {
      /* tslint:disable:no-null-keyword */
      if (this.searchBox.value !== null && this.searchBox.value !== undefined && /* tslint:enable:no-null-keyword */
         this.lastEmited !== this.searchBox.value && this.minLength <= this.searchBox.value.length
      ) {
         this.lastEmited = this.searchBox.value;
         this.onSearch.emit(this.lastEmited);
      }
   }

   public onKeyPress(event: KeyboardEvent): void {
      let key: number = event.keyCode || event.which;
      if (key === 13) {
         this.launchSearch();
      }
   }

   public ngOnChanges(changes: SimpleChanges): void {
      this.manageSubscription();
   }

   public ngOnInit(): void {
      this.manageSubscription();
   }

   public ngOnDestroy(): void {
      if (this.sub !== undefined) {
         this.sub.unsubscribe();
      }
   }

   private manageSubscription(): void {
      if (this.sub !== undefined) {
         this.sub.unsubscribe();
      }
      this.sub = this.searchBox
         .valueChanges
         .debounceTime(this.debounce)
         .subscribe((event) => this.launchSearch());
   }
}
