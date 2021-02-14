import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { validateBasis } from '@angular/flex-layout';


@Injectable()


export class TaskHelper{
    formValidationMessages = {  
        'title':[
            {type: 'required', message: 'Campo requerido'}
          ],
        'description':[
            {type: 'required', message: 'Campo requerido'}
        ],
     
    }

    constructor (private formBuilder: FormBuilder){ }
    
    getForm(): FormGroup{
        return this.formBuilder.group ({
            title:['', Validators.required],
            description:['', Validators.required],
            day_time:[''],
            status:['false']
           

        })
        
    }
}