import { CommonModule }  from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StFooterComponent }   from './st-footer.component';

@NgModule({
   imports: [ CommonModule, RouterModule ],
   exports: [ StFooterComponent ],
   declarations: [ StFooterComponent ],
   providers: []
})
export class StFooterModule { }
