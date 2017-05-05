import { CommonModule } from '@angular/common';
import { NgModule, Type } from '@angular/core';
import { Routes } from '@angular/router';

import { StButtonModule } from '../../st-button/st-button.module';
import { StModalModule } from '../st-modal.module';
import { StModalService } from '../st-modal.service';
import { ExampleComponent } from './example.component';
import { ModalTestComponent } from './modal-test.component';

@NgModule({
   imports: [
      CommonModule,
      StButtonModule,
      StModalModule.withComponents([ModalTestComponent])
   ],
   declarations: [ExampleComponent, ModalTestComponent],
   exports: [ExampleComponent],
   providers: [StModalService]
})
export class ExampleModule { }


export function getPaths(component: Type<any>): Routes {
   return [];
}
