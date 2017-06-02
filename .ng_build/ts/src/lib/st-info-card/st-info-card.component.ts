import {ChangeDetectionStrategy, Component, Input} from '@angular/core';

@Component({
  selector: 'st-info-card',
  template: `
    <section class="st-info-card sth-info-card" [attr.id]="generateQaTag()">
      <div class="st-info-card__photo-div sth-info-card__photo-div">
        <img class="st-info-card__photo img-responsive" src="{{photo}}" (error)="onPhotoError()">
      </div>
      <div class="st-info-card__text-div">
        <h1 class="st-info-card__title sth-info-card__title">{{title}}</h1>
        <p class="st-info-card__description sth-info-card__description">{{description}}</p>

      </div>
      <p class="st-info-card__arrow sth-info-card__arrow"></p>
    </section>
  `,
  styles: [`
    .st-info-card {
      margin: 10px 0;
      padding: 18px;
      display: block;
      position: relative;
      min-height: 115px; }

    .st-info-card__photo-div {
      height: 20%;
      width: 20%;
      display: inline-block; }

    .st-info-card__photo {
      width: 100%;
      max-height: 140px; }

    .st-info-card__text-div {
      width: 76%;
      height: 100%;
      padding-left: 12px;
      position: relative;
      display: inline-block;
      vertical-align: top; }

    .st-info-card__title {
      line-height: 30px;
      max-height: 30px;
      overflow: hidden;
      margin: 0; }

    .st-info-card__description {
      line-height: 20px;
      max-height: undefined;
      overflow: hidden;
      margin-bottom: 0; }

    .st-info-card__arrow {
      position: absolute;
      text-align: right;
      width: 100%;
      right: 20px;
      bottom: 0;
      margin-bottom: 8px; }

    :host {
      display: block; }
  `],
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
