import { Component, OnInit, ViewChild } from '@angular/core';
import { StInputError } from '../../../../components'; // For declare messages in case of error.
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { ApiDoc, TYPES } from '../../shared';


@Component({
   selector: 'input-example',
   templateUrl: './input.component.html',
   styleUrls: ['./input.component.scss']
})

export class InputComponent implements OnInit {
   @ViewChild('templateDrivenForm') public templateDrivenForm: NgForm;

   public model: MyModel = {
      name: 'Egeo',
      description: '',
      components: 10
   };

   public textWithoutSpaces: string = '[a-z]*';
   public disabledPlaceholder: string = 'Field disabled';
   public minLength: number = 3;
   public isDisabled: boolean = false;

   public forceValidations: boolean = false;

   public errors: StInputError = {
      generic: 'Error',
      required: 'This field is required',
      minLength: 'The field min length is: ' + this.minLength,
      pattern: 'Invalid value'
   };

   public reactiveForm: FormGroup; // our model driven form

   // tslint:disable:max-line-length
   public apiDoc: ApiDoc = {
      title: 'Input',
      description: 'The input component is for use normaly inside a form, you can use too outside a form like a template driven form.',
      haveModel: true,
      apiSection: {
         inputs: [
            { paramName: 'placeholder', type: TYPES.STR, required: false, details: 'The text that appera as placeholder of the input, default empty' },
            { paramName: 'name', type: TYPES.STR, required: true, details: 'Name of the input' },
            { paramName: 'label', type: TYPES.STR, required: false, details: 'Label to show over the input, default empty' },
            { paramName: 'fieldType', type: TYPES.STR, required: false, details: 'Input field type, posible values are: string, number or password, default value is string' },
            { paramName: 'errors', type: 'StInputError', required: false, details: 'Error to show in every error case, if you don\'t provide this parameter, default behaivor is change color only without message' },
            { paramName: 'qaTag', type: TYPES.STR, required: true, details: 'Id for QA test' },
            { paramName: 'forceValidations', type: TYPES.BOOL, required: false, details: 'If you provide this, and put a true value the input check errors before modify by first time' },
            { paramName: 'contextualHelp', type: TYPES.STR, required: false, details: 'Contextual help button, you can see more info about it in contextual help component' }
         ],
         outputs: []
      },
      exampleDesc: `This example have two forms, the first of these use a TEMPLATE DRIVEN FORM aproach, the second example use REACTIVE FORM OR MODEL DRIVEN FORM aproach. If you want to use a input outside a form, you can copy the TEMPLATE DRIVEN FORM aproach.`
   };
   // tslint:enable:max-line-length


   constructor(private _fb: FormBuilder) { }

   onSubmitTemplateBased(): void {
      console.log('submit value: ', JSON.stringify(this.model));
   }

   forceValidation(): void {
      this.forceValidations = true;
   }

   onSubmitReactiveForm(): void {
      this.model.description = this.reactiveForm.value.description;
      this.model.components = this.reactiveForm.value.components;
      console.log('submit value: ', JSON.stringify(this.model));
   }

   changeDisabled(): void {
      console.log('change disable');
      this.isDisabled = !this.isDisabled;
      if (this.isDisabled) {
         this.reactiveForm.get('components').disable();
         this.templateDrivenForm.form.get('components-template').disable();
      } else {
         this.reactiveForm.get('components').enable();
         this.templateDrivenForm.form.get('components-template').enable();
      }
   }

   ngOnInit(): void {
      this.reactiveForm = this._fb.group({
         'description': [
               this.model.description,
               [Validators.required, Validators.minLength(this.minLength), Validators.pattern(this.textWithoutSpaces)]
            ],
         'components': [this.model.components, [Validators.required]]
      });
   }
}


interface MyModel {
   name: string;
   description: string;
   components: number;
}
