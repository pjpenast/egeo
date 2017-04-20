import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { StBreadCrumbs } from './st-breadcrumbs.component';


@NgModule({
   imports: [CommonModule],
   exports: [StBreadCrumbs],
   declarations: [StBreadCrumbs],
   entryComponents: [StBreadCrumbs],
   providers: []
})
export class StBreadcrumbsModule {}
