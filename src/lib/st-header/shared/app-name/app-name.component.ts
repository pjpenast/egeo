import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
   selector: 'app-name',
   styleUrls: ['./app-name.component.scss'],
   templateUrl: './app-name.component.html',
   changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppNameComponent {

   @Input() companyName: string | undefined = 'STRATIO';
   @Input() appName: string | undefined;
   @Input() appLogoPath: string | undefined;
   @Input() qaTag: string;

   public showAppName(): boolean {
      return this.appName !== undefined;
   }
}
