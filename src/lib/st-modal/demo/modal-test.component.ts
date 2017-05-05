import { Component } from '@angular/core';

@Component({
   selector: 'st-modal-test',
   styles: [`
         h1 {
            font-weight: bold;
            font-size: 23px;
         }
         p {
            color: #2d96bd;
            font-weight: normal;
         }
   `],
   template: `
   <h1>Hello World</h1>
   <br>
   <p>This is a modal with a component inside</p>
   `
})
export class ModalTestComponent {}
