import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

import { StFooterLink } from './st-footer.model';

@Component({
  selector: 'st-footer',
  template: `
    <footer class="footer sth-footer">
      <div class="content">
        <p class="text sth-footer-text" *ngIf="rightsText">{{ rightsText }}</p>

        <ul class="sth-footer-links links" *ngIf="links.length">
           <li *ngFor="let link of links; let index = index">
              <span class="separator">|</span>
              <span class="link" (click)="goToLink(link)" [attr.id]="qaTag + '-link-' + index">{{ link.title }}</span>
           </li>
        </ul>
      </div>
      <div class="logo sth-footer-logo" *ngIf="image">
        <img [src]="image">
      </div>
    </footer>
  `,
  styles: [`
    .footer {
      width: 100%;
      height: 129px;
      padding: 25px 30px; }
      .footer .content {
        margin-bottom: 10px; }
      .footer .text {
        display: inline-block;
        margin: 0;
        padding: 0; }
      .footer .links {
        display: inline;
        list-style: none;
        margin: 0;
        padding: 0; }
        .footer .links li {
          display: inline-block;
          cursor: pointer; }
        .footer .links .separator {
          margin: 0 5px; }
      .footer .logo {
        width: 100px;
        height: 45px;
        margin: 0;
        position: relative; }
        .footer .logo img {
          width: auto;
          max-height: 100%; }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StFooterComponent {

  @Input() rightsText: string;
  @Input() links: StFooterLink[] = [];
  @Input() qaTag: string;
  @Input() image: string;
  @Output() link: EventEmitter<StFooterLink> = new EventEmitter<StFooterLink>();

  constructor(
     private router: Router
  ) { }

  goToLink(link: StFooterLink): void {
     if (link.url) {
        window.open(link.url, '_blank');
     }

     if (link.router) {
        this.router.navigate([link.router]);
     }

     this.link.emit(link);
  }


}
