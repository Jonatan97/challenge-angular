import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TasksService } from 'src/app/core/services/task/task.service';
import { AddTaskComponent } from '../add-task/add-task.component';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from  '@angular/material/core' ;
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';

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
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
  providers:[
    {
  provide: DateAdapter,
  useClass: MomentDateAdapter,
  deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},

  ]
})
export class TasksComponent implements OnInit {
  public tasks:any[] = [];
  public tasksCommon:any[];
  public flat:boolean = false;
  public trap:any[] ;
  public taskSelect:any[] = [];
  public changeStatus:boolean;
  public solutionPut:boolean = false;
  constructor(
    public dialog: MatDialog,
    
    private taskService:TasksService
    ) { 
    }

  ngOnInit(): void {
    this.taskService.getAll().subscribe(response =>{
      this.tasks = response;
      this.trap = this.tasks; 
      console.log("ESTO SI JALO",response);
    })

  }
   
  addTask(){
    const dialogRef = this.dialog.open(AddTaskComponent,{
      width: '550px',
      maxHeight: '550px'
    })
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.tasks.push(result);
        console.log('The dialog was closed',result);

      }

    });
  }
  compareDates(date:any){
    if(date!=null){
    this.tasksCommon = [];
     for(let i = 0 ; i< this.tasks.length;i++){
      let d ;
      d = date.toDate();
      let f  = new Date(this.tasks[i]['day_time']);
      let q = this.formatDate(d);
      let t = this.formatDate(f);
       if(q === t){
         this.flat = true;
        this.tasksCommon.push(this.tasks[i])
       }
     }
     if(this.tasksCommon.length == 0){
       this.flat = false;
     }
     console.log("this.como",this.tasksCommon)
    }
  } 
  sens(){
    this.flat = false;
  }
  formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}
 
  filter(event){
   this.compareDates(event.target.value)
    
  }
  selectTask(task:any){
    console.log("Entro",task);
    this.taskSelect = [];
    this.taskSelect = task;
    console.log("tas",this.taskSelect);
  }
 
  deleteTask(id:any){
    this.taskService.delete(id).subscribe(response =>{
      for(let i = 0;i<this.tasks.length;i++){
        if(id == this.tasks[i]['id']){
          this.tasks.splice(i,1);
        }
      }
    },(error)=>{
      console.log(error);
    })
  }
  changeSelect(event:any){
    console.log("evneto",event);
    this.changeStatus = event;
    console.log("evneto",this.changeStatus);

    
  }
  editTask(id:any){
console.log("id",id);
    let data = {
      "title":this.taskSelect['title'] ,
      "description": this.taskSelect['description'],
      "day_time": this.taskSelect['day_time'],
      "status": this.changeStatus
    }
    console.log("data",data);
    
    this.taskService.edit(id,data).subscribe(response =>{
      this.solutionPut = true;
      console.log(this.changeStatus);
      
      let changeStatus = this.changeStatus;
        for(let i = 0;i <this.tasks.length;i++){
          if(this.tasks[i]['id']==id){
            this.tasks[i]['status'] = changeStatus.toString();
          }
        }
       
      
      console.log("respuesta",response);
    },(error)=>{
      console.log(error);
    })
  }
}
