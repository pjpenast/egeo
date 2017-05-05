import {ChangeDetectionStrategy, Component, Input} from '@angular/core';

@Component({
  selector: 'st-info-card',
  templateUrl: './st-info-card.component.html',
  styleUrls: ['./st-info-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class StInfoCardComponent {
  @Input() photo: string;
  @Input() defaultPhoto: string;
  @Input() title: string;
  @Input() description: string;
  @Input() qaTag: string;

  constructor() {
  }

  onPhotoError(): boolean {
    this.photo = this.defaultPhoto;
    return true;
  }

  generateQaTag(): string {
   return this.qaTag ? 'qaTag-' + this.qaTag : 'qaTag-' + this.title.split(' ').join('-');
  }
}
