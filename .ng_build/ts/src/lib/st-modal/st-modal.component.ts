import {
   ChangeDetectionStrategy,
   Component,
   ComponentFactoryResolver,
   ComponentRef,
   EventEmitter,
   Input,
   OnDestroy,
   OnInit,
   Output,
   ViewChild,
   ViewContainerRef
} from '@angular/core';
import * as _ from 'lodash';

import { StEgeo, StRequired } from '../decorators/require-decorators';
import { StModalButton, StModalConfig, StModalMainTextSize, StModalResponse, StModalType, StModalWidth } from './st-modal.interface';

@StEgeo()
@Component({
   selector: 'st-modal',
   template: `
     <div class="st-modal sth-modal">
        <div class="st-modal-content sth-modal-content" [ngStyle]="getModalSize()">
           <div class="sth-modal-header st-modal-header" [ngClass]="getTitleClass()" [ngStyle]="{height: getHeaderHeight()}">
              <div class="st-modal-contextual sth-modal-contextual" *ngIf="hasContextualTitle()">{{contextualTitle}}</div>
              <div class="st-modal-title sth-modal-title">
                 <i *ngIf="hasIcon()" [ngClass]="getIcon()"></i>
                 <p id="st-modal-title">{{getTitle()}}</p>
              </div>
              <div (click)="closeModal($event)" class="st-modal-close-button sth-modal-close-button" id="st-modal-close-button">
                 <i class="icon-circle-cross"></i>
              </div>
           </div>
           <div class="st-modal-body sth-modal-body" [ngClass]="mainTextSize">
              <div *ngIf="isMessageModal()" class="message">
                 <p id="st-modal-message-plain">{{message}}</p>
              </div>
              <div *ngIf="isComplexMessageModal()" [innerHTML]="getHTML()" id="st-modal-message-html"></div>
              <div #stModalBody id="st-modal-message-component"></div>
              <div *ngIf="hasButtons()" class="st-modal-buttons">
                 <st-button *ngFor="let button of getButtons(); let idx = index"
                    [text]="button.label"
                    [leftIcon]="getButtonIcon(true, button)"
                    [rightIcon]="getButtonIcon(false, button)"
                    [qaTag]="'st-modal-button-' + idx"
                    [subtypeClass]="getButtonSubtype(button)"
                    [inputType]="button"
                    (onClick)="clickButton(idx, button)"
                 ></st-button>
           </div>
           </div>
        </div>
     </div>
   `,
   styles: [`
     .st-modal {
       height: 100vh;
       left: 0;
       top: 0;
       position: fixed;
       width: 100%;
       z-index: 999999;
       display: flex; }

     .st-modal-content {
       align-self: center;
       animation-duration: 0.5s;
       animation-name: fadeIn;
       margin: auto;
       display: flex;
       flex-direction: column; }

     .st-modal-header {
       width: 100%;
       position: relative;
       display: flex; }

     .st-modal-close-button {
       position: absolute;
       right: 15px;
       top: 15px; }

     .st-modal-title {
       align-self: flex-end;
       margin: 0 0 7px 30px;
       display: flex;
       flex-wrap: nowrap;
       align-items: center;
       overflow: hidden;
       text-overflow: ellipsis;
       max-width: 87%; }
       .st-modal-title i {
         margin-right: 10px; }
       .st-modal-title p {
         text-transform: uppercase;
         white-space: nowrap;
         overflow: hidden;
         text-overflow: ellipsis; }

     .st-modal-body {
       padding: 30px 30px 50px 30px; }

     .st-modal-buttons {
       margin-top: 50px;
       margin-left: auto;
       display: flex;
       justify-content: flex-end; }
       .st-modal-buttons st-button {
         margin-left: 10px; }

     .st-modal-contextual {
       height: 35px;
       padding: 10px 14px;
       position: absolute;
       top: 0;
       left: 30px; }
   `],
   changeDetection: ChangeDetectionStrategy.OnPush
})
export class StModal implements OnDestroy, OnInit {
   @Input() @StRequired() modalConfig: StModalConfig;

   @Output() close: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();
   @Output() click: EventEmitter<StModalResponse> = new EventEmitter<StModalResponse>();

   @Input() component: any;
   @ViewChild('stModalBody', { read: ViewContainerRef }) target: ViewContainerRef;

   private componentRef: ComponentRef<any>;

   constructor(private cfr: ComponentFactoryResolver) { }

