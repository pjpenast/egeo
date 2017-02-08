import { Buttons } from '../../../../components';
import { Component, ViewEncapsulation } from '@angular/core';
import { ApiDoc, TYPES } from '../../shared';

@Component({
   selector: 'button-example',
   templateUrl: './button.component.html'
})

export class ButtonComponent {
   public apiDoc: ApiDoc = {
      title: 'Button',
      description: 'The button component represents a clickable button.',
      haveModel: false,
      // tslint:disable:max-line-length
      apiSection: {
         inputs: [
            { paramName: 'inputType', type: TYPES.STR, required: false, details: 'The button type can have one of these possible values: submit / reset / button. The submit and reset ones are used to be recognized as the HTML forms predefined options. Default type is button.' },
            { paramName: 'isDisabled', type: TYPES.BOOL, required: false, details: 'The button type can have one of these possible values: submit / reset / button. The submit and reset ones are used to be recognized as the HTML forms predefined options. Default type is submit.' },
            { paramName: 'qaTag', type: TYPES.STR, required: true, details: 'Id value for qa test.' },
            { paramName: 'leftIcon', type: TYPES.STR, required: false, details: 'An icon of the Stratio Fonticon family of icons that should appear at left of the text.' },
            { paramName: 'onClick', type: TYPES.FUNC, required: true, details: 'Callback function called on click on the button.' },
            { paramName: 'rightIcon', type: TYPES.STR, required: false, details: 'An icon of the Stratio Fonticon family of icons that should appear at right of the text.' },
            { paramName: 'subtypeClass', type: TYPES.STR, required: false, details: 'Subtype of button. Only for graphic purposes. It defines graphical variations of the type and always use the same color variations related to the name of subtype. Subtypes are subtype1, subtype2, subtype3... Not all buttons have all subtypes. Default is the subtype1 value.' },
            { paramName: 'text', type: TYPES.STR, required: true, details: 'Text of the button. Default type is "Click Me".' },
            { paramName: 'themeClass', type: TYPES.STR, required: false, details: 'Theme applied to the button. Only for graphic purposes. Themes are created related to the context the button is placed in(i.e. the same button in different backgrounds). There is not default value.' },
            { paramName: 'typeClass', type: TYPES.STR, required: true, details: 'Type of button. Only for graphic purposes. It defines different types or buttons like classical rect buttons, the rounded ones or ones without background, similar to links. Types are btnMain, btnLink and btnTool. btnMain is the default value.' }
         ],
         outputs: []
      },
      exampleDesc: `You can see below several samples showing different the most common configurations of the button component inside a Stratio application.`
   };
   // tslint:enable:max-line-length

   test1(): void {
      console.log('You clicked the button 1!');
   }

   test2(): void {
      console.log('You clicked the button 2!');
   }
}
