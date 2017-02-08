import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { StModalService, MessageModal, Buttons, BUTTON_TYPES, ModalTitle, StModalConfiguration } from '../../../../components';
import { Component1 } from './shared/component1/component1';
import { Component2 } from './shared/component2/component2';
import { TestModule } from './shared/other.module';
import { TestModule2 } from './shared/onlyModule.module';

@Component({
   selector: 'modal-example',
   templateUrl: './modal.component.html'
})

export class ModalComponent {

   constructor(private _modalService: StModalService) { }

   showModal(): void {
      let notify: Subject<BUTTON_TYPES> = new Subject<BUTTON_TYPES>();

      // Creation of buttons
      let buttonAccept: Buttons = { type: BUTTON_TYPES.ACCEPT, title: 'Delete', notify: notify };
      let buttonCancel: Buttons = { type: BUTTON_TYPES.CANCEL, title: 'Cancel', notify: notify };

      // Creation of modal info
      let messageModal: MessageModal = {
         message: 'Are you sure of delete the id 10?',
         title: { title: 'ARE YOU SURE?', icon: 'icon-info2' },
         buttons: [buttonAccept, buttonCancel]
      };

      // Create modal and suscribe button click
      this._modalService.showMessage(messageModal);
      notify.subscribe((type: BUTTON_TYPES) => this.showMessageType(type));
   }

   showModalMultipleComponents(): void {
      let config: StModalConfiguration = new StModalConfiguration();
      config.setTitle({ icon: '', title: 'PLUGIN INFO' });
      config.setTitleConfig({ backgroundColor: 'rgb(243, 243, 243)', fontSize: 20 });
      config.modalHeight = 300;
      config.modalWidth = 600;

      /* Configure */
      this._modalService.configuration = config;

      this._modalService.show([Component1, Component2], []);
   }

   showModalMultipleComponentsWithModules(): void {
      this._modalService.show([Component1], [TestModule]);
   }

   showModalOnlyModal(): void {
      this._modalService.show([], [], Component1, TestModule2);
   }

   private showMessageType(type: BUTTON_TYPES): void {
      switch (type) {
         case BUTTON_TYPES.ACCEPT:
            console.log('ACCEPT');
            break;
         case BUTTON_TYPES.CANCEL:
            console.log('CANCEL');
            break;
         default: console.log('error**************'); break;
      }
   }
}
