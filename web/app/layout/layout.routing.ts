import { ModuleWithProviders } from '@angular/core';
import {RouterModule} from '@angular/router';
import {LayoutComponent} from './layout.component';
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
  TwoListSelectionComponent,
  SpinnerComponent,
  FooterComponent,
  InfoCardComponent,
  RegexpComponent,
  VerticalMenuComponent,
  ListComponent,
  TooltipComponent,
  ToggleButtonsComponent,
  TabBoxComponent,
  PageTitleComponent,
  SearchComponent,
  ChangelogComponent,
  DropdownComponent,
  DropdownMenuComponent,
  GridComponent
} from '../+examples';

export const routing: ModuleWithProviders = RouterModule.forChild([
  {
    path: '', component: LayoutComponent, children: [
      { path: '', redirectTo: 'main', pathMatch: 'full' },
      { path: 'main', component: MainComponent },
      { path: 'grid', component: GridComponent },
      { path: 'colors', component: ColorsComponent },
      { path: 'typography', component: TypographyComponent },
      { path: 'icons', component: IconsComponent },
      { path: 'logo', component: LogoComponent },
      { path: 'modal', component: ModalComponent },
      { path: 'button', component: ButtonComponent },
      { path: 'input', component: InputComponent },
      { path: 'info-box', component: InfoBoxComponent },
      { path: 'dropdown', component: DropdownComponent },
      { path: 'dropdown-menu', component: DropdownMenuComponent },
      { path: 'spinner', component: SpinnerComponent },
      { path: 'two-list-selection', component: TwoListSelectionComponent },
      { path: 'footer', component: FooterComponent },
      { path: 'info-card', component: InfoCardComponent },
      { path: 'regexp', component: RegexpComponent },
      { path: 'vertical-menu', component: VerticalMenuComponent },
      { path: 'list', component: ListComponent },
      { path: 'tooltip', component: TooltipComponent },
      { path: 'toggle-buttons', component: ToggleButtonsComponent },
      { path: 'tab-box', component: TabBoxComponent },
      { path: 'page-title', component: PageTitleComponent },
      { path: 'search', component: SearchComponent },
      { path: 'changelog', component: ChangelogComponent },
      { path: 'navigation', loadChildren: '../+examples#NavigationModule'}
    ]
  }
]);
