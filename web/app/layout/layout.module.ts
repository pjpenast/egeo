import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LayoutComponent } from './layout.component';
import {
   ModalComponent,
   MainComponent,
   ColorsComponent,
   TypographyComponent,
   IconsComponent,
   LogoComponent,
   InputComponent,
   ButtonComponent,
   InfoBoxComponent,
   ListComponent,
   SpinnerComponent,
   TwoListSelectionComponent,
   FooterComponent,
   InfoCardComponent,
   TooltipComponent,
   RegexpComponent,
   VerticalMenuComponent,
   ToggleButtonsComponent,
   TabBoxComponent,
   PageTitleComponent,
   SearchComponent,
   ChangelogComponent,
   ChangelogService,
   NavigationModule,
   DropdownComponent,
   DropdownMenuComponent,
   GridComponent
} from '../+examples';
import { routing } from './layout.routing';

import { SharedModule } from '../shared';

import { MarkdownToHtmlModule } from 'markdown-to-html-pipe';

@NgModule({
   imports: [
      SharedModule,
      routing,
      FormsModule,
      ReactiveFormsModule,
      NavigationModule,
      MarkdownToHtmlModule
   ],
   declarations: [
      LayoutComponent,
      ModalComponent,
      MainComponent,
      ColorsComponent,
      TypographyComponent,
      IconsComponent,
      LogoComponent,
      InputComponent,
      ButtonComponent,
      InfoBoxComponent,
      ListComponent,
      SpinnerComponent,
      TwoListSelectionComponent,
      FooterComponent,
      InfoCardComponent,
      TooltipComponent,
      RegexpComponent,
      VerticalMenuComponent,
      ToggleButtonsComponent,
      TabBoxComponent,
      PageTitleComponent,
      SearchComponent,
      ChangelogComponent,
      DropdownComponent,
      DropdownMenuComponent,
      GridComponent
   ],
   providers: [ChangelogService]
})
export class LayoutModule { }
