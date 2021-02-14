import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { TaskHelper } from 'src/app/core/helpers/taskHelper';
import { TasksService } from 'src/app/core/services/task/task.service';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from  '@angular/material/core' ;
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { MatDialogRef } from '@angular/material/dialog';


export  const MY_FORMATS = {
  parse : {
    dateInput : 'LL' ,
 },
 display : {
    dateInput : 'LL' ,
    monthYearLabel : 'MMM YYYY' ,
    dateA11yLabel : 'LL' ,
    monthYearA11yLabel : 'MMMM YYYY' ,
 },
};
@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss'],
  providers:[
    {
  provide: DateAdapter,
  useClass: MomentDateAdapter,
  deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},

  ]
})
export class AddTaskComponent implements OnInit {
  public addTaskForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddTaskComponent>,

    private addTaskHelper:TaskHelper,
    private taskService:TasksService

  ) { 

  }

  ngOnInit(): void {
    this.addTaskForm = this.addTaskHelper.getForm();  

  }
  sendForm(){
    if(this.addTaskForm.invalid){
      this.addTaskForm.markAllAsTouched();
      return
    }
    if(this.addTaskForm.controls.day_time.value==''){
      
      let day = new Date();

      console.log("esta vacio men",day.getTime());
      let data = {
       "day_time" : day,
       "title"    : this.addTaskForm.controls.title.value,
       "description"    : this.addTaskForm.controls.description.value

      }
      console.log("DATA",data)
      this.taskService.create(data).subscribe(response=>{
        this.dialogRef.close(response);
      },(error)=>{
        console.log(error);
      })
    }else
    {
    console.log("values",this.addTaskForm.value);    
    this.taskService.create(this.addTaskForm.value).subscribe(response=>{
      this.dialogRef.close(response);

    },(error)=>{
      console.log(error);
    })
   }
  }
  taskSelect(){
    
  }

}
