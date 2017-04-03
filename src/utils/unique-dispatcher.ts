import { Injectable, Optional, SkipSelf } from '@angular/core';

export type SelectOneDispaptcherListener = (id: string, name: string) => void;

@Injectable()
export class SelectOneDispatcher {
   private listeners: SelectOneDispaptcherListener[] = [];

   notify(id: string, name: string): void {
      for (let listener of this.listeners) {
         listener(id, name);
      }
   }

   listen(listener: SelectOneDispaptcherListener): void {
      this.listeners.push(listener);
   }

}
