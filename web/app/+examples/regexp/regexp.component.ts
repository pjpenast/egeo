import { Component } from '@angular/core';
import { StRegEx, StInputError } from 'egeo'; // For declare messages in case of error.
import { ApiDoc, TYPES } from '../../shared';

@Component({
   selector: 'regexp-example',
   templateUrl: './regexp.component.html'
})

export class RegexpComponent {

   model: ExampleModel = {
      email: 'egeo@stratio.com'
   };

   isDisabled: boolean = false;
   emailRegExp: string = StRegEx.EMAIL;
   emailPlaceholder: string = 'User email';
   forceValidations: boolean = false;

   errors: StInputError = {
      generic: 'Error',
      required: 'This field is required',
      min: 'The min for this field is: 10',
      max: 'The max for this field is: 10',
      minLength: 'The field min length is: 10',
      pattern: 'Invalid value'
   };

   // tslint:disable:max-line-length
   public apiDoc: ApiDoc = {
      title: 'Regular expresions',
      description: 'This is an utility to work with Regular Expressions. It includes a vault to gather the most frequently used regular expressions like the validation ones.',
      haveModel: true,
      apiSection: { inputs: [], outputs: [] },
      exampleDesc: `This example use an email regular expresion for test input values.`
   };
   // tslint:enable:max-line-length

   onSubmitTemplateBased(): void {
      console.log('submit value: ', JSON.stringify(this.model));
   }

   checkValidations(): void {
      this.forceValidations = true;
   }
}

interface ExampleModel {
   email: string;
};