   getModalSize(): Object {
      switch (this.modalConfig.modalWidth) {
         case StModalWidth.COMPACT:
            return {
               'min-width': '700px',
               'max-width': '700px',
               'max-heigth': '500px'
            };
         case StModalWidth.REGULAR:
            return {
               'min-width': '950px',
               'max-width': '950px',
               'max-heigth': '500px'
            };
         case StModalWidth.LARGE:
            return {
               'min-width': '1240px',
               'max-width': '1240px',
               'min-heigth': '600px',
               'max-heigth': '600px'
            };
         default:
            return {
               'min-width': '700px',
               'max-width': '700px',
               'max-heigth': '500px'
            };
      }
   }

   getTitleClass(): string {
      switch (this.modalConfig.modalType) {
         case StModalType.NEUTRAL: return 'st-modal-neutral';
         case StModalType.INFO: return 'st-modal-info';
         case StModalType.WARNING: return 'st-modal-warning';
         default: return 'st-modal-neutral';
      }
   }

   hasContextualTitle(): boolean {
      return this.modalConfig.contextualTitle !== undefined && this.modalConfig.contextualTitle.length > 0;
   }

   get contextualTitle(): string {
      return this.modalConfig.contextualTitle;
   }

   getHeaderHeight(): string {
      return this.hasContextualTitle() ? '90px' : '80px';
   }

   hasIcon(): boolean {
      return this.modalConfig.modalType !== StModalType.NEUTRAL;
   }

   getIcon(): string {
      if (this.modalConfig.modalType === StModalType.INFO) {
         return 'icon-info1';
      } else if (this.modalConfig.modalType === StModalType.WARNING) {
         return 'icon-alert';
      }
      return '';
   }

   getTitle(): string {
      return this.modalConfig.modalTitle;
   }

   hasButtons(): boolean {
      return this.modalConfig.buttons && this.modalConfig.buttons.length > 0;
   }

   getButtonIcon(left: boolean, button: StModalButton): string {
      if (button && button.icon) {
         if (button.iconLeft && left) {
            return button.icon;
         } else if (!button.iconLeft && !left) {
            return button.icon;
         }
      }
      return '';
   }

   getButtonSubtype(button: StModalButton): string {
      return button && button.primary ? 'subtype1' : 'subtype2';
   }

   getButtons(): StModalButton[] {
      return _.cloneDeep(this.modalConfig.buttons || []).reverse();
   }

   isMessageModal(): boolean {
      return this.modalConfig.message && this.modalConfig.message.length > 0;
   }

   isComplexMessageModal(): boolean {
      return this.modalConfig.html && this.modalConfig.html.length > 0;
   }

   getHTML(): string {
      return this.modalConfig.html;
   }

   get message(): string {
      return this.modalConfig.message;
   }

   get mainTextSize(): string {
      switch (this.modalConfig.mainText) {
         case StModalMainTextSize.BIG: return 'sth-modal-message-big';
         case StModalMainTextSize.MEDIUM: return 'sth-modal-message-medium';
         default: return '';
      }
   }

   get qaTag(): string {
      if (this.modalConfig && this.modalConfig.qaTag) {
         return this.modalConfig.qaTag;
      } else {
         throw new Error('[ERROR]: StModal => qa tag is a required field');
      }
   }

   /** INTERACTION WITH MODAL */

   clickButton(index: number, button: StModalButton): void {
      this.click.emit(button.response);
   }

   closeModal(event: MouseEvent): void {
      this.close.emit(event);
   }

   /** DYNAMIC MODAL BODY COMPONENT LOAD */

   ngOnInit(): void {
      if (this.component && !(this.modalConfig.html || this.modalConfig.message)) {
         this.loadBody();
      }
   }

   ngOnDestroy(): void {
      if (this.componentRef) {
         this.componentRef.destroy();
      }
   }

   private loadBody(): void {
      if (!this.componentRef) {
         this.target.clear();
         let compFactory = this.cfr.resolveComponentFactory(this.component);
         this.componentRef = this.target.createComponent(compFactory);
         this.bindModalInputs();
      }
   }

   private bindModalInputs(): void {
      for (let key in this.modalConfig.inputs) {
         if (this.modalConfig.inputs.hasOwnProperty(key)) {
            this.componentRef.instance[key] = (<any>this.modalConfig.inputs)[key];
         }
      }

      for (let key in this.modalConfig.outputs) {
         if (this.modalConfig.outputs.hasOwnProperty(key)) {
            this.componentRef.instance[key].subscribe((<any>this.modalConfig.outputs)[key]);
         }
      }
      this.componentRef.changeDetectorRef.detectChanges();
   }
}
